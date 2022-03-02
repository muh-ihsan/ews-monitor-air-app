import React, { useState } from "react";
import { Image, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import messaging from "@react-native-firebase/messaging";

import HomeScreen from "../screens/HomeScreen";
import FlowMeterScreen from "../screens/FlowMeterScreen";
import PanelPompaScreen from "../screens/PanelPompaScreen";
import PressureSolarScreen from "../screens/PressureSolarScreen";
import ListMonitorScreen from "../screens/ListMonitorScreen";

const HomeStack = createNativeStackNavigator();

function HomeNavigation({ navigation }) {
  function Logo() {
    return (
      <Image
        style={{ width: 32, height: 32, marginLeft: 20 }}
        source={require("../assets/logo_boyolali.png")}
      />
    );
  }

  React.useEffect(() => {
    const notifOnScreen = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [
          {
            text: "Check",
            onPress: () => {
              navigation.navigate(remoteMessage.data.jenisMonitor, {
                monitorValue: remoteMessage.data.monitorId,
              });
            },
          },
          { text: "OK" },
        ]
      );
    });

    return notifOnScreen;
  }, []);

  React.useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification opened from background state!");
      navigation.navigate(remoteMessage.data.jenisMonitor, {
        monitorValue: remoteMessage.data.monitorId,
      });
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("Notification opened from quit state!");
          console.log(remoteMessage);
          navigation.navigate(remoteMessage.data.jenisMonitor, {
            monitorValue: remoteMessage.data.monitorId,
          });
        } else {
          console.log("There's no notification data from quit state.");
        }
      })
      .catch(console.error);
  }, []);

  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="ListMonitor"
        component={ListMonitorScreen}
        options={({ route }) => ({ title: "List Monitor" })}
      />
      <HomeStack.Screen
        name="PanelPompa"
        component={PanelPompaScreen}
        initialParams={{ monitorValue: "panelPompa1" }}
        options={{
          title: "Panel Pompa",
          headerTitleAlign: "center",
          headerRight: Logo,
        }}
      />
      <HomeStack.Screen
        name="FlowMeter"
        component={FlowMeterScreen}
        initialParams={{ monitorValue: "flowMeter1" }}
        options={{
          title: "Flow Meter",
          headerTitleAlign: "center",
          headerRight: Logo,
        }}
      />
      <HomeStack.Screen
        name="PressureSolar"
        component={PressureSolarScreen}
        initialParams={{ monitorValue: "pressureSolar1" }}
        options={{
          title: "Pressure & Solar",
          headerTitleAlign: "center",
          headerRight: Logo,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeNavigation;
