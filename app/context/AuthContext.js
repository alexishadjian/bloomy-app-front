import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";



const TOKEN_KEY = 'my-jwt';
const HOME_ID = undefined;
// 10.120.135.88
// 192.168.1.164
export const API_URL = 'http://192.168.1.164:3003';
// export const API_URL = 'http://localhost:3003';
export const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (({children}) => {
    
    const [authState, setAuthState] = useState();
    const [homeId, setHomeId] = useState();


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

        const loadHome = async () => {
            const home = await SecureStore.getItemAsync(HOME_ID);
            console.log('home', home);
            if (home) setHomeId(HOME_ID);
        };

        loadToken();
        loadHome();
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
            console.log('res', res.data);
            console.log('res', res.data.id_user);
            setAuthState({ token: res.data.token, authenticated: true });

            // Attach token to all api requests
            axios.defaults.headers.common["Authorization"] = `${res.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, res.data?.token);
            await SecureStore.setItemAsync(HOME_ID, res.data?.id_home);

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

        // Clear home id
        setHomeId(undefined);
        await SecureStore.deleteItemAsync(HOME_ID);


    };


    const createHome = async (name) => {
        try {
            const res = await axios.post(`${API_URL}/homes`, { name });
    
            setHomeId(res.data.id_home);

            await SecureStore.setItemAsync(HOME_ID, res.data?.id_home);

            return res;

        } catch (error) {
            return { error: true, msg: error.response.data.message };
        }
    };

    const joinHome = async (shareCode) => {
        try {
            const res = await axios.post(`${API_URL}/homes/join/${shareCode}`);
    
            setHomeId(res.data.id_home);

            await SecureStore.setItemAsync(HOME_ID, res.data?.id_home);

            return res;

        } catch (error) {
            return { error: true, msg: error.response.data.message };
        }
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        onCreateHome: createHome,
        onJoinHome: joinHome,
        homeId,
    };

    // return useContext(AuthContext);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});
