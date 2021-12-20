import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";

import colors from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function logOut() {
  Alert.alert("", "Apakah anda ingin log out?", [
    {
      text: "Ya",
      onPress: () => {
        auth()
          .signOut()
          .then(() => {
            console.log("User signed out!");
            messaging()
              .unsubscribeFromTopic("notif")
              .then(() => console.log("Unsubscribe to topic"));
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
      <View style={styles.monitorListWrapper}>
        <Text style={styles.textListMonitor}>{"List Monitor   >"}</Text>
        <TouchableHighlight
          style={styles.buttonMonitor}
          onPress={() => navigation.navigate("Panel Pompa")}
        >
          <View style={styles.textMonitorWrapper}>
            <Text style={styles.textMonitor}>Panel Pompa</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonMonitor}
          onPress={() => navigation.navigate("Flow Meter")}
        >
          <View style={styles.textMonitorWrapper}>
            <Text style={styles.textMonitor}>Flow Meter</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonMonitor}
          onPress={() => navigation.navigate("Pressure & Solar")}
        >
          <View style={styles.textMonitorWrapper}>
            <Text style={styles.textMonitor}>Pressure Sensor & Solar</Text>
          </View>
        </TouchableHighlight>
      </View>
      <TouchableHighlight
        style={styles.buttonLogout}
        underlayColor={"#74414B"}
        onPress={logOut}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.textLogout}>Log Out</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonLogout: {
    backgroundColor: "#CA566B",
    height: 56,
    width: 120,
    borderRadius: 8,
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
  headerWrapper: {
    flexDirection: "row",
    alignContent: "stretch",
    marginTop: 32,
    height: 120,
    width: "100%",
  },
  headerTextEmail: {
    color: "#fff",
    paddingVertical: 8,
  },
  headerTextTitle: {
    color: "#fff",
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
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  textMonitorWrapper: { flexDirection: "row" },
  textMonitor: {
    color: "#fff",
    marginStart: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  textLogout: {
    color: "#fff",
    fontSize: 18,
  },
});

export default HomeScreen;
