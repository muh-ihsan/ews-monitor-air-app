import React, { useState } from "react";
import { Dimensions, Text, View, StatusBar } from "react-native";
import database from "@react-native-firebase/database";
import { Card } from "react-native-paper";

import GaugeComponent from "../ui/GaugeComponent";
import LoadingModalComponent from "../ui/LoadingModalComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";
import { ScrollView } from "react-native-gesture-handler";

const screenHeight = Dimensions.get("window").height;

function PressureSolarScreen({ route, navigation }) {
  const { monitorValue } = route.params;
  const dbPath = "ewsApp/pressure-solar";
  const [kebocoran, setKebocoran] = useState(false);
  const [dbObject, setDbObject] = useState({
    current: 0,
    pressureBar: 0,
    pressurePsi: 0,
    pressurePascal: 0,
    voltage: 0,
  });
  const [gaugeValue, setGaugeValue] = useState({
    pressureBar: {},
    pressurePsi: {},
    chargeThreshold: 0,
  });
  const [intializing, setInitializing] = useState(true);
  const [charging, setCharging] = useState(false);
  const [online, setOnline] = useState(false);
  const [lastOnline, setLastOnline] = useState("");

  // Untuk ambil value gauge
  React.useEffect(() => {
    database()
      .ref("ewsApp/gaugeValue/pressure-solar")
      .once("value", (snapshot) => {
        const fetchGauge = snapshot.val();
        setGaugeValue(fetchGauge);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Untuk cek status online
  React.useEffect(() => {
    const onlineListen = database()
      .ref(`ewsApp/others/lastUpdate/pressure-solar/${monitorValue}`)
      .on("value", (snapshot) => {
        if (snapshot.val() == null) {
          setOnline(false);
          setLastOnline("No data");
        } else {
          // Calculate time differerence
          const currentTime = new Date();
          const timeDb = new Date(snapshot.val());
          const diff = Math.abs(currentTime - timeDb);
          const minDiff = Math.floor(diff / 1000 / 60);

          if (minDiff <= 5) {
            setOnline(true);
          } else {
            setOnline(false);
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mei",
              "Jun",
              "Jul",
              "Ags",
              "Sep",
              "Okt",
              "Nov",
              "Des",
            ];
            const bulan = months[timeDb.getMonth()];
            const lastOnlineText = `${timeDb.getDate()} ${bulan}, ${timeDb.getHours()}:${String(
              timeDb.getMinutes()
            ).padStart(2, "0")}`;
            setLastOnline(lastOnlineText);
          }
        }
      });

    return () => {
      database()
        .ref(`ewsApp/others/lastUpdate/pressure-solar/${monitorValue}`)
        .off("value", onlineListen);
    };
  }, [dbObject]);

  // Untuk real-time data dari monitor
  React.useEffect(() => {
    const dbListen = database()
      .ref(`${dbPath}/${monitorValue}`)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setDbObject(data);
        setInitializing(false);
      });

    return () => {
      database().ref(`${dbPath}/${monitorValue}`).off("value", dbListen);
      setInitializing(true);
    };
  }, [monitorValue]);

  // Untuk deteksi charging
  React.useEffect(() => {
    if (Number(dbObject.current) >= gaugeValue.chargeThreshold) {
      setCharging(true);
    } else {
      setCharging(false);
    }
  }, [dbObject.current, gaugeValue.chargeThreshold]);

  React.useEffect(() => {
    database()
      .ref("ewsApp/warning/kebocoran")
      .on("value", (snapshot) => {
        setKebocoran(snapshot.val());
      });
  }, []);

  function viewKebocoran() {
    return (
      <View>
        <Text style={{ color: "#f43f5e", fontWeight: "bold" }}>
          Kemungkinan terjadi kebocoran.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        translucent={true}
      />
      <LoadingModalComponent show={intializing} navigation={navigation} />
      <View style={styles.titleMonitorWrapper}>
        <Text style={styles.titleMonitorText}>{dbObject.nama}</Text>
        <Text style={styles.detailMonitorText}>ID: {monitorValue}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={[
              styles.statusCircle,
              { backgroundColor: online ? "#04A777" : "#f43f5e" },
            ]}
          />
          <Text
            style={[
              styles.detailMonitorText,
              {
                marginLeft: 4,
                color: online ? "#04A777" : "#f43f5e",
                fontWeight: "bold",
              },
            ]}
          >
            {online ? "Online" : "Offline"}
          </Text>
          <Text style={[styles.detailMonitorText, { marginLeft: 4 }]}>
            {online ? null : `• Update terakhir: ${lastOnline}`}
          </Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: 16, height: screenHeight - 240 }}>
        <Card
          elevation={2}
          style={[
            styles.groupWrapper,
            kebocoran ? { height: 312 } : { height: 288 },
          ]}
        >
          <Card.Title title="Pressure" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              {/* {renderGaugePressure()} */}
              <GaugeComponent
                title="Pressure Bar"
                value={dbObject["pressureBar"]} // edit disini
                min={gaugeValue.pressureBar.min}
                max={gaugeValue.pressureBar.max}
                markStep={
                  (gaugeValue.pressureBar.max - gaugeValue.pressureBar.min) / 10
                }
                unit="bar"
              />
              <GaugeComponent
                title="Pressure Psi"
                value={dbObject["pressurePsi"]}
                min={gaugeValue.pressurePsi.min}
                max={gaugeValue.pressurePsi.max}
                markStep={
                  (gaugeValue.pressurePsi.max - gaugeValue.pressurePsi.min) / 10
                }
                unit="psi"
              />
              {kebocoran ? viewKebocoran() : null}
            </View>
          </Card.Content>
        </Card>
        <Card elevation={2} style={[styles.groupWrapper, { height: 250 }]}>
          <Card.Title title="Solar Panel" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Battery</Text>
                <Text style={styles.textItemValue}>{dbObject["voltage"]}%</Text>
              </View>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Charging Current</Text>
                <Text style={styles.textItemValue}>
                  {dbObject["current"]} A
                </Text>
              </View>
            </View>
            <View style={styles.itemGroupWrapper}>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Charging?</Text>
                <Text style={styles.textItemValue}>
                  {charging ? "YES" : "NO"}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

export default PressureSolarScreen;
