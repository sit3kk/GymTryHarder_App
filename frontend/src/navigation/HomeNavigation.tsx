
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../components/Settings';
import Exercises from '../components/Exercises';
import Home from '../components/Home';
import Stats from '../components/Stats';
import Workout from '../components/Workout';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

function HomeNavigation(){
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
export default HomeNavigation;