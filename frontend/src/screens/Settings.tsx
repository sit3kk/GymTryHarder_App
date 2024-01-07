import { useNavigation } from "@react-navigation/native";
import React from "react"
import { Alert, SafeAreaView , StyleSheet, Text, TouchableOpacity} from "react-native"
import { useAuth } from "../context/AuthContext";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

const Settings = () =>{
    const navigation = useNavigation<WorkoutNavigationProp>();
    const {onLogout} = useAuth();

    const logout = async () => {
        const result = await onLogout!();
        if(result && result.error){
            Alert.alert(result.msg);
        }
    }

    return(
        <SafeAreaView style={{flex: 1, padding: 20, margin: 17}}>
            <TouchableOpacity style={styles.loginBtn} onPress={logout}>
                <Text style={styles.LoginText}>Logout</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.LoginText}>Profile</Text> 
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Settings;

const styles = StyleSheet.create({
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