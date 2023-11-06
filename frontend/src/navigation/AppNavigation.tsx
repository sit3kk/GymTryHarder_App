import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import Login from "../components/Login";
import Registration from "../components/Registration";
import HomeNavigation from "./HomeNavigation";

type RootStackParamList = {
  Registration: undefined
  Login: undefined
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoginNavigation = () => (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
      <Stack.Screen name="Registration"options={{headerShown: false}} component={Registration} />
    </Stack.Navigator>
);

export default function AppNavigation(){
  const userIsLoggedIn = false;
  return (
    <NavigationContainer>
      {userIsLoggedIn ? <HomeNavigation /> : <LoginNavigation />}
    </NavigationContainer>
  );
}