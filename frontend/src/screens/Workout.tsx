import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as SecureStore from 'expo-secure-store';
import SeriesBar from "../components/SeriesBar";
import axios from "axios";

interface Exercise {
  exercise_id: number,
  name: string;
  series: {
    counter: number;
    weight: number;
    reps: number;
  }[];
}

interface Workout{
  title: string,
  start_training: string,
  end_training: string,
  exercises: Exercise [];
}

const NewWorkout = () => {
  const navigation = useNavigation<WorkoutNavigationProp>();
  const route = useRoute();
  const initialExercises: Exercise[] = route.params?.initialExercises || [];
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [title, setTitle] = useState<string>("New Workout");
  const [start_time] = useState<string>(new Date().toISOString())

  const handleChangeTitle = (newTitle: string) =>{
    setTitle(newTitle);
  }

  const saveWorkout = async (workout: Workout) => {
    try {
      const queryString = `jsonPlan=${encodeURIComponent(JSON.stringify(workout))}`;
      const token = await SecureStore.getItemAsync("my-jwt");
  
      const response = await axios.post(
        `http://0.0.0.0:8000/save_workout/?${queryString}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Workout saved successfully!");
        navigation.goBack();
      } else {
        console.error("Error saving workout:", response.statusText, response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFinishWorkout = React.useCallback(() => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to finish workout?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            const workout: Workout = {
              title: title,
              start_training: new Date().toISOString(),
              end_training: start_time,
              exercises: exercises,
            };
            console.log(JSON.stringify(workout, null, 2));

            await saveWorkout(workout);
          },
        },
      ],
      { cancelable: false }
    );
  }, [navigation, exercises, title]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          style={styles.headerTitleInput}
          value={title}
          onChangeText={handleChangeTitle}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity 
            onPress={handleFinishWorkout} 
            style={{ marginLeft: 15 }}
        >
          <Text style={styles.headerButtonText}>Finish</Text>
        </TouchableOpacity>
      ),
    });
  }, [title, handleChangeTitle, handleFinishWorkout]);

  const handleAddExercisePress = () => {
    navigation.navigate("Choose Exercise", {
      onSelectExercise: (_id, _name) => {
        setExercises([...exercises, { exercise_id: _id, name: _name, series:[{ counter: 1, weight: 0, reps: 0 }] }]);
      },
    });
  };

  const handleAddSeries = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const existingSeries = updatedExercises[exerciseIndex].series;
  
    let newCounter = 1;
    if (existingSeries.length > 0) {
      const maxCounter = Math.max(...existingSeries.map((serie) => serie.counter));
      newCounter = maxCounter + 1;
    }
  
    updatedExercises[exerciseIndex].series.push({
      counter: newCounter,
      weight: 0,
      reps: 0,
    });
  
    setExercises(updatedExercises);
  };

  const handleDeleteExercise = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(exerciseIndex, 1);
    setExercises(updatedExercises);
  };
  
  const handleDeleteSeries = (exerciseIndex: number, seriesIndex: number) => {
    const updatedExercises = [...exercises];
    const deletedCounter = updatedExercises[exerciseIndex].series[seriesIndex].counter;
  
    updatedExercises[exerciseIndex].series.splice(seriesIndex, 1);
  
    updatedExercises[exerciseIndex].series.forEach((serie) => {
      if (serie.counter > deletedCounter) {
        serie.counter -= 1;
      }
    });
  
    setExercises(updatedExercises);
  };

  const handleWeightChange = (exerciseIndex: number, seriesIndex: number, weight: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].series[seriesIndex].weight = weight;
    setExercises(updatedExercises);
  };

  const handleRepsChange = (exerciseIndex: number, seriesIndex: number, reps: number) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].series[seriesIndex].reps = reps;
    setExercises(updatedExercises);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 0, margin: 15 }}>
      <ScrollView style={{ flex: 1 }}>
        {exercises.map((exercise, exerciseIndex) => (
          <View key={exerciseIndex} style={styles.exerciseContainer}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseText}>{exercise.name}</Text>
              <TouchableOpacity onPress={() => handleDeleteExercise(exerciseIndex)}>
                <MaterialCommunityIcons name="trash-can" size={18} color="black" />
              </TouchableOpacity>
            </View>


            {exercise.series.map((serie, seriesIndex) => (
              <View key={seriesIndex} style={{ backgroundColor: "#DDDDDD", padding: 10, borderRadius: 5, marginBottom: 7 }}>
                <SeriesBar
                  counter={serie.counter}
                  weight={serie.weight}
                  reps={serie.reps}
                  onWeightChange={(weight) => handleWeightChange(exerciseIndex, seriesIndex, weight)}
                  onRepsChange={(reps) => handleRepsChange(exerciseIndex, seriesIndex, reps)}
                  onDelete={() => handleDeleteSeries(exerciseIndex, seriesIndex)}
                />
              </View>
            ))}

            <TouchableOpacity onPress={() => handleAddSeries(exerciseIndex)} style={styles.seriesButton}>
              <Text style={styles.seriesButtonText}>Add Series</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity onPress={handleAddExercisePress} style={styles.exerciseButton}>
          <Text style={styles.seriesButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default NewWorkout;

const styles = StyleSheet.create({
  exerciseContainer:{
    backgroundColor:'#bfbfbf',
    padding: 10, 
    borderRadius: 30,
    marginBottom: 20
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 15
  },
  seriesButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "black",
    alignSelf: 'center',
    borderRadius: 30,
  },
  exerciseButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "black",
    alignSelf: 'flex-start',
    borderRadius: 30,
  },
  seriesButtonText: {
    color: "white",
    textAlign: 'center',
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center'
  },

  headerTitleInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 8,
  },

  headerButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 15,
  },
  timerContainer: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});




