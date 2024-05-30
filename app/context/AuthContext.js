import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";



const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://10.120.135.75:3003';
// export const API_URL = 'http://localhost:3003';
export const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (({children}) => {
    
    const [authState, setAuthState] = useState();


    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                setAuthState({ token, authenticated: true });
                // Attach token to all api requests
                axios.defaults.headers.common["Authorization"] = `${token}`;
            } else {
                setAuthState({ token: null, authenticated: false });
            }
        };
        loadToken();
    }, []);

    const register = async (firstname, lastname, email, password ) => {
        try {
            return await axios.post(`${API_URL}/users/register`, {
                firstname,
                lastname,
                email,
                password,
            });
        } catch (error) {
            return { error: true, msg: error.response.data.message };
        }
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/users/login`, { email, password });
            console.log('res', res.data.token);
            setAuthState({ token: res.data.token, authenticated: true });

            // Attach token to all api requests
            axios.defaults.headers.common["Authorization"] = `${res.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, res.data.token);

            return res;

        } catch (error) {
            return { error: true, msg: error.response.data.message };
        }
    };

    const logout = async () => {
        //  Delete token from local storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        // Delete token from axios requests
        axios.defaults.headers.common["Authorization"] = null;
        // Reset auth state
        setAuthState({ token: null, authenticated: false });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    // return useContext(AuthContext);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});
