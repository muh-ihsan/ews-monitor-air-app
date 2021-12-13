import React, { useState } from "react";
import { View, ScrollView, Dimensions, StatusBar, Text } from "react-native";
import database from "@react-native-firebase/database";
import { Picker } from "@react-native-picker/picker";

import GaugeComponent from "../ui/GaugeComponent";
import LoadingModalComponent from "../ui/LoadingModalComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const screenHeight = Dimensions.get("window").height;
const Item = Picker.Item;

function FlowMeterScreen() {
  const dbPath = "ewsApp/flow-meter/";
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
  const [listFlow, setListFlow] = useState("flowMeter1");
  const [listMonitor, setListMonitor] = useState([]);
  const [intializing, setInitializing] = useState(true);

  React.useEffect(() => {
    const listPanelTemp = [];
    database()
      .ref(dbPath)
      .once("value", (snapshot) => {
        const fetchData = snapshot.val();
        console.log("FLow Meter Object:\n", fetchData);
        for (const panel in fetchData) {
          listPanelTemp.push({
            label: fetchData[panel].nama,
            value: panel.toString(),
          });
        }
        console.log("List Panel Flow: ", listPanelTemp);
        setListMonitor(listPanelTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderMonitorList = () => {
    console.log("Render List dipanggil");
    console.log("List: ", listMonitor);
    return listMonitor.map((index) => {
      console.log("Label: ", index.label);
      console.log("Value: ", index.value);
      return <Item key={index} label={index.label} value={index.value} />;
    });
  };

  React.useEffect(() => {
    const dbListen = database()
      .ref(dbPath + listFlow)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setDbObject(data);
        setInitializing(false);
      });

    return () => {
      database().ref(dbPath).off("value", dbListen);
      setInitializing(true);
    };
  }, [listFlow]);

  console.log("db flow meter: ", dbObject);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <LoadingModalComponent show={intializing} />
      <Picker
        style={styles.picker}
        selectedValue={listFlow}
        onValueChange={(v) => setListFlow(v)}
      >
        {/* <Item label={"Flow Meter 1"} value={"flowMeter1"} />
        <Item label={"Flow Meter 2"} value={"flowMeter2"} /> */}
        {renderMonitorList()}
      </Picker>
      <ScrollView style={{ marginTop: 24, height: screenHeight - 240 }}>
        <View style={[styles.groupWrapper, { height: 480 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Flow Rate</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Flow Rate"
              value={dbObject["flowRate"].toPrecision(5)}
              min={100}
              max={300}
              markStep={20}
              unit="m3/h"
            />
            <GaugeComponent
              title="Energy Flow Rate"
              value={dbObject["energyFlow"].toPrecision(5)}
              min={100}
              max={300}
              markStep={20}
              unit="GJ/h"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Velocity"
              value={dbObject["velocity"].toPrecision(5)}
              min={1}
              max={5}
              markStep={0.6}
              unit="m/s"
            />
            <GaugeComponent
              title="Fluid Sound Speed"
              value={dbObject["fluidSoundSpeed"]}
              min={100}
              max={300}
              markStep={20}
              unit="m/s"
            />
          </View>
        </View>
        <View style={[styles.groupWrapper, { height: 260 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Temperature</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Temperature Inlet"
              value={dbObject["tempInlet"].toPrecision(5)}
              min={5}
              max={75}
              markStep={5}
              unit="°C"
            />
            <GaugeComponent
              title="Temperature Outlet"
              value={dbObject["tempOutlet"].toPrecision(5)}
              min={5}
              max={75}
              markStep={5}
              unit="°C"
            />
          </View>
        </View>
        <View style={[styles.groupWrapper, { height: 120 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Accumulator</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Positive Accumulator</Text>
              <Text style={styles.textItemValue}>
                {dbObject["positiveAcc"]}
              </Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Negative Accumulator</Text>
              <Text style={styles.textItemValue}>
                {dbObject["negativeAcc"]}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default FlowMeterScreen;
