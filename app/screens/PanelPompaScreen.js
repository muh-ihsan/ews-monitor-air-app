import React, { useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import database from "@react-native-firebase/database";

import GaugeComponent from "../ui/GaugeComponent";
import LedStatusComponent from "../ui/LedStatusComponent";

import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const screenHeight = Dimensions.get("window").height;
const dbRef = database().ref("ewsApp/panel-pompa");

function PanelPompaScreen() {
  const [dbObject, setDbObject] = useState({
    led1: {},
    led2: {},
    led3: {},
    led4: {},
    led5: {},
    led6: {},
    relay1: { nama: "" },
    relay2: { nama: "" },
  });

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
        <Text style={styles.textTitle}>Panel Pompa</Text>
      </View>
      <ScrollView style={{ height: screenHeight - 240 }}>
        <View style={[styles.groupWrapper, { height: 480 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Tegangan</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Volt R"
              value={dbObject.voltR}
              min={100}
              max={300}
              markStep={20}
              unit="V"
            />
            <GaugeComponent
              title="Volt S"
              value={dbObject.voltS}
              min={100}
              max={300}
              markStep={20}
              unit="V"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Volt T"
              value={dbObject.voltT}
              min={100}
              max={300}
              markStep={20}
              unit="V"
            />
          </View>
        </View>
        <View style={[styles.groupWrapper, { height: 480 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Arus Listrik</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Current R"
              value={dbObject.currentR}
              min={0}
              max={5000}
              markStep={500}
              unit="mA"
            />
            <GaugeComponent
              title="Current S"
              value={dbObject.currentS}
              min={0}
              max={5000}
              markStep={500}
              unit="mA"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Current T"
              value={dbObject.currentT}
              min={0}
              max={5000}
              markStep={500}
              unit="mA"
            />
          </View>
        </View>
        <View style={[styles.groupWrapper, { height: 120 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Power</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Power Factor</Text>
              <Text style={styles.textItemValue}>
                {dbObject.powerFactor * 100}%
              </Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Frequency</Text>
              <Text style={styles.textItemValue}>{dbObject.frequency} Hz</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Power</Text>
              <Text style={styles.textItemValue}>{dbObject.power} W</Text>
            </View>
          </View>
        </View>
        <View style={[styles.groupWrapper, { height: 210 }]}>
          <View>
            <Text style={styles.textGroupTitle}>LED States</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <LedStatusComponent
              name={dbObject.led1.nama}
              value={dbObject.led1.value}
            />
            <LedStatusComponent
              name={dbObject.led2.nama}
              value={dbObject.led2.value}
            />
            <LedStatusComponent
              name={dbObject.led3.nama}
              value={dbObject.led3.value}
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <LedStatusComponent
              name={dbObject.led4.nama}
              value={dbObject.led4.value}
            />
            <LedStatusComponent
              name={dbObject.led5.nama}
              value={dbObject.led5.value}
            />
            <LedStatusComponent
              name={dbObject.led6.nama}
              value={dbObject.led6.value}
            />
          </View>
        </View>
        <View style={[styles.groupWrapper, { height: 100 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Button Relays</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <Button
              title={dbObject.relay1.nama}
              color={colors.secondary}
              onPress={() => {
                database()
                  .ref("ewsApp/panel-pompa/relay1")
                  .update({ trigger: true })
                  .then(() => console.log("relay 1 triggered"));
              }}
            />
            <Button
              title={dbObject.relay2.nama}
              color={colors.secondary}
              onPress={() => {
                database()
                  .ref("ewsApp/panel-pompa/relay2")
                  .update({ trigger: true })
                  .then(() => console.log("relay 2 triggered"));
              }}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

// const setTrigger = (relay) => {
//   const relayRef = "ewsApp/panel-pompa/" + relay;
//   database()
//     .ref(relayRef)
//     .update({ trigger: true })
//     .then(() => console.log(relay + " triggered"));
// };

export default PanelPompaScreen;
