import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

const Settings = () => {
  const navigation = useNavigation<WorkoutNavigationProp>();
  const { onLogout } = useAuth();

  const logout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      Alert.alert(result.msg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.rectangle}>
          <Text style={styles.buttonText}>Templates</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.rectangle}>
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.rectangle}>
          <Text style={styles.buttonText}>Dark Mode</Text>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.rectangle} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  rectangle: {
    borderRadius: 10,
    width: "100%",
    height: 40,
    marginBottom: 0,
    alignItems: "flex-start", 
    justifyContent: "center",
    paddingLeft: 20, 
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "darkgray",
    marginVertical: 0,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Settings;
