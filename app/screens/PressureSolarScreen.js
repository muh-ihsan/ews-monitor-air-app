import React, { useState } from "react";
import { Text, View, StatusBar } from "react-native";
import database from "@react-native-firebase/database";
import { Picker } from "@react-native-picker/picker";

import GaugeComponent from "../ui/GaugeComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const Item = Picker.Item;

function PressureSolarScreen() {
  const dbPath = "ewsApp/pressure-solar/";
  const [dbObject, setDbObject] = useState({});
  const [listValue, setListValue] = useState("pressureSolar1");
  console.log(dbPath + listValue);
  var listPanel = [];

  // React.useEffect(() => {
  //   database()
  //     .ref("ewsApp/pressure-solar")
  //     .once("value", (snapshot) => {
  //       const fetchData = snapshot.val();
  //       console.log("Pressure Solar Object:\n", fetchData);
  //       for (const panel in fetchData) {
  //         listPanel.push({
  //           label: fetchData[panel].nama,
  //           value: panel.toString(),
  //         });
  //         console.log("Successfully add list");
  //         console.log("List: ", listPanel);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const renderMonitorList = () => {
  //   return listPanel.map((index) => {
  //     console.log("Label: ", index.label);
  //     return <Item label={index.label} value={index.value} />;
  //   });
  // };

  React.useEffect(() => {
    database()
      .ref(dbPath + listValue)
      .on("value", (snapshot) => {
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
      <Picker
        style={styles.picker}
        selectedValue={listValue}
        onValueChange={(v) => setListValue(v)}
      >
        <Item label={"Pressure 1"} value={"pressureSolar1"} />
        <Item label={"Pressure 2"} value={"pressureSolar2"} />
        {/* {renderMonitorList()} */}
      </Picker>
      <View style={[styles.groupWrapper, { marginTop: 24, height: 260 }]}>
        <View>
          <Text style={styles.textGroupTitle}>Pressure</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <GaugeComponent
            title="Pressure"
            value={dbObject.pressure}
            min={0}
            max={80}
            markStep={5}
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
