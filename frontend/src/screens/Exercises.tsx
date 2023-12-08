import React from "react"
import { SafeAreaView , ScrollView, Text} from "react-native"
import { ExercisesSet1 } from "../assets/data";
import SingleExercise from "../components/SingleExercise";

const Exercises = () =>{
    return(
        <SafeAreaView style={{flex: 1, padding: 20, marginHorizontal: 10}}>

            <ScrollView style={{ flex: 1, marginTop: 0 }}>
                {ExercisesSet1.map((exercise) => (
                    <SingleExercise exercise={exercise} />
            ))}
            </ScrollView>
        </SafeAreaView>
    )
}
export default Exercises;