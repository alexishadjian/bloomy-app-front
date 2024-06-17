import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";


// export const API_URL = 'http://10.120.135.88:3003';
// export const API_URL = 'http://192.168.1.164:3003';
export const API_URL = 'https://bloomy.up.railway.app';
export const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = (({children}) => {
    
    const [authState, setAuthState] = useState();
    const [homeId, setHomeId] = useState({ homeId: null, exist: false });


    useEffect(() => {

        const loadToken = async () => {
            const token = await SecureStore.getItemAsync('TOKEN_KEY');
            const id_user = await SecureStore.getItemAsync('USER_ID');
            // console.log('loadToken', token);

            if (token) {
                setAuthState({ token, authenticated: true, id_user, });
                // Attach token to all api requests
                axios.defaults.headers.common["Authorization"] = `${token}`;
            } else {
                setAuthState({ token: null, authenticated: false });
            }
        };

        const loadHome = async () => {
            const home = await SecureStore.getItemAsync('HOME_ID');

            if (home) {
                setHomeId({ homeId: home, exist: true });
            } else {
                setHomeId({ homeId: null, exist: false });
            }
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

            setAuthState({ token: res.data.token, authenticated: true, id_user: res.data?.id_user?.toString() });

            // Attach token to all api requests
            axios.defaults.headers.common["Authorization"] = `${res.data.token}`;

            console.log('res', res.data);

            await SecureStore.setItemAsync('TOKEN_KEY', res.data?.token);
            await SecureStore.setItemAsync('USER_ID', res.data?.id_user?.toString());
            await SecureStore.setItemAsync('HOME_ID', res.data?.id_home?.toString());



            setHomeId({ homeId: res.data?.id_home, exist: true });

            return res;

        } catch (error) {
            console.log(error);
            return { error: true, msg: error?.response?.data?.message };
        }
    };

    const logout = async () => {
        //  Delete token from local storage
        await SecureStore.deleteItemAsync('TOKEN_KEY');
        // Delete token from axios requests
        axios.defaults.headers.common["Authorization"] = null;
        // Reset auth state
        setAuthState({ token: null, authenticated: false, userId: null });
        await SecureStore.deleteItemAsync('USER_ID');

        // Clear home id
        setHomeId({ homeId: null, exist: false });
        await SecureStore.deleteItemAsync('HOME_ID');


    };


    const createHome = async (name) => {
        try {
            const res = await axios.post(`${API_URL}/homes`, { name });
    
            setHomeId({ homeId: res.data.id_home, exist: true });
            await SecureStore.setItemAsync('HOME_ID', res.data?.id_home.toString());

            return res;

        } catch (error) {
            return { error: true, msg: error.response.data.message };
        }
    };

    const joinHome = async (shareCode) => {
        try {
            const res = await axios.post(`${API_URL}/homes/join/${shareCode}`);
    
            setHomeId({ homeId: res.data.id_home, exist: true });            

            await SecureStore.setItemAsync('HOME_ID', res.data?.id_home.toString());

            return res;

        } catch (error) {
            return { error: true, msg: error.response.data.message };
        }
    };


    const exitHome = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.delete(`${API_URL}/homes/${HOME_ID}/exit`);
    
            setHomeId({ homeId: null, exist: false });
            await SecureStore.deleteItemAsync('HOME_ID');

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
        onExitHome: exitHome,
        homeId,
    };

    // return useContext(AuthContext);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});
