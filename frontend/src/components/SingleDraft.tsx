import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { ExercisesSet1 } from "../assets/data";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

type DraftProps = {
    draft: {
        plan_id: number,
        plan_title: string,
        exercises: {
            exercise_id: number,
            num_series: number
        }[],
    }
}

interface Exercise {
  exercise_id: number;
  name: string;
  series: {
    counter: number;
    weight: number;
    reps: number;
  }[];
}

const convertToExercises = (
  data: { exercise_id: number; num_series: number }[]
): Exercise[] => {
  return data.map((item) => {
    const selectedExercise = ExercisesSet1.find(ex => ex.id === item.exercise_id);
    return {
      exercise_id: item.exercise_id,
      name: selectedExercise ? selectedExercise.title : `Exercise ${item.exercise_id}`,
      series: Array.from({ length: item.num_series }, (_, index) => ({
        counter: index + 1,
        weight: 0,
        reps: 0,
      })),
    };
  });
};



const SingleDraft: React.FC<DraftProps> = ({ draft }) => {
    const { plan_title, exercises } = draft;
    const [exerciseNames, setExerciseNames] = useState<string[]>([]);
    const navigation = useNavigation<WorkoutNavigationProp>();

    useEffect(() => {
        if ( exercises.length > 0) {
            const names = exercises.map((exercise) => {
                const selectedExercise = ExercisesSet1.find(
                (ex) => ex.id === exercise.exercise_id
                );
                return selectedExercise ? selectedExercise.title : "none";
            });

            setExerciseNames(names);
        }
  }, [exercises]);

  const handleStartWorkout = () => {
    const convertedExercises: Exercise[] = convertToExercises(exercises);
    navigation.navigate("New Workout", { initialExercises: convertedExercises });
  };

    return (
      <TouchableOpacity onPress={handleStartWorkout}>
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{plan_title}</Text>
                <Text style={styles.exercise} numberOfLines={2} ellipsizeMode="tail">
                    {exerciseNames.join(", ")}
                </Text>
            </View>
        </View>
      </TouchableOpacity>
      );
}
export default SingleDraft;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      borderBottomWidth: 0,
      borderBottomColor: '#ccc',
      paddingVertical: 5, 
    },
    textContainer: {
      flex: 1,
      justifyContent: 'space-between'
    },
    exercise: {
      fontSize: 12,
      marginBottom: 5,
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 1,
    },
  });
  