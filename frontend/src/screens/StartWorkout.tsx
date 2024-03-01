import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import SingleDraft from "../components/SingleDraft";

const StartWorkout = () => {
  const navigation = useNavigation<WorkoutNavigationProp>();
  const [drafts, setDrafts] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const fetchDrafts = async () => {
    try {
      const token = await SecureStore.getItemAsync("my-jwt");
      const response = await axios.get('http://0.0.0.0:8000/get_plans/?user_id=2', {
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      setDrafts(response.data);
    } catch (error) {
      console.error('Error fetching drafts:', error);
    }
  };

  const fetchWorkoutHistory = async () => {
    try {
      const token = await SecureStore.getItemAsync("my-jwt");
      const response = await axios.get('http://0.0.0.0:8000/get_workouts/?user_id=2', {
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      const mappedWorkouts = response.data.map((workout: any) => {
        const { workout_id, workout_tile, exercises } = workout;
  
        const mappedExercises = exercises.map((exercise: any) => {
          const { exercise_id, series } = exercise;
          const num_series = series.length;
  
          return {
            exercise_id,
            num_series,
          };
        });
  
        return {
          plan_id: workout_id,
          plan_title: workout_tile,
          exercises: mappedExercises,
        };
      });
  
      setWorkouts(mappedWorkouts);
    
      
    } catch (error) {
      console.error('Error fetching drafts:', error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchDrafts();
      fetchWorkoutHistory();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.blankButton}
        onPress={() => navigation.navigate('New Workout', { initialExercises: [] })}
      >
        <Text style={{ color: 'white' }}>Blank Workout</Text>
      </TouchableOpacity>
      <ScrollView>
          <View style={styles.barContainer}>
            <Text style={styles.barText}>Drafts</Text>
            <View style={styles.barView}/>
          </View>
          {drafts.map((draft, index) => (
            <SingleDraft key={index} draft={draft} />
          ))}

          <View style={styles.barContainer}>
            <Text style={styles.barText}>Recent Workouts</Text>
            <View style={styles.barView}/>
          </View>
          {workouts.map((workout, index) => (
            <SingleDraft key={index} draft={workout} />
          ))}
      </ScrollView> 

    </SafeAreaView>
  );
};
export default StartWorkout;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        margin: 17
    },
    blankButton:{
        backgroundColor: 'black', 
        borderRadius: 30, 
        paddingVertical: 15, 
        alignItems: 'center', 
    },
    barContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 10
    },
    barText:{
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 16
    },
    barView:{
        flex: 1,
        height: 1,
        backgroundColor: 'lightgray',
    }
});