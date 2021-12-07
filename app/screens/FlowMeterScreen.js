import React, { useState } from "react";
import { View, ScrollView, Dimensions, StatusBar, Text } from "react-native";
import database from "@react-native-firebase/database";
import { Picker } from "@react-native-picker/picker";

import GaugeComponent from "../ui/GaugeComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const screenHeight = Dimensions.get("window").height;
const Item = Picker.Item;

function FlowMeterScreen() {
  const dbPath = "ewsApp/flow-meter/";
  const [dbObject, setDbObject] = useState({ flowMeter1: {} });
  const [listFlow, setListFlow] = useState("flowMeter1");

  // database()
  //   .ref("ewsApp/flow-meter")
  //   .once("value", (snapshot) => {
  //     const fetchData = snapshot.val();
  //     console.log("FLow Meter Object:\n", fetchData);
  //     for (const panel in fetchData) {
  //       console.log(`${panel}: ${fetchData[panel].nama}`);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  React.useEffect(() => {
    const dbListen = database()
      .ref(dbPath)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setDbObject(data);
      });

    return () => database().ref(dbPath).off("value", dbListen);
  }, []);

  console.log("db flow meter: ", dbObject);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      {/* <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Flow Meter</Text>
      </View> */}
      <Picker
        style={styles.picker}
        selectedValue={listFlow}
        onValueChange={(v) => setListFlow(v)}
      >
        <Item label={"Flow Meter 1"} value={"flowMeter1"} />
        <Item label={"Flow Meter 2"} value={"flowMeter2"} />
      </Picker>
      <ScrollView style={{ marginTop: 24, height: screenHeight - 240 }}>
        <View style={[styles.groupWrapper, { height: 480 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Flow Rate</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Flow Rate"
              value={dbObject[listFlow]["flowRate"]}
              min={100}
              max={300}
              markStep={20}
              unit="m3/h"
            />
            <GaugeComponent
              title="Energy Flow Rate"
              value={dbObject[listFlow]["energyFlow"]}
              min={100}
              max={300}
              markStep={20}
              unit="GJ/h"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Velocity"
              value={dbObject[listFlow]["velocity"]}
              min={1}
              max={5}
              markStep={0.6}
              unit="m/s"
            />
            <GaugeComponent
              title="Fluid Sound Speed"
              value={dbObject[listFlow]["fluidSoundSpeed"]}
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
              value={dbObject[listFlow]["tempInlet"]}
              min={5}
              max={40}
              markStep={3}
              unit="°C"
            />
            <GaugeComponent
              title="Temperature Outlet"
              value={dbObject[listFlow]["tempOutlet"]}
              min={5}
              max={40}
              markStep={3}
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
                {dbObject[listFlow]["positiveAcc"]}
              </Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Negative Accumulator</Text>
              <Text style={styles.textItemValue}>
                {dbObject[listFlow]["negativeAcc"]}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default FlowMeterScreen;
