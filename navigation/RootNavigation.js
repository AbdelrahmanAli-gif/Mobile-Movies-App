import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigation from "./AppNavigation";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MovieScreen from "../screens/MovieScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <>
            <View style={{ paddingTop: 20 }}></View>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="App" component={AppNavigation} />
                <Stack.Screen name="MovieDetails" component={MovieScreen} />
            </Stack.Navigator>
        </>
    );
}