import React, { useState } from "react"
import { SafeAreaView , ScrollView, Text, View, TouchableOpacity, StyleSheet} from "react-native"
import { ExercisesSet1 } from "../assets/data";
import SingleExercise from "../components/SingleExercise";

const muscleGroups = ["All", "Chest", "Legs", "Abs", "Glutes", "Back", "Shoulders", "Triceps", "Biceps", "Forearms"];

const Exercises = () =>{
    const [activeButton, setActiveButton] = useState("All");
    const [filteredExercises, setFilteredExercises] = useState(ExercisesSet1);

    const handleButtonPress = (button: string) =>{
        setActiveButton(button);

        if (button === "All") {
            setFilteredExercises(ExercisesSet1);
          } else {
            const filtered = ExercisesSet1.filter((exercise) => exercise.muscles.includes(button));
            setFilteredExercises(filtered);
          }
    } 

    return(
        <SafeAreaView style={{flex: 1, padding: 20, marginHorizontal: 10 }}>
            <View style={{ marginTop: 10, marginBottom: 0 }}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.scrollViewContent}>
                <View style={{ flexDirection: "row" }}>
                    {muscleGroups.map((group) => (
                    <TouchableOpacity
                        key={group}
                        onPress={() => handleButtonPress(group)}
                        style={[styles.button, activeButton === group && styles.activeButton]}
                    >
                        <Text style={activeButton === group ? styles.activeText : styles.text}>{group}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            </View>


            <ScrollView style={{ flex: 1, marginTop: 0 }}>
                {filteredExercises.map((exercise) => (
                    <SingleExercise exercise={exercise} />
            ))}
            </ScrollView>
        </SafeAreaView>
    )
}
export default Exercises;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "black",
      },
    activeButton: {
        backgroundColor: 'black',
    },
    activeButtonText: {
        color: 'white',
    },
    text:{
        color: 'black'
    },
    activeText:{
        color: 'white'
    },
    scrollViewContent: {
        paddingRight: 20,
        marginBottom: 12,
    },
})