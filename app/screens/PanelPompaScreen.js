import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  View,
} from "react-native";
import database from "@react-native-firebase/database";
import { Card } from "react-native-paper";

import GaugeComponent from "../ui/GaugeComponent";
import LedStatusComponent from "../ui/LedStatusComponent";
import LoadingModalComponent from "../ui/LoadingModalComponent";

import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const screenHeight = Dimensions.get("window").height;

function PanelPompaScreen({ route, navigation }) {
  const { monitorValue } = route.params;
  const dbPath = "ewsApp/panel-pompa";
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
  const [gaugeValue, setGaugeValue] = useState({
    currentR: {},
    currentS: {},
    currentT: {},
    voltR: {},
    voltS: {},
    voltT: {},
  });
  const [relay1, setRelay1] = useState(false);
  const [relay2, setRelay2] = useState(false);
  const [intializing, setInitializing] = useState(true);

  // Untuk ambil value gauge
  React.useEffect(() => {
    database()
      .ref("ewsApp/gaugeValue/panel-pompa")
      .once("value", (snapshot) => {
        const fetchGauge = snapshot.val();
        setGaugeValue(fetchGauge);
        console.log("Gauge Panel Pompa: ", fetchGauge);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const dbListen = database()
      .ref(`${dbPath}/${monitorValue}`)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        let relay1Convert = false;
        let relay2Convert = false;
        setDbObject(data);

        if (data["relay1"]["trigger"] === 1) {
          relay1Convert = true;
        } else {
          relay1Convert = false;
        }
        if (data["relay2"]["trigger"] === 1) {
          relay2Convert = true;
        } else {
          relay2Convert = false;
        }
        setRelay1(relay1Convert);
        setRelay2(relay2Convert);
        // setRelay1(data.relay1.trigger);
        // setRelay2(data.relay2.trigger);
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
      <LoadingModalComponent show={intializing} navigation={navigation} />
      <View style={styles.titleMonitorWrapper}>
        <Text style={styles.titleMonitorText}>{dbObject.nama}</Text>
      </View>
      <ScrollView style={{ marginTop: 24, height: screenHeight - 240 }}>
        <Card elevation={2} style={[styles.groupWrapper, { height: 520 }]}>
          <Card.Title title="Tegangan" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <GaugeComponent
                title="Volt R"
                value={dbObject["voltR"]}
                min={gaugeValue.voltR.min}
                max={gaugeValue.voltR.max}
                markStep={(gaugeValue.voltR.max - gaugeValue.voltR.min) / 10}
                unit="V"
              />
              <GaugeComponent
                title="Volt S"
                value={dbObject["voltS"]}
                min={gaugeValue.voltS.min}
                max={gaugeValue.voltS.max}
                markStep={(gaugeValue.voltS.max - gaugeValue.voltS.min) / 10}
                unit="V"
              />
              <GaugeComponent
                title="Volt T"
                value={dbObject["voltT"]}
                min={gaugeValue.voltT.min}
                max={gaugeValue.voltT.max}
                markStep={(gaugeValue.voltT.max - gaugeValue.voltT.min) / 10}
                unit="V"
              />
            </View>
          </Card.Content>
        </Card>
        <Card elevation={2} style={[styles.groupWrapper, { height: 520 }]}>
          <Card.Title title="Arus Listrik" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <GaugeComponent
                title="Current R"
                value={dbObject["currentR"]}
                min={gaugeValue.currentR.min}
                max={gaugeValue.currentR.max}
                markStep={
                  (gaugeValue.currentR.max - gaugeValue.currentR.min) / 10
                }
                unit="mA"
              />
              <GaugeComponent
                title="Current S"
                value={dbObject["currentS"]}
                min={gaugeValue.currentS.min}
                max={gaugeValue.currentS.max}
                markStep={
                  (gaugeValue.currentS.max - gaugeValue.currentS.min) / 10
                }
                unit="mA"
              />
              <GaugeComponent
                title="Current T"
                value={dbObject["currentT"]}
                min={gaugeValue.currentT.min}
                max={gaugeValue.currentT.max}
                markStep={
                  (gaugeValue.currentT.max - gaugeValue.currentT.min) / 10
                }
                unit="mA"
              />
            </View>
          </Card.Content>
        </Card>
        <Card elevation={2} style={[styles.groupWrapper, { height: 160 }]}>
          <Card.Title title="Power" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Power Factor</Text>
                <Text style={styles.textItemValue}>
                  {dbObject["powerFactor"] * 100}%
                </Text>
              </View>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Frequency</Text>
                <Text style={styles.textItemValue}>
                  {dbObject["frequency"]} Hz
                </Text>
              </View>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>Power</Text>
                <Text style={styles.textItemValue}>{dbObject["power"]} W</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card elevation={2} style={[styles.groupWrapper, { height: 248 }]}>
          <Card.Title title="LED States" titleStyle={styles.textTitle} />
          <Card.Content>
            <View style={styles.itemGroupWrapper}>
              <LedStatusComponent
                name={dbObject["led1"]["nama"]}
                value={dbObject["led1"]["value"]}
              />
              <LedStatusComponent
                name={dbObject["led2"]["nama"]}
                value={dbObject["led2"]["value"]}
              />
              <LedStatusComponent
                name={dbObject["led3"]["nama"]}
                value={dbObject["led3"]["value"]}
              />
            </View>
            <View style={styles.itemGroupWrapper}>
              <LedStatusComponent
                name={dbObject["led4"]["nama"]}
                value={dbObject["led4"]["value"]}
              />
              <LedStatusComponent
                name={dbObject["led5"]["nama"]}
                value={dbObject["led5"]["value"]}
              />
              <LedStatusComponent
                name={dbObject["led6"]["nama"]}
                value={dbObject["led6"]["value"]}
              />
            </View>
          </Card.Content>
        </Card>
        <Card elevation={2} style={[styles.groupWrapper, { height: 132 }]}>
          <Card.Title title="Button Relays" titleStyle={styles.textTitle} />
          <Card.Content>
            <View
              style={[
                styles.itemGroupWrapper,
                { alignContent: "space-between" },
              ]}
            >
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>
                  {dbObject["relay1"]["nama"]}
                </Text>
                <Switch
                  onValueChange={() => {
                    const value = !relay1;
                    const valueInt = value ? 1 : 0;
                    setRelay1(value);
                    database()
                      .ref(`ewsApp/panel-pompa/${monitorValue}/relay1`)
                      .update({ trigger: valueInt })
                      .then(() => console.log("Relay 1 triggered"))
                      .catch((err) => {
                        console.log("Error: ", err);
                      });
                  }}
                  value={relay1}
                  thumbColor={relay1 ? colors.primary : "white"}
                />
              </View>
              <View style={styles.itemTextValueWrapper}>
                <Text style={styles.textItemTitle}>
                  {dbObject["relay2"]["nama"]}
                </Text>
                <Switch
                  onValueChange={() => {
                    const value = !relay2;
                    const valueInt = value ? 1 : 0;
                    setRelay2(value);
                    database()
                      .ref(`ewsApp/panel-pompa/${monitorValue}/relay2`)
                      .update({ trigger: valueInt })
                      .then(() => console.log("Relay 2 triggered"))
                      .catch((err) => {
                        console.log("Error: ", err);
                      });
                  }}
                  value={relay2}
                  thumbColor={relay2 ? colors.primary : "white"}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

export default PanelPompaScreen;
