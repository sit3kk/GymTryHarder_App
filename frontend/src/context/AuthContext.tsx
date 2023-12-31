import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (fullName: string, email: string, password:string) => Promise<any>;
    onLogin?: (email: string, password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://3.121.219.180';
const AuthContex = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContex);
}

export const AuthProvider = ({children}: any) =>{
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () =>{
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                });
            }
        }
        loadToken();
    }, [])


    const register = async (fullName: string, email: string, password: string) =>{
        try{
            return await axios.post(`${API_URL}/register`, {fullName, email, password});
        }catch(e){
            return {error: true, msg: (e as any).response.data.msg};
        }
    }

    const login = async (email: string, password: string) =>{
        try{
            const result = await axios.post(`${API_URL}/token`, {email, password});

            setAuthState({
                token: result.data.token,
                authenticated: true
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            return result;
        }catch(e){
            console.error(e.message);
            console.error(e.name);
            console.error(e.code);
            console.error(e.config);
            console.error(e.request);
        }
    }
    //["message", "name", "code", "config", "request"]

    const logout = async () =>{
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContex.Provider value={value}>{children}</AuthContex.Provider>
}