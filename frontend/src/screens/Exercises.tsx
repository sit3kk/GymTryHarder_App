import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ExercisesSet1 } from "../assets/data";
import SingleExercise from "../components/SingleExercise";

const muscleGroups = ["All", "Chest", "Legs", "Abs", "Glutes", "Back", "Shoulders", "Triceps", "Biceps", "Forearms"];

const Exercises = () => {
  const [activeButton, setActiveButton] = useState("All");
  const [filteredExercises, setFilteredExercises] = useState(ExercisesSet1);

  const handleButtonPress = (button: string) => {
    setActiveButton(button);

    if (button === "All") {
      setFilteredExercises(ExercisesSet1);
    } else {
      const filtered = ExercisesSet1.filter((exercise) => exercise.muscles.includes(button));
      setFilteredExercises(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.buttonsRow}>
            {muscleGroups.map((group) => (
              <TouchableOpacity
                key={group}
                onPress={() => handleButtonPress(group)}
                style={activeButton === group ? styles.activeButton : styles.button}
              >
                <Text style={activeButton === group ? styles.activeText : styles.text}>{group}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredExercises.map((exercise) => (
          <SingleExercise exercise={exercise} key={exercise.id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 10,
    marginTop: 9,
  },
  buttonContainer: {
    marginBottom: 1
  },
  scrollViewContent: {
    paddingRight: 20,
    marginBottom: 10
  },
  buttonsRow: {
    flexDirection: "row",
    marginHorizontal: 0,
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  activeButton: {
    backgroundColor: 'black',
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  text: {
    color: 'black',
  },
  activeText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    marginTop: 0,
  },
});

export default Exercises;
