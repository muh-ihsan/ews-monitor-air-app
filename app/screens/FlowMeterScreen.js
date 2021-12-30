import React, { useState } from "react";
import { View, ScrollView, Dimensions, StatusBar, Text } from "react-native";
import database from "@react-native-firebase/database";
import { Card } from "react-native-paper";

import GaugeComponent from "../ui/GaugeComponent";
import LoadingModalComponent from "../ui/LoadingModalComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const screenHeight = Dimensions.get("window").height;

function FlowMeterScreen({ route }) {
  const { monitorValue } = route.params;
  const dbPath = "ewsApp/flow-meter";
  const [dbObject, setDbObject] = useState({
    energyFlow: 0,
    flowRate: 0,
    fluidSoundSpeed: 0,
    tempInlet: 0,
    tempOutlet: 0,
    negativeAcc: 0,
    positiveAcc: 0,
    velocity: 0,
  });
  const [gaugeValue, setGaugeValue] = useState({
    energyFlowRate: {},
    flowRate: {},
    fluidSound: {},
    temperature: {},
    velocity: {},
  });
  const [intializing, setInitializing] = useState(true);

  // Untuk ambil value gauge
  React.useEffect(() => {
    database()
      .ref("ewsApp/gaugeValue/flow-meter")
      .once("value", (snapshot) => {
        const fetchGauge = snapshot.val();
        setGaugeValue(fetchGauge);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        translucent={true}
      />
      <LoadingModalComponent show={intializing} />
      <View style={styles.titleMonitorWrapper}>
        <Text style={styles.titleMonitorText}>{dbObject.nama}</Text>
      </View>
      <ScrollView style={{ marginTop: 24, height: screenHeight - 240 }}>
        <Card
          mode="outlined"
          elevation={3}
          style={[styles.groupWrapper, { height: 520 }]}
        >
          <Card.Title title="Flow Rate" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <GaugeComponent
                title="Flow Rate"
                value={dbObject["flowRate"]}
                min={gaugeValue.flowRate.min}
                max={gaugeValue.flowRate.max}
                markStep={
                  (gaugeValue.flowRate.max - gaugeValue.flowRate.min) / 10
                }
                unit="m3/h"
              />
              <GaugeComponent
                title="Energy Flow Rate"
                value={dbObject["energyFlow"]}
                min={gaugeValue.energyFlowRate.min}
                max={gaugeValue.energyFlowRate.max}
                markStep={
                  (gaugeValue.energyFlowRate.max -
                    gaugeValue.energyFlowRate.min) /
                  10
                }
                unit="GJ/h"
              />
              <GaugeComponent
                title="Velocity"
                value={dbObject["velocity"]}
                min={gaugeValue.velocity.min}
                max={gaugeValue.velocity.max}
                markStep={
                  (gaugeValue.velocity.max - gaugeValue.velocity.min) / 10
                }
                unit="m/s"
              />
              <GaugeComponent
                title="Fluid Sound Speed"
                value={dbObject["fluidSoundSpeed"]}
                min={gaugeValue.fluidSound.min}
                max={gaugeValue.fluidSound.max}
                markStep={
                  (gaugeValue.fluidSound.max - gaugeValue.fluidSound.min) / 10
                }
                unit="m/s"
              />
            </View>
          </Card.Content>
        </Card>
        <Card
          mode="outlined"
          elevation={3}
          style={[styles.groupWrapper, { height: 288 }]}
        >
          <Card.Title title="Temperature" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <GaugeComponent
                title="Temperature Inlet"
                value={dbObject["tempInlet"]}
                min={gaugeValue.temperature.min}
                max={gaugeValue.temperature.max}
                markStep={
                  (gaugeValue.temperature.max - gaugeValue.temperature.min) / 10
                }
                unit="°C"
              />
              <GaugeComponent
                title="Temperature Outlet"
                value={dbObject["tempOutlet"]}
                min={gaugeValue.temperature.min}
                max={gaugeValue.temperature.max}
                markStep={
                  (gaugeValue.temperature.max - gaugeValue.temperature.min) / 10
                }
                unit="°C"
              />
            </View>
          </Card.Content>
        </Card>
        <Card
          mode="outlined"
          elevation={3}
          style={[styles.groupWrapper, { height: 148 }]}
        >
          <Card.Title title="Accumulator" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Positive Accumulator</Text>
                <Text style={styles.textItemValue}>
                  {dbObject["positiveAcc"]}
                </Text>
              </View>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Negative Accumulator</Text>
                <Text style={styles.textItemValue}>
                  {dbObject["negativeAcc"]}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

export default FlowMeterScreen;
