import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { ExercisesSet1 } from "../assets/data";

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

const SingleDraft: React.FC<DraftProps> = ({ draft }) => {
    const { plan_title, exercises } = draft;
    const [exerciseNames, setExerciseNames] = useState<string[]>([]);

    useEffect(() => {
        if (exercises.length > 0) {
            const names = exercises.map((exercise) => {
                const selectedExercise = ExercisesSet1.find(
                (ex) => ex.id === exercise.exercise_id
                );
                return selectedExercise ? selectedExercise.title : "none";
            });

            setExerciseNames(names);
        }
  }, [exercises]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{plan_title}</Text>
                <Text style={styles.exercise} numberOfLines={2} ellipsizeMode="tail">
                    {exerciseNames.join(", ")}
                </Text>
            </View>
        </View>
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
  