
import React from "react";
import { Image, View, Text, StyleSheet} from "react-native";

type TrainingProps = {
    training: {
        id: number,
        title: string,
        name: string,
        surname: string,
        date: string,
        imageUri: any
        exercises: string []
    }
}

const SingleTraining: React.FC<TrainingProps> = ({ training }) => {
    const { title, name, surname, date, imageUri, exercises } = training;

    return (
        <View style={styles.container}>
            <Image source={imageUri} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.name}>{`${name} ${surname}`}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
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