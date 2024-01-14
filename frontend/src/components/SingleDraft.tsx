import React from "react";
import { Image, View, Text, StyleSheet} from "react-native";

type DraftProps = {
    draft: {
        id: number,
        title: string,
        exercises: {
            exercise_id: number,
            num_series: number
        }[],
    }
}

const SingleTraining: React.FC<DraftProps> = ({ draft }) => {
    const { id, title, exercises } = draft;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.exercise} numberOfLines={2} ellipsizeMode="tail">
                    {exercises.join(", ")}
                </Text>
            </View>
        </View>
      );
}
export default SingleTraining;

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 5, 
  },
  image: {
      width: 70,
      height: 70,
      borderRadius: 0,
      marginRight: 10,
  },
  textContainer: {
      flex: 1,
      justifyContent: 'space-between'
  },
  headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', 
      marginTop: 0,
  },
  name: {
      fontSize: 16,
      fontWeight: 'bold',
  },
  date: {
      fontSize: 14,
      color: '#555',
  },
  exercisesContainer: {
      flex: 1,
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