import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";
import { ExercisesSet1, TrainingSet1, TrainingSet2 } from "../assets/data";
import SingleTraining from "../components/SingleTraining";
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from "@react-navigation/native";


interface WorkoutOwner {
    owner_id: number,
    full_name: string,
    photo: string,
    workouts: Workout []
}

interface Workout{
   workout_id: number,
   title: string,
   date: string,
   exercises: string []
}

const Home = () => {
  const [activeButton, setActiveButton] = useState("You");
  const [workoutOwner, setWorkoutOwner] = useState<WorkoutOwner>();

  const fetchMyInformations = async () => {
    try {
      const token = await SecureStore.getItemAsync("my-jwt");
      const response = await axios.get('http://0.0.0.0:8000/users/me', {
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      const { id: owner_id, full_name, photo } = response.data;
      setWorkoutOwner({
        owner_id,
        full_name,
        photo,
        workouts: [], 
      });

    } catch (error) {
      console.error('Error fetching workout owner informations:', error);
    }
  }

  const findExerciseNameById = (exerciseId: number) => {
    const exercise = ExercisesSet1.find((item) => item.id === exerciseId);
    return exercise ? exercise.title : "Unknown Exercise";
  };

  const fetchMyTrainings = async () => {
    try {
      const token = await SecureStore.getItemAsync("my-jwt");
      const response = await axios.get('http://0.0.0.0:8000/get_workouts/?user_id=2', {
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      const workoutsData = response.data;

      setWorkoutOwner((prevState: WorkoutOwner | undefined) => ({
        ...prevState!,
        workouts: workoutsData.map((workout: any) => ({
        workout_id: workout.workout_id,
        title: workout.workout_tile,
        date: workout.start_training,
        exercises: workout.exercises.map((exercise: any) => findExerciseNameById(exercise.exercise_id)),
      })),
    }));

    } catch (error) {
      console.error('Error fetching all owner trainigns:', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMyInformations();
      fetchMyTrainings();
    }, [])
  );

  const handleButtonPress = (button: string) => {
    setActiveButton(button);
  };

  const renderTrainings = () => {
    const MySet = workoutOwner?.workouts?.map((workout:Workout) => ({
      id: workout.workout_id,
      full_name: workoutOwner.full_name,
      // to jest do zmiany jak zrobie firebase !!!!!!!!!!
      imageUri: require('../assets/zalno.jpeg'),
      title: workout.title,
      date: workout.date.substring(0, 10),
      exercises: workout.exercises
    })) || []

    const sortedTrainings = MySet.sort((a, b) => {
      const dateA = new Date(a.date) as any;
      const dateB = new Date(b.date) as any;
      return dateB - dateA;
    });
  
    return activeButton === "You" ? sortedTrainings : TrainingSet2;
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
