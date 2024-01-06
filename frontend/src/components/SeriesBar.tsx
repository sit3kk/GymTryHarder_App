import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SeriesBar = ({ counter, weight, reps, onWeightChange, onRepsChange, onDelete }:
    { counter: number;
      weight: number;
      reps: number; 
      onWeightChange: (weight: number) => void; 
      onRepsChange: (reps: number) => void; 
      onDelete: () => void 
    }) => (
    <View style={styles.seriesContainer}>
      <Text style={styles.seriesText}>{`${counter}.`}</Text>
      <TextInput
        style={styles.seriesInput}
        placeholder="Weight"
        value={weight ? weight.toString() : ''}
        keyboardType="numeric"
        onChangeText={(text) => onWeightChange(Number(text))}
      />
      <TextInput
        style={styles.seriesInput}
        placeholder="Reps"
        value={reps ? reps.toString() : ''}
        keyboardType="numeric"
        onChangeText={(text) => onRepsChange(Number(text))}
      />
      <TouchableOpacity onPress={onDelete}>
        <MaterialCommunityIcons name="trash-can" size={18} color="black" />
       </TouchableOpacity>
    </View>
  );
  export default SeriesBar;

  const styles = StyleSheet.create({
    seriesContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 5,
        padding: 0,
        backgroundColor: "#DDDDDD",
        borderRadius: 30,
        height: 15,
      },
    seriesText: {
        alignSelf: 'flex-start',
      },
      seriesInput: {
        flex: 1,
        textAlign: "center",
        borderColor: "transparent",
        borderBottomWidth: 0,
      },
  })