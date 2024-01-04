import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { LoginNavigationProp } from "../navigation/AppNavigation";

const Registration = () =>{
    const navigation = useNavigation<LoginNavigationProp>();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRep, setPasswordRep] = useState('');
    const {onLogin, onRegister} = useAuth();

    const login = async () => {
        const result = await onLogin!(email, password);

        if(result && result.error){
            Alert.alert(result.msg);
        }
    }

    const register = async () => {
        if (password !== passwordRep) {
            Alert.alert("Passwords do not match");
            return;
        }

        const result = await onRegister!(fullName, email, password);

        if(result && result.error){
            Alert.alert(result.msg);
        }
        else{
            login();
        }
    }

    return(
        <SafeAreaView style={styles.containter}>
            <Text style={styles.title}> Registration Screen</Text>

            <View style={styles.inputView}>
                <TextInput 
                    style={styles.TextInput} 
                    placeholder="Enter Full Name" 
                    autoCapitalize="none" 
                    onChangeText={(text: string) => setFullName(text)} 
                    value={fullName} 
                    placeholderTextColor='gray'
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput 
                    style={styles.TextInput} 
                    placeholder="Enter email adress" 
                    autoCapitalize="none" 
                    placeholderTextColor='gray'
                    onChangeText={(text: string) => setEmail(text)} 
                    value={email} 
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput 
                    style={styles.TextInput} 
                    placeholder="Enter password" 
                    autoCapitalize="none" 
                    secureTextEntry={true} 
                    placeholderTextColor='gray'
                    onChangeText={(text: string) => setPassword(text)} 
                    value={password} 
                    />
            </View>

            <View style={styles.inputView}>
                <TextInput 
                    style={styles.TextInput} 
                    placeholder="Repeat password" 
                    autoCapitalize="none" 
                    secureTextEntry={true} 
                    placeholderTextColor='gray'
                    onChangeText={(text: string) => setPasswordRep(text)} 
                    value={passwordRep} 
                    />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={register}>
                <Text style={styles.LoginText}>REGISTER</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.forgot_button}>Already have an account? Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Registration;

const styles = StyleSheet.create({
    containter:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    title:{
        fontWeight: "bold",
        fontSize:50,
        color: "black",
        marginBottom: 60,
        textAlign: "center"
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    inputView: {
        backgroundColor: "black",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "flex-start",
    },
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: "white"
    },
    loginBtn: {
        backgroundColor: "black",
        borderRadius: 30,
        width: "50%",
        height: 45,
        marginBottom: 20,
        marginTop: 30,
        alignItems: "center",
      },
      LoginText: {
        height: 50,
        flex: 1,
        padding: 12,
        color: "white"
    },
})
