import { useNavigation } from "@react-navigation/native"
import React from "react"
import { SafeAreaView , Text, TouchableOpacity} from "react-native"
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

const StartWorkout = () =>{
    const navigation = useNavigation<WorkoutNavigationProp>();

    return(
        <SafeAreaView style={{flex: 1, padding: 20, margin: 17}}>
            <Text>Start workout!</Text>

            <TouchableOpacity onPress={() => navigation.navigate('New Workout')}>
                <Text>Start new workout here</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
export default StartWorkout;