import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LoginNavigationProp } from "../navigation/AppNavigation";

const Registration = () =>{
    const navigation = useNavigation<LoginNavigationProp>();

    return(
        <SafeAreaView style={styles.containter}>
            <Text style={styles.title}> Registration Screen</Text>

            <View style={styles.inputView}>
                <TextInput style={styles.TextInput} placeholder="Enter Full Name" autoCapitalize="none" />
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.TextInput} placeholder="Enter email adress" autoCapitalize="none" />
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.TextInput} placeholder="Enter password" autoCapitalize="none" secureTextEntry={true} />
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.TextInput} placeholder="Repeat password" autoCapitalize="none" secureTextEntry={true} />
            </View>

            <TouchableOpacity style={styles.loginBtn}>
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
