import { useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { WorkoutStackParamList } from "../navigation/HomeNavigation";

type ChooseExerciseRouteProp = RouteProp<WorkoutStackParamList, "Choose Exercise">;

type ChooseExerciseProps = {
  route: ChooseExerciseRouteProp;
};

const ChooseExercise: React.FC<ChooseExerciseProps> = ({ route }) => {
  const { onSelectExercise } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<WorkoutStackParamList>>();

  const availableExercises = ["Exercise 1", "Exercise 2", "Exercise 3"];

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, margin: 17 }}>
      <Text>Choose Exercise</Text>
      {availableExercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onSelectExercise(exercise);
            navigation.navigate("New Workout");
          }}
          style={{ marginVertical: 10, padding: 10, backgroundColor: "#007AFF" }}
        >
          <Text style={{ color: "white" }}>{exercise}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default ChooseExercise;
