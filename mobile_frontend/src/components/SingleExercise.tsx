import React, { useId } from "react";
import { StyleSheet } from "react-native";
import { Image, View, Text } from "react-native";

type ExerciseProps = {
    exercise:{
        id: number,
        title: string,
        imageUri: any,
        description: string
        muscles: string []
    }
}

const SingleExercise: React.FC<ExerciseProps> = ({ exercise }) =>{
    const { title, imageUri, description, muscles } = exercise

    return(
        <View style={styles.container}>
            <Image source={imageUri} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.exercise} numberOfLines={2} ellipsizeMode="tail">
                    {muscles.join(", ")}
                </Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}
export default SingleExercise;

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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    exercise: {
        fontSize: 14,
        marginBottom: 2,
    },
    description: {
        fontSize: 12,
        marginBottom: 2,
    },
})