import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../screens/HomeScreen";
import FlowMeterScreen from "../screens/FlowMeterScreen";
import PanelPompaScreen from "../screens/PanelPompaScreen";
import PressureSolarScreen from "../screens/PressureSolarScreen";
import ListMonitorScreen from "../screens/ListMonitorScreen";
import colors from "../styles/colors";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="List Monitor"
        component={ListMonitorScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </HomeStack.Navigator>
  );
}

function HomeNavigation() {
  function Logo() {
    return (
      <Image
        style={{ width: 32, height: 32, marginLeft: 20 }}
        source={require("../assets/logo_purabaya.png")}
      />
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Panel Pompa") {
            iconName = "calculator";
          } else if (route.name === "Flow Meter") {
            iconName = "water-pump";
          } else if (route.name === "Pressure & Solar") {
            iconName = "gauge";
          } else if (route.name === "Setting") {
            iconName = "cog";
          }

          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: colors.inactive,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Panel Pompa"
        component={PanelPompaScreen}
        initialParams={{ monitorValue: "panelPompa1" }}
        options={{
          headerTitleAlign: "center",
          headerLeft: Logo,
        }}
      />
      <Tab.Screen
        name="Flow Meter"
        component={FlowMeterScreen}
        initialParams={{ monitorValue: "flowMeter1" }}
        options={{
          headerTitleAlign: "center",
          headerLeft: Logo,
        }}
      />
      <Tab.Screen
        name="Pressure & Solar"
        component={PressureSolarScreen}
        initialParams={{ monitorValue: "pressureSolar1" }}
        options={{
          headerTitleAlign: "center",
          headerLeft: Logo,
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigation;
