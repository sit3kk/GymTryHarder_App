import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { WorkoutNavigationProp } from "../navigation/HomeNavigation";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import SingleDraft from "../components/SingleDraft";

const StartWorkout = () => {
  const navigation = useNavigation<WorkoutNavigationProp>();
  const [drafts, setDrafts] = useState([]);

  const fetchDrafts = async () => {
    try {
      const token = await SecureStore.getItemAsync("my-jwt");
      const response = await axios.get('http://0.0.0.0:8000/get_plans/?user_id=2', {
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });

      setDrafts(response.data);
    } catch (error) {
      console.error('Error fetching drafts:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDrafts();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.blankButton}
        onPress={() => navigation.navigate('New Workout')}
      >
        <Text style={{ color: 'white' }}>Blank Workout</Text>
      </TouchableOpacity>
      <ScrollView>
          <View style={styles.barContainer}>
            <Text style={styles.barText}>Drafts</Text>
            <View style={styles.barView}/>
          </View>
          {drafts.map((draft, index) => (
            <SingleDraft key={index} draft={draft} />
          ))}

          <View style={styles.barContainer}>
            <Text style={styles.barText}>Recent Workouts</Text>
            <View style={styles.barView}/>
          </View>
      </ScrollView> 

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