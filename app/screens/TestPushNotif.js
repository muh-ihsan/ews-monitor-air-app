import React from "react";
import notifee from "@notifee/react-native";
import { Button, StatusBar, View } from "react-native";

function TestPushNotif() {
  async function onDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    // Display a notification
    await notifee.displayNotification({
      title: "Notification Title",
      body: "Main body content of the notification",
      android: {
        channelId,
      },
    });
  }

  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <Button
        title="Display Notification"
        onPress={() => onDisplayNotification()}
      />
    </View>
  );
}

export default TestPushNotif;
