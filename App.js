import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import database from "@react-native-firebase/database";

import FlowMeterScreen from "./app/screens/FlowMeterScreen";
import PanelPompaScreen from "./app/screens/PanelPompaScreen";
import PressureSolarScreen from "./app/screens/PressureSolarScreen";

const Tab = createBottomTabNavigator();

const Theme = {
  dark: false,
  colors: {
    primary: "#0E5B7F",
    background: "#ffffff",
    card: "white",
    text: "#000",
    border: "black",
  },
};

export default function App() {
  console.log("App started...");
  return (
    <NavigationContainer theme={Theme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Panel" component={PanelPompaScreen} />
        <Tab.Screen name="Flow" component={FlowMeterScreen} />
        <Tab.Screen name="Pressure" component={PressureSolarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
