import React, { useState } from "react";

import messaging from "@react-native-firebase/messaging";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import { Provider as PaperProvider } from "react-native-paper";

import colors from "./app/styles/colors";
import HomeScreen from "./app/screens/HomeScreen";
import FlowMeterScreen from "./app/screens/FlowMeterScreen";
import PanelPompaScreen from "./app/screens/PanelPompaScreen";
import PressureSolarScreen from "./app/screens/PressureSolarScreen";
import { Alert, Button, Image, Text, StyleSheet, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

function Logo() {
  return (
    <Image
      style={{ width: 32, height: 32, marginLeft: 20 }}
      source={require("./app/assets/logo_purabaya.png")}
    />
  );
}

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home Screen") {
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
        name="Home Screen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Panel Pompa"
        component={PanelPompaScreen}
        options={{
          headerTitleAlign: "center",
          headerLeft: Logo,
        }}
      />
      <Tab.Screen
        name="Flow Meter"
        component={FlowMeterScreen}
        options={{
          headerTitleAlign: "center",
          headerLeft: Logo,
        }}
      />
      <Tab.Screen
        name="Pressure & Solar"
        component={PressureSolarScreen}
        options={{
          headerTitleAlign: "center",
          headerLeft: Logo,
        }}
      />
      {/* <Tab.Screen name="Setting" component={SettingScreen} options={{ headerRight: logOut }} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  useState(() => {
    const notifOnScreen = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });

    return notifOnScreen;
  }, []);

  console.log("App started...");
  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator>
            {authenticated ? (
              // Pengguna sudah login
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
            ) : (
              // Pengguna belum login
              <Stack.Screen
                name={"Login"}
                component={LoginScreen}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </PaperProvider>
  );
}
