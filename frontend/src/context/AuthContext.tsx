import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import qs from 'qs';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (fullName: string, email: string, password:string) => Promise<any>;
    onLogin?: (username: string, password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://127.0.0.1:8000';
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
            const data = {
                grant_type: 'password',
                username: username,
                password: password,
                scope: '',
                client_id: '',
                client_secret: '',
              };
          
              const result = await axios.post(
                `${API_URL}/token`,
                qs.stringify(data),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                }
              );

            setAuthState({
                token: result.data.token,
                authenticated: true
            })

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

            return result;
        }catch(e){
            return {error: true, msg: (e as any).response.data.msg};
            //console.error(e.message);
            //console.error(e.name);
            //console.error(e.code);
            //console.error(e.config);
            //console.error(e.request);
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