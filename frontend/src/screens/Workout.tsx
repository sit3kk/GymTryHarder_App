import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

interface Exercise {
  name: string;
  series: {
    counter: number;
    weight: number;
    reps: number;
  }[];
}

const SeriesBar = ({ counter, weight, reps, onWeightChange, onRepsChange }: { counter: number; weight: number; reps: number; onWeightChange: (weight: number) => void; onRepsChange: (reps: number) => void }) => (
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
    const lastSeries = updatedExercises[exerciseIndex].series[updatedExercises[exerciseIndex].series.length - 1];

    updatedExercises[exerciseIndex].series.push({
      counter: lastSeries.counter + 1,
      weight: 0,
      reps: 0,
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
    <SafeAreaView style={{ flex: 1, padding: 20, margin: 17 }}>
      <ScrollView style={{ flex: 1 }}>
        {exercises.map((exercise, exerciseIndex) => (
          <View key={exerciseIndex}>
            <Text style={styles.exerciseText}>{exercise.name}</Text>

            {exercise.series.map((serie, seriesIndex) => (
              <View key={seriesIndex} style={{ backgroundColor: "#DDDDDD", padding: 10, borderRadius: 5, marginBottom: 7 }}>
                <SeriesBar
                  counter={serie.counter}
                  weight={serie.weight}
                  reps={serie.reps}
                  onWeightChange={(weight) => handleWeightChange(exerciseIndex, seriesIndex, weight)}
                  onRepsChange={(reps) => handleRepsChange(exerciseIndex, seriesIndex, reps)}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    padding: 5,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    height: 30,
  },
  seriesText: {
    alignSelf: 'flex-start',
    lineHeight: 20,
  },
  seriesInput: {
    flex: 1,
    textAlign: "center",
    height: 30,
    borderColor: "transparent",
    borderBottomWidth: 1,
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
  },
});




