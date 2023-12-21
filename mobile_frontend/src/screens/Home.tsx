import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";
import { TrainingSet1, TrainingSet2 } from "../assets/data";
import SingleTraining from "../components/SingleTraining";

const Home = () => {
  const [activeButton, setActiveButton] = useState("You");

  const handleButtonPress = (button: string) => {
    setActiveButton(button);
  };

  const renderTrainings = () => {
    return activeButton === "You" ? TrainingSet1 : TrainingSet2;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleButtonPress("You")}
          style={[styles.button, activeButton === "You" && styles.activeButton]}
        >
          <Text style={activeButton === "You" && styles.activeText}>You</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonPress("Following")}
          style={[styles.button, activeButton === "Following" && styles.activeButton]}
        >
          <Text style={activeButton === "Following" && styles.activeText}>Following</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {renderTrainings().map((training) => (
          <SingleTraining key={training.id} training={training} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 3,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    width: 120,
    height: 40,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  activeButton: {
    backgroundColor: "black",
  },
  activeText: {
    color: "white",
  },
  scrollView: {
    flex: 1,
    marginTop: 5,
  },
});

export default Home;
