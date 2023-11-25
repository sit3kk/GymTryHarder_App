import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from "react-native"

const Home = () => {
    const [activeButton, setActiveButton] = useState("You");

    const handleButtonPress = (button: string) =>{
        setActiveButton(button);
    }   

    const TrainingSet1 = [
        { id: 1, title: 'moj trening 1' },
        { id: 2, title: 'moj trening 2' },
        { id: 3, title: 'moj trening 3' },
    ]

    const TrainingSet2 = [
        { id: 1, title: 'trening durnia 1' },
        { id: 2, title: 'trening durnia 2' },
        { id: 3, title: 'trening durnia 3' },
    ]



    const renderTrainings = () =>{
        if(activeButton == "You"){
            return  TrainingSet1
        }
        else{
            return TrainingSet2
        }
    }

    return(
        <SafeAreaView style={{flex: 1, padding: 20, margin: 17}}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
                <TouchableOpacity onPress={() => handleButtonPress("You")} style={[styles.button, activeButton === "You" && styles.activeButton]}>
                    <Text style={activeButton === "You" && styles.activeText}>You</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress("Following")} style={[styles.button, activeButton === "Following" && styles.activeButton]}>
                    <Text style={activeButton === "Following" && styles.activeText}>Following</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, marginTop: 5 }}>
                {renderTrainings().map((training) => (
                    <View key={training.id} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Text>{training.title}</Text>
                    </View>
        ))}
            </ScrollView>
        </SafeAreaView>
    )
};
export default Home;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 30,
        width: 120,
        height: 40,
        marginHorizontal: 30
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
    }
})