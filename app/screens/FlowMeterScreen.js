import React, { useState } from "react";
import { View, ScrollView, Dimensions, StatusBar, Text } from "react-native";
import database from "@react-native-firebase/database";

import GaugeComponent from "../ui/GaugeComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const screenHeight = Dimensions.get("window").height;
const dbRef = database().ref("ewsApp/flow-meter");

function FlowMeterScreen() {
  const [dbObject, setDbObject] = useState({});

  React.useEffect(() => {
    dbRef.on("value", (snapshot) => {
      let data = snapshot.val();
      setDbObject(data);
    });
  }, []);

  console.log("db panel pompa: ", dbObject);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Flow Meter</Text>
      </View>
      <ScrollView style={{ height: screenHeight - 240 }}>
        <View style={[styles.groupWrapper, { height: 480 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Flow Rate</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Flow Rate"
              value={dbObject.flowRate}
              min={100}
              max={300}
              markStep={20}
              unit="m3/h"
            />
            <GaugeComponent
              title="Energy Flow Rate"
              value={dbObject.energyFlow}
              min={100}
              max={300}
              markStep={20}
              unit="GJ/h"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Velocity"
              value={dbObject.velocity}
              min={100}
              max={300}
              markStep={20}
              unit="m/s"
            />
            <GaugeComponent
              title="Fluid Sound Speed"
              value={dbObject.fluidSoundSpeed}
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
              value={dbObject.tempInlet}
              min={100}
              max={300}
              markStep={20}
              unit="°C"
            />
            <GaugeComponent
              title="Temperature Outlet"
              value={dbObject.tempOutlet}
              min={100}
              max={300}
              markStep={20}
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
              <Text style={styles.textItemValue}>{dbObject.positiveAcc}</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Negative Accumulator</Text>
              <Text style={styles.textItemValue}>{dbObject.negativeAcc}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default FlowMeterScreen;
