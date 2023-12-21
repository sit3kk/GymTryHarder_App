import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react"
import { SafeAreaView , Text, TouchableOpacity, View} from "react-native"
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

const BlankWorkout = () =>{
    const navigation = useNavigation<WorkoutNavigationProp>();

    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

    const handleSelectExercise = (exercise: string) => {
        setSelectedExercises([...selectedExercises, exercise]);
    };

    const handleAddExercisePress = () => {
        navigation.navigate("Choose Exercise", {
        onSelectExercise: handleSelectExercise,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, margin: 17 }}>
      <View style={{ marginTop: 20 }}>
        <Text>Selected Exercises:</Text>
        {selectedExercises.map((exercise, index) => (
          <Text key={index}>{exercise}</Text>
        ))}
      </View>

      <TouchableOpacity onPress={handleAddExercisePress} style={{ marginTop: 20, padding: 10, backgroundColor: "#4CD964" }}>
        <Text style={{ color: "white" }}>Add Exercise</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default BlankWorkout;