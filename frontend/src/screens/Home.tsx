import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native"
import SingleTraining from "../components/SingleTraining";

const Home = () => {
    const [activeButton, setActiveButton] = useState("You");

    const handleButtonPress = (button: string) =>{
        setActiveButton(button);
    }   

    const TrainingSet1 = [
        { 
          id: 1,
          title: 'plecy + barki',
          name: 'Adrian',
          surname: 'Nowak Zalno',
          date: '2023-12-01',
          imageUri: require('../assets/zalno.jpeg'),
          exercises: ['bench press', 'one hand seated row', 'squat', 'leg extension', 'incline dumbell press', 'cable fly', ]
        },
        { 
          id: 2,
          title: 'klata bic ogien',
          name: 'Adrian',
          surname: 'Nowak Zalno',
          date: '2023-12-02',
          imageUri: require('../assets/zalno.jpeg'),
          exercises: ['bench press', 'one hand seated row', 'squat']
        },
        { 
          id: 3,
          title: 'zestaw dyskotekowy',
          name: 'Adrian',
          surname: 'Nowak Zalno',
          date: '2023-12-03',
          imageUri: require('../assets/zalno.jpeg'),
          exercises: ['bench press', 'one hand seated row', 'squat']
        },
      ];

    const TrainingSet2 = [
        { 
            id: 4,
            title: 'plecy + barki',
            name: 'cbum',
            surname: 'cbum',
            date: '2023-12-01',
            imageUri: require('../assets/cbum.jpeg'),
            exercises: ['bench press', 'one hand seated row', 'squat']
          },
          { 
            id: 5,
            title: 'klata bic ogien',
            name: 'cbum',
            surname: 'cbum',
            date: '2023-12-02',
            imageUri: require('../assets/cbum.jpeg'),
            exercises: ['bench press', 'one hand seated row', 'squat']
          },
          { 
            id: 6,
            title: 'zestaw dyskotekowy',
            name: 'cbum',
            surname: 'cbum',
            date: '2023-12-03',
            imageUri: require('../assets/cbum.jpeg'),
            exercises: ['bench press', 'one hand seated row', 'squat']
          },
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
                    <SingleTraining key={training.id} training={training} />
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
    },
})