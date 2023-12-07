
import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

type TrainingProps = {
    training: {
        id: number,
        title: string,
        name: string,
        surname: string,
        date: string,
        imageUri: any
    }
}

const SingleTraining: React.FC<TrainingProps> = ({ training }) => {
    const { id, title, name, surname, date, imageUri } = training;

    return (
        <View style={styles.container}>
            <Image source={imageUri} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.name}>{`${name} ${surname}`}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
      );
}
export default SingleTraining;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10,
      },
      textContainer: {
        flex: 1,
      },
      name: {
        fontSize: 18,
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
        fontSize: 16,
        marginBottom: 5,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
})