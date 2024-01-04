import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";

const StartWorkout = () => {
  const navigation = useNavigation<WorkoutNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.blankButton}
        onPress={() => navigation.navigate('New Workout')}
      >
        <Text style={{ color: 'white' }}>Blank Workout</Text>
      </TouchableOpacity>

      <View style={styles.barContainer}>
        <Text style={styles.barText}>Drafts</Text>
        <View style={styles.barView}/>
      </View>

      <View style={styles.barContainer}>
        <Text style={styles.barText}>Recent Workouts</Text>
        <View style={styles.barView}/>
      </View>

    </SafeAreaView>
  );
};
export default StartWorkout;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        margin: 17
    },
    blankButton:{
        backgroundColor: 'black', 
        borderRadius: 30, 
        paddingVertical: 15, 
        alignItems: 'center', 
    },
    barContainer:{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginVertical: 10
    },
    barText:{
        fontWeight: 'bold',
        marginRight: 10,
        fontSize: 12
    },
    barView:{
        flex: 1,
        height: 1,
        backgroundColor: 'lightgray',
    }
});