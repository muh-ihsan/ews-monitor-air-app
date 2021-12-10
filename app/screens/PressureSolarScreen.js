import React, { useState } from "react";
import { Dimensions, Text, View, StatusBar } from "react-native";
import database from "@react-native-firebase/database";
import { Picker } from "@react-native-picker/picker";

import GaugeComponent from "../ui/GaugeComponent";
import LoadingModalComponent from "../ui/LoadingModalComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";
import { ScrollView } from "react-native-gesture-handler";

const Item = Picker.Item;
const screenHeight = Dimensions.get("window").height;

function PressureSolarScreen() {
  const dbPath = "ewsApp/pressure-solar/";
  const [dbObject, setDbObject] = useState({
    pressureSolar1: { pressure: {} },
  });
  const [listValue, setListValue] = useState("pressureSolar1");
  const [listPanel, setListPanel] = useState([]);
  const [listPressure, setListPressure] = useState([]);
  const [pressureHeight, setPressureHeight] = useState(260);
  const [intializing, setInitializing] = useState(true);

  React.useEffect(() => {
    const listPanelTemp = [];
    database()
      .ref(dbPath)
      .once("value", (snapshot) => {
        const fetchData = snapshot.val();
        console.log("Pressure Solar Object:\n", fetchData);
        for (const panel in fetchData) {
          listPanelTemp.push({
            label: fetchData[panel].nama,
            value: panel.toString(),
          });
          console.log("Successfully add list");
          console.log("List: ", listPanel);
        }
        setListPanel(listPanelTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderMonitorList = () => {
    console.log("Render List dipanggil");
    console.log("List: ", listPanel);
    return listPanel.map((index) => {
      console.log("Label: ", index.label);
      return <Item key={index} label={index.label} value={index.value} />;
    });
  };

  React.useEffect(() => {
    const dbListen = database()
      .ref(dbPath + listValue)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        setDbObject(data);

        const listPressureTemp = [];
        for (const pressure in data["pressure"]) {
          listPressureTemp.push({
            index: pressure,
            nama: "Sensor " + pressure.toString(),
            value: data["pressure"][pressure],
          });
        }
        console.log(listPressureTemp);
        const CalcPressureHeight =
          Math.ceil(listPressureTemp.length / 2) * 200 + 60;
        setPressureHeight(CalcPressureHeight);
        setListPressure(listPressureTemp);
        setInitializing(false);
      });

    return () => {
      database().ref(dbPath).off("value", dbListen);
      setInitializing(true);
    };
  }, [listValue]);

  console.log("db pressure solar: ", dbObject);

  const renderGaugePressure = () => {
    return listPressure.map((element, i) => {
      return (
        <GaugeComponent
          key={i}
          title={element.nama}
          value={element.value}
          min={0}
          max={80}
          markStep={5}
          unit="psi"
        />
      );
    });
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <LoadingModalComponent show={intializing} />
      <Picker
        style={styles.picker}
        selectedValue={listValue}
        onValueChange={(v) => setListValue(v)}
      >
        {/* <Item label={"Pressure 1"} value={"pressureSolar1"} />
        <Item label={"Pressure 2"} value={"pressureSolar2"} /> */}
        {renderMonitorList()}
      </Picker>
      <ScrollView style={{ marginTop: 24, height: screenHeight - 240 }}>
        <View style={[styles.groupWrapper, { height: pressureHeight }]}>
          <View>
            <Text style={styles.textGroupTitle}>Pressure</Text>
          </View>
          <View
            style={[
              styles.itemGroupWrapper,
              { flexWrap: "wrap", alignContent: "space-around" },
            ]}
          >
            {renderGaugePressure()}
            {/* <GaugeComponent
            title="Pressure"
            value={dbObject[listValue]["pressure"]["0"]}
            min={0}
            max={80}
            markStep={5}
            unit="psi" */}
          </View>
        </View>
        <View style={[styles.groupWrapper, { height: 220 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Solar Panel</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Battery</Text>
              <Text style={styles.textItemValue}>{dbObject["battery"]}%</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Charging Current</Text>
              <Text style={styles.textItemValue}>
                {dbObject["chargingCurrent"]} A
              </Text>
            </View>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Light Received</Text>
              <Text style={styles.textItemValue}>{dbObject["light"]} lux</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default PressureSolarScreen;
