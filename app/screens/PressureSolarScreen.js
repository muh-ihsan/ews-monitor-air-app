import React, { useState } from "react";
import { Dimensions, Text, View, StatusBar } from "react-native";
import database from "@react-native-firebase/database";
import { Picker } from "@react-native-picker/picker";
import { Card } from "react-native-paper";

import GaugeComponent from "../ui/GaugeComponent";
import LoadingModalComponent from "../ui/LoadingModalComponent";
import styles from "../styles/stylesheet";
import colors from "../styles/colors";
import { ScrollView } from "react-native-gesture-handler";

const Item = Picker.Item;
const screenHeight = Dimensions.get("window").height;

function PressureSolarScreen({ route }) {
  const { monitorValue } = route.params;
  const dbPath = "ewsApp/pressure-solar";
  const [dbObject, setDbObject] = useState({
    current: 0,
    pressureBar: 0,
    pressurePsi: 0,
    voltage: 0,
  });
  const [gaugeValue, setGaugeValue] = useState({
    pressureBar: {},
    pressurePsi: {},
  });
  const [listValue, setListValue] = useState(monitorValue);
  const [listPanel, setListPanel] = useState([]);
  const [intializing, setInitializing] = useState(true);
  const [charging, setCharging] = useState(false);

  // Untuk ambil berapa banyak monitor pressure
  React.useEffect(() => {
    const listPanelTemp = [];
    database()
      .ref(dbPath)
      .once("value", (snapshot) => {
        const fetchData = snapshot.val();
        console.log("Pressure Solar Object:\n", fetchData);
        for (const panel in fetchData) {
          console.log(panel.toString());
          listPanelTemp.push({
            label: fetchData[panel].nama,
            value: panel.toString(),
          });
        }
        console.log("List Panel Pressure: ", listPanelTemp);
        setListPanel(listPanelTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Mengambil value monitor dari route
  React.useEffect(() => {
    setListValue(monitorValue);
  }, [monitorValue]);

  // Untuk merender list dari banyak monitor
  const renderMonitorList = () => {
    console.log("Render List dipanggil");
    console.log("Monitor terpilih pada render monitor: ", listValue);
    return listPanel.map((index) => {
      return <Item key={index} label={index.label} value={index.value} />;
    });
  };

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

  // Untuk real-time data dari monitor
  React.useEffect(() => {
    const dbListen = database()
      .ref(`${dbPath}/${listValue}`)
      .on("value", (snapshot) => {
        console.log("Monitor terpilih pada useEffect: ", listValue);
        let data = snapshot.val();
        setDbObject(data);
        if (data.current > 0) {
          setCharging(true);
        } else {
          setCharging(false);
        }
        setInitializing(false);
      });

    return () => {
      database().ref(`${dbPath}/${listValue}`).off("value", dbListen);
      setInitializing(true);
    };
  }, [listValue]);

  console.log("Monitor terpilih di luar fungsi: " + listValue);

  // const renderGaugePressure = () => {
  //   return listPressure.map((element, i) => {
  //     return (
  //       <GaugeComponent
  //         key={i}
  //         title={element.nama}
  //         value={element.value}
  //         min={0}
  //         max={80}
  //         markStep={5}
  //         unit="psi"
  //       />
  //     );
  //   });
  // };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        translucent={true}
      />
      <LoadingModalComponent show={intializing} />
      <View style={styles.pickerBorder}>
        <Picker
          dropdownIconColor="white"
          dropdownIconRippleColor="#313C78"
          style={styles.picker}
          selectedValue={listValue}
          onValueChange={(v) => setListValue(v)}
        >
          {renderMonitorList()}
        </Picker>
      </View>
      <ScrollView style={{ marginTop: 24, height: screenHeight - 240 }}>
        <Card
          mode="outlined"
          elevation={3}
          style={[styles.groupWrapper, { height: 288 }]}
        >
          <Card.Title title="Pressure" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              {/* {renderGaugePressure()} */}
              <GaugeComponent
                title="Pressure Bar"
                value={dbObject["pressureBar"]}
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
            </View>
          </Card.Content>
        </Card>
        <Card
          mode="outlined"
          elevation={3}
          style={[styles.groupWrapper, { height: 250 }]}
        >
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
                  {dbObject["current"]} mA
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
