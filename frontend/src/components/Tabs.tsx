
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './Settings';
import Exercises from './Exercises';
import Home from './Home';
import Stats from './Stats';
import Workout from './Workout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

function Tabs (){
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
            <Tab.Screen name="Workout" component={Workout} />
            <Tab.Screen name="Exercises" component={Exercises} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    )
}
export default Tabs;