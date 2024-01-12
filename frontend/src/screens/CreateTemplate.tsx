import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

interface Exercise{
    exercise_id: number
    name: string
    num_series: number
}

interface CreateTemplateProps {
  onSelectTemplate: (template: Exercise[]) => void;
}

const CreateTemplate: React.FC<CreateTemplateProps> = ({ onSelectTemplate }) => {
  const navigation = useNavigation<WorkoutNavigationProp>();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleAddExercisePress = () => {
    navigation.navigate("Choose Exercise", {
      onSelectExercise: (exercise) => {
        setExercises([...exercises, { name: exercise, series: [] }]);
      },
    });
  };

  const handleCreateTemplate = () => {
    const template = exercises.map((exercise) => ({ name: exercise.name, series: [] }));
    onSelectTemplate(template);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titleText}>Template Title:</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={(newTitle) => setTitle(newTitle)}
        />

        {exercises.map((exercise, exerciseIndex) => (
          <View key={exerciseIndex} style={styles.exerciseContainer}>
            <Text style={styles.exerciseText}>{exercise.name}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={handleAddExercisePress} style={styles.button}>
          <Text style={styles.buttonText}>Add Exercise</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCreateTemplate} style={styles.button}>
          <Text style={styles.buttonText}>Create Template</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    margin: 10,
  },
  scrollView: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 16,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
  },
  exerciseContainer: {
    backgroundColor: '#bfbfbf',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  exerciseText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CreateTemplate;
