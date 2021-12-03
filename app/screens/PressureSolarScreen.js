import React, { useState } from "react";
import { Text, View, StatusBar } from "react-native";
import database from "@react-native-firebase/database";

import GaugeComponent from "../ui/GaugeComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const dbRef = database().ref("ewsApp/pressure-solar");

function PressureSolarScreen() {
  const [dbObject, setDbObject] = useState({});

  React.useEffect(() => {
    dbRef.on("value", (snapshot) => {
      let data = snapshot.val();
      setDbObject(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      {/* <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Pressure & Solar Panel</Text>
      </View> */}
      <View style={[styles.groupWrapper, { marginTop: 24, height: 260 }]}>
        <View>
          <Text style={styles.textGroupTitle}>Pressure</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <GaugeComponent
            title="Pressure"
            value={dbObject.pressure}
            min={100}
            max={300}
            markStep={20}
            unit="psi"
          />
        </View>
      </View>
      <View style={[styles.groupWrapper, { height: 220 }]}>
        <View>
          <Text style={styles.textGroupTitle}>Solar Panel</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Battery</Text>
            <Text style={styles.textItemValue}>{dbObject.battery}%</Text>
          </View>
          <View>
            <Text style={styles.textItemTitle}>Charging Current</Text>
            <Text style={styles.textItemValue}>
              {dbObject.chargingCurrent} A
            </Text>
          </View>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Light Received</Text>
            <Text style={styles.textItemValue}>{dbObject.light} lux</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PressureSolarScreen;
