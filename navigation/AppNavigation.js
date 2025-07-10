import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { colors } from "../constants/colors";
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from "../components/NavigationBar";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigation({ navigation }) {
    return (
        <>
            <NavigationBar navigation={navigation} />
            <FavoritesProvider>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            const icons = {
                                Home: "home",
                                Favorite: "favorite"
                            };
                            return <Icon name={icons[route.name]} size={25} color={focused ? colors.quaternaryColor : "white"} />
                        },
                        headerShown: false,
                        tabBarStyle: { backgroundColor: colors.primaryColor },
                        tabBarActiveTintColor: colors.quaternaryColor,
                        tabBarInactiveTintColor: "white",
                        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
                    })}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Favorite" component={FavoriteScreen} />
                </Tab.Navigator>
            </FavoritesProvider>
        </>
    );
}