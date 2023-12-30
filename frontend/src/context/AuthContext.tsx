import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (fullName: string, email: string, password:string) => Promise<any>;
    onLogin?: (username: string, password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://0.0.0.0:80';
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

    const login = async (username: string, password: string) =>{
        try{
            const result = await axios.post(`${API_URL}/token`, {username, password});

            setAuthState({
                token: result.data.access_token,
                authenticated: true
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.access_token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token);

            return result;
        }catch(e){
            return {error: true, msg: (e as any).response.data.msg};
        }
    }

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