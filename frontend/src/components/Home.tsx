import React from "react"
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"

const Home = () => {
    return(
        <SafeAreaView style={{flex: 1, padding: 20, margin: 17}}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
                <TouchableOpacity>
                    <Text>You</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Following</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1, marginTop: 5 }}>
                {[
                    { id: 1, title: 'Trening 1' },
                    { id: 2, title: 'Trening 2' },
                    { id: 3, title: 'Trening 3' },
                ].map((training) => (
                    <View key={training.id} style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    <Text>{training.title}</Text>
                    </View>
        ))}
            </ScrollView>
        </SafeAreaView>
    )
};
export default Home;