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

import GaugeComponent from "../ui/GaugeComponent";
import LedStatusComponent from "../ui/ledStatusComponent";

import database from "@react-native-firebase/database";

const screenHeight = Dimensions.get("window").height;

function PanelPompaScreen() {
  const dbRef = database().ref("geolocations/asdasd/panel-pompa/panel1");
  const [dbObject, setDbObject] = useState([]);

  React.useEffect(() => {
    dbRef.on("value", (snapshot) => {
      let data = snapshot.val();
      setDbObject(data);
    });
  }, []);

  console.log("database return: ", dbObject);

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Panel Pompa</Text>
      </View>
      <ScrollView style={{ height: screenHeight - 240 }}>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 480 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Tegangan</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Volt R"
              value={dbObject.volt_r}
              min={100}
              max={300}
              markStep={20}
              unit="V"
            />
            <GaugeComponent
              title="Volt S"
              value={dbObject.volt_s}
              min={100}
              max={300}
              markStep={20}
              unit="V"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Volt T"
              value={dbObject.volt_t}
              min={100}
              max={300}
              markStep={20}
              unit="V"
            />
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#ff7f50", height: 480 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Arus Listrik</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Current R"
              value={dbObject.current_r}
              min={0}
              max={5000}
              markStep={500}
              unit="mA"
            />
            <GaugeComponent
              title="Current S"
              value={dbObject.current_s}
              min={0}
              max={5000}
              markStep={500}
              unit="mA"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Current T"
              value={dbObject.current_t}
              min={0}
              max={5000}
              markStep={500}
              unit="mA"
            />
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 110 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Power</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Power Factor</Text>
              <Text style={styles.textItemValue}>
                {dbObject.power_factor * 100}%
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
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#ff7f50", height: 200 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>LED States</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <LedStatusComponent
              name={dbObject.led_1.nama}
              value={dbObject.led_1.value}
            />
            <LedStatusComponent
              name={dbObject.led_2.nama}
              value={dbObject.led_2.value}
            />
            <LedStatusComponent
              name={dbObject.led_3.nama}
              value={dbObject.led_3.value}
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>LED 4</Text>
              <Text style={styles.textItemValue}>OFF</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>LED 5</Text>
              <Text style={styles.textItemValue}>ON</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>LED 6</Text>
              <Text style={styles.textItemValue}>OFF</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 100 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Button Relays</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <Button title="Relay 1" color="#ff7f50" />
            <Button title="Relay 2" color="#ff7f50" />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    justifyContent: "space-between",
    fontFamily: "Roboto",
    backgroundColor: "#FFF",
  },
  itemGroupWrapper: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textGroupTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
    marginStart: 8,
  },
  groupWrapper: {
    marginBottom: 12,
  },
  textItemValue: {
    fontSize: 28,
    textAlign: "center",
  },
  titleWrapper: {
    marginBottom: 24,
  },
  textItemTitle: {
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  textTitle: {
    color: "black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default PanelPompaScreen;
