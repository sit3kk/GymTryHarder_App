import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";

const Profile = () => {
  
  const userData = {
    photo: require('../assets/zalno.jpeg'),
    firstName: "Adrian",
    lastName: "Nowak Zalno",
    email: "adriannowak@wp.com",
    username: "edmuntzalno",
    followers: 2500,
    following: 200,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={userData.photo } style={styles.profileImage} />
        <Text style={styles.username}>{userData.username}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.name}>{`${userData.firstName} ${userData.lastName}`}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>
      <View style={styles.followInfo}>
        <Text style={styles.followText}>Followers: {userData.followers}</Text>
        <Text style={styles.followText}>Following: {userData.following}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 17,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfo: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  followInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  followText: {
    fontSize: 16,
  },
});

export default Profile;