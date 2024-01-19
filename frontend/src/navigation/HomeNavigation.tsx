import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Exercises from '../screens/Exercises';
import Home from '../screens/Home';
import Stats from '../screens/Stats';
import StartWorkout from '../screens/StartWorkout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import WorkoutFinishButton from '../components/WorkoutFinishButton';
import ChooseExercise from '../screens/ChooseExercise';
import NewWorkout from '../screens/Workout';
import Profile from '../screens/Profile';
import CreateTemplate from '../screens/CreateTemplate';

interface Exercise {
  exercise_id: number,
  name: string;
  series: {
    counter: number;
    weight: number;
    reps: number;
  }[];
}

export type WorkoutStackParamList = {
  'Home': undefined
  'New Workout': { initialExercises?: Exercise[] };
  'Choose Exercise': { onSelectExercise: (id: number, name: string) => void };
  'Profile': undefined
  "Create Template": undefined
}

export type WorkoutNavigationProp = NativeStackNavigationProp<
  WorkoutStackParamList
>;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<WorkoutStackParamList>()

function HomeTabs(){
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: () => {
              const icons: Record<string, string> = {
                Home: "home",
                Stats: "chart-bar",
                Workout: "dumbbell",
                Exercises: "weight-lifter",
                Settings: "cog",
              };
        
              return (
                <MaterialCommunityIcons
                  name={icons[route.name]}
                  color= "black"
                  size={24}
                />
              );
            },
          })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Stats" component={Stats} />
            <Tab.Screen name="Workout" component={StartWorkout} />
            <Tab.Screen name="Exercises" component={Exercises} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}

function HomeNavigation(){
    return(
      <Stack.Navigator>
        <Stack.Screen 
            name="Home" 
            component={HomeTabs} 
            options={{headerShown: false}}
        />
        <Stack.Screen 
            name="New Workout" 
            component={NewWorkout}
            options={{headerShown: true}} 
        />
        <Stack.Screen 
            name="Choose Exercise" 
            component={ChooseExercise} 
            options={{headerShown: true,  animation:"slide_from_bottom"}}
        />
        <Stack.Screen 
            name="Profile" 
            component={Profile} 
            options={{headerShown: true}}
        />
        <Stack.Screen 
            name="Create Template" 
            component={CreateTemplate} 
            options={{headerShown: true}}
        />
      </Stack.Navigator>
    )
}
export default HomeNavigation;