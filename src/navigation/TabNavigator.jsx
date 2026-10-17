
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import WeatherScreen from "../screens/WeatherScreen";
import CitiesScreen from "../screens/CitiesScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#182536",
          borderTopColor: "#263548",
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#93C5FD",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === "Weather"
              ? "cloud-outline"
              : "location-outline";

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Cities" component={CitiesScreen} />
    </Tab.Navigator>
  );
}
