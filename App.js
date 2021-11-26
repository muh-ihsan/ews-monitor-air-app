import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import colors from "./app/styles/colors";
import FlowMeterScreen from "./app/screens/FlowMeterScreen";
import PanelPompaScreen from "./app/screens/PanelPompaScreen";
import PressureSolarScreen from "./app/screens/PressureSolarScreen";

const Tab = createBottomTabNavigator();

const Theme = {
  dark: false,
  colors: {
    primary: "white",
    background: colors.background,
    card: colors.secondary,
    text: "white",
    border: "black",
  },
};

export default function App() {
  console.log("App started...");
  return (
    <NavigationContainer theme={Theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Panel") {
              iconName = "calculator";
            } else if (route.name === "Flow") {
              iconName = "water-pump";
            } else if (route.name === "Pressure") {
              iconName = "gauge";
            }

            return <MaterialIcon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: colors.inactive,
        })}
      >
        <Tab.Screen name="Panel" component={PanelPompaScreen} />
        <Tab.Screen name="Flow" component={FlowMeterScreen} />
        <Tab.Screen name="Pressure" component={PressureSolarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
