import React from "react";
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";

import colors from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Surface, TouchableRipple } from "react-native-paper";

function logOut() {
  Alert.alert("", "Apakah anda ingin log out?", [
    {
      text: "Iya",
      onPress: () => {
        auth()
          .signOut()
          .then(() => {
            console.log("User signed out!");
            // messaging()
            //   .unsubscribeFromTopic("notif")
            //   .then(() => console.log("Unsubscribe to topic"));
          });
      },
    },
    {
      text: "Tidak",
    },
  ]);
}

function HomeScreen({ navigation }) {
  const user = auth().currentUser;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        translucent={true}
      />
      <Surface style={{ elevation: 10, borderRadius: 32 }}>
        <ImageBackground
          style={styles.headerBackground}
          imageStyle={styles.headerImage}
          source={require("../assets/home_header.png")}
        >
          <View style={styles.headerWrapper}>
            <Image
              style={styles.imageLogo}
              source={require("../assets/logo_purabaya.png")}
              fadeDuration={0}
            />
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerTextTitle}>EWS & Monitor Air</Text>
              <Text style={styles.headerTextEmail}>{user.email}</Text>
            </View>
          </View>
        </ImageBackground>
      </Surface>
      <View style={styles.monitorListWrapper}>
        <Text style={styles.textListMonitor}>{"List Monitor   >"}</Text>
        <Surface style={{ elevation: 3, borderRadius: 8 }}>
          <TouchableRipple
            style={styles.buttonMonitor}
            borderless={true}
            rippleColor="#B3B3B3"
            underlayColor="#B3B3B3"
            onPress={() =>
              navigation.navigate("ListMonitor", {
                jenisMonitor: "panel-pompa",
                name: "Panel Pompa",
                screenName: "PanelPompa",
              })
            }
          >
            <View style={styles.textMonitorWrapper}>
              <Text style={styles.textMonitor}>Panel Pompa</Text>
            </View>
          </TouchableRipple>
        </Surface>
        <Surface style={{ elevation: 3, borderRadius: 8 }}>
          <TouchableRipple
            style={styles.buttonMonitor}
            borderless={true}
            rippleColor="#B3B3B3"
            underlayColor="#B3B3B3"
            onPress={() =>
              navigation.navigate("ListMonitor", {
                jenisMonitor: "flow-meter",
                name: "Flow Meter",
                screenName: "FlowMeter",
              })
            }
          >
            <View style={styles.textMonitorWrapper}>
              <Text style={styles.textMonitor}>Flow Meter</Text>
            </View>
          </TouchableRipple>
        </Surface>
        <Surface style={{ elevation: 3, borderRadius: 8 }}>
          <TouchableRipple
            style={styles.buttonMonitor}
            borderless={true}
            underlayColor="#B3B3B3"
            rippleColor="#B3B3B3"
            onPress={() =>
              navigation.navigate("ListMonitor", {
                jenisMonitor: "pressure-solar",
                name: "Pressure & Solar",
                screenName: "PressureSolar",
              })
            }
          >
            <View style={styles.textMonitorWrapper}>
              <Text style={styles.textMonitor}>Pressure Sensor & Solar</Text>
            </View>
          </TouchableRipple>
        </Surface>
      </View>
      <Button
        mode="contained"
        color="#f43f5e"
        dark={true}
        style={styles.buttonLogout}
        contentStyle={{ height: 56, width: 120 }}
        labelStyle={{ fontSize: 15 }}
        onPress={logOut}
      >
        Log Out
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonLogout: {
    // backgroundColor: "#f43f5e",
    height: 56,
    width: 120,
    borderRadius: 6,
    alignSelf: "center",
    marginTop: 64,
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center",
  },
  buttonMonitor: {
    backgroundColor: colors.bgCard,
    height: 64,
    justifyContent: "center",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerBackground: {
    height: 190,
  },
  headerImage: {
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
  },
  headerWrapper: {
    flexDirection: "row",
    alignContent: "stretch",
    marginTop: 32,
    height: 120,
    width: "100%",
  },
  headerTextEmail: {
    color: colors.textWhite,
    paddingVertical: 8,
  },
  headerTextTitle: {
    color: colors.textWhite,
    fontWeight: "bold",
    fontSize: 24,
  },
  headerTextWrapper: {
    justifyContent: "center",
    marginStart: 16,
    alignContent: "stretch",
  },
  imageLogo: {
    width: 120,
    height: 120,
    marginLeft: 16,
  },
  monitorListWrapper: {
    marginTop: 48,
    marginHorizontal: 16,
    height: 272,
    justifyContent: "space-evenly",
  },
  textListMonitor: {
    marginStart: 8,
    color: colors.text,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  textMonitorWrapper: { flexDirection: "row", elevation: 2 },
  textMonitor: {
    color: colors.text,
    marginStart: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  textLogout: {
    color: colors.textWhite,
    fontSize: 18,
  },
});

export default HomeScreen;
