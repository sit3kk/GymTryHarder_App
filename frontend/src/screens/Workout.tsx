import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface Exercise {
  name: string;
  series: {
    counter: number;
    weight: number;
    reps: number;
  }[];
}

const SeriesBar = ({ counter, weight, reps, onWeightChange, onRepsChange, onDelete }: { counter: number; weight: number; reps: number; onWeightChange: (weight: number) => void; onRepsChange: (reps: number) => void; onDelete: () => void }) => (
  <View style={styles.seriesContainer}>
    <Text style={styles.seriesText}>{`${counter}.`}</Text>
    <TextInput
      style={styles.seriesInput}
      placeholder="Weight"
      value={weight ? weight.toString() : ''}
      keyboardType="numeric"
      onChangeText={(text) => onWeightChange(Number(text))}
    />
    <TextInput
      style={styles.seriesInput}
      placeholder="Reps"
      value={reps ? reps.toString() : ''}
      keyboardType="numeric"
      onChangeText={(text) => onRepsChange(Number(text))}
    />
    <TouchableOpacity onPress={onDelete}>
        <MaterialCommunityIcons 
                name="delete"
                color= "black"
                size={17}>
        </MaterialCommunityIcons>
     </TouchableOpacity>
  </View>
);

const BlankWorkout = () => {
  const navigation = useNavigation<WorkoutNavigationProp>();

  const [exercises, setExercises] = useState<Exercise[]>([]);

  const handleAddExercisePress = () => {
    navigation.navigate("Choose Exercise", {
      onSelectExercise: (exercise) => {
        setExercises([...exercises, { name: exercise, series: [{ counter: 1, weight: 0, reps: 0 }] }]);
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
                <MaterialCommunityIcons 
                  name="delete"
                  color= "black"
                  size={17}>
                </MaterialCommunityIcons>
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
export default BlankWorkout;

const styles = StyleSheet.create({
  seriesContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 5,
    padding: 0,
    backgroundColor: "#DDDDDD",
    borderRadius: 30,
    height: 15,
  },
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
  seriesText: {
    alignSelf: 'flex-start',
  },
  seriesInput: {
    flex: 1,
    textAlign: "center",
    borderColor: "transparent",
    borderBottomWidth: 0,
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
});




