import React from "react"
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoginNavigationProp } from "../navigation/AppNavigation";

function Login(){
    const navigation = useNavigation<LoginNavigationProp>();
    
    return(
        <SafeAreaView style={styles.containter}>
            <Text style={styles.title}> Login Screen</Text>

            <View style={styles.inputView}>
                <TextInput style={styles.TextInput} placeholder="Enter email address" autoCapitalize="none" placeholderTextColor='gray'/>
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.TextInput} placeholder="Enter password" autoCapitalize="none" secureTextEntry={true} placeholderTextColor='gray'/>
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.LoginText}>LOGIN</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.forgot_button}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Login;

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
        marginBottom: 150,
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

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    LoginText: {
        height: 50,
        flex: 1,
        padding: 12,
        color: "white"
    },

    loginBtn: {
        backgroundColor: "black",
        borderRadius: 30,
        width: "50%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
})