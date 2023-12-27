import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import HomeNavigation from "./HomeNavigation";

type LoginStackParamList = {
  Registration: undefined
  Login: undefined
}

export type LoginNavigationProp = NativeStackNavigationProp<
  LoginStackParamList
>;

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

const LoginNavigation = () => (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" options={{headerShown: false}} component={Login} />
      <LoginStack.Screen name="Registration"options={{headerShown: false}} component={Registration} />
    </LoginStack.Navigator>
);

export default function AppNavigation(){
  const {authState, onLogout} = useAuth();

  return (
    <NavigationContainer>
      {authState?.authenticated ? <HomeNavigation /> : <LoginNavigation />}
    </NavigationContainer>
  );
}