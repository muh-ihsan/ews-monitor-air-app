import React, { useState } from "react";

import messaging from "@react-native-firebase/messaging";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { Provider as PaperProvider } from "react-native-paper";

import colors from "./app/styles/colors";
import { Alert, Button, Image, Text, StyleSheet, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";
import HomeNavigation from "./app/navigations/HomeNavigation";
import ListMonitorScreen from "./app/screens/ListMonitorScreen";

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
                name="Home Navigation"
                component={HomeNavigation}
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
