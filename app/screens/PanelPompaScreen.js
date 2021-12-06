import React, { useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import database from "@react-native-firebase/database";
import { Picker } from "@react-native-picker/picker";

import GaugeComponent from "../ui/GaugeComponent";
import LedStatusComponent from "../ui/LedStatusComponent";

import styles from "../styles/stylesheet";
import colors from "../styles/colors";

const screenHeight = Dimensions.get("window").height;
const Item = Picker.Item;

function PanelPompaScreen() {
  const dbPath = "ewsApp/panel-pompa/";
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
  const [relay1, setRelay1] = useState(false);
  const [relay2, setRelay2] = useState(false);
  const [listPanel, setListPanel] = useState("panelPompa1");

  React.useEffect(() => {
    database()
      .ref(dbPath + listPanel)
      .on("value", (snapshot) => {
        let data = snapshot.val();
        let relay1Convert = false;
        let relay2Convert = false;
        setDbObject(data);

        if (data.relay1.trigger === 1) {
          relay1Convert = true;
        } else {
          relay1Convert = false;
        }
        if (data.relay2.trigger === 1) {
          relay2Convert = true;
        } else {
          relay2Convert = false;
        }
        setRelay1(relay1Convert);
        setRelay2(relay2Convert);
        // setRelay1(data.relay1.trigger);
        // setRelay2(data.relay2.trigger);
      });
  }, []);

  console.log("db panel pompa: ", dbObject);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      {/* <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Panel Pompa</Text>
      </View> */}
      <Picker
        style={styles.picker}
        selectedValue={listPanel}
        onValueChange={(v) => setListPanel(v)}
      >
        <Item label={"Panel 1"} value={"panelPompa1"} />
        <Item label={"Panel 2"} value={"panelPompa2"} />
      </Picker>
      <ScrollView style={{ marginTop: 24, height: screenHeight - 240 }}>
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
        <View style={[styles.groupWrapper, { height: 110 }]}>
          <View>
            <Text style={styles.textGroupTitle}>Button Relays</Text>
          </View>
          {/* <View>
            <Text style={styles.textCheckmark}>Enable Relay Button?</Text>
          </View> */}
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>{dbObject.relay1.nama}</Text>
              <Switch
                onValueChange={() => {
                  const value = !relay1;
                  const valueInt = value ? 1 : 0;
                  setRelay1(value);
                  database()
                    .ref("ewsApp/panel-pompa/panelPompa1/relay1")
                    .update({ trigger: valueInt })
                    .then(() => console.log("Relay 1 triggered"))
                    .catch((err) => {
                      console.log("Error: ", err);
                    });
                }}
                value={relay1}
                thumbColor={relay1 ? colors.secondary : "white"}
              />
            </View>
            <View>
              <Text style={styles.textItemTitle}>{dbObject.relay2.nama}</Text>
              <Switch
                onValueChange={() => {
                  const value = !relay2;
                  const valueInt = value ? 1 : 0;
                  setRelay2(value);
                  database()
                    .ref("ewsApp/panel-pompa/panelPompa1/relay2")
                    .update({ trigger: valueInt })
                    .then(() => console.log("Relay 2 triggered"))
                    .catch((err) => {
                      console.log("Error: ", err);
                    });
                }}
                value={relay2}
                thumbColor={relay2 ? colors.secondary : "white"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const localstyles = StyleSheet.create({
  itemGroupWrapper: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textCheckmark: {
    color: "white",
    alignSelf: "flex-start",
    marginTop: 8,
    marginStart: 8,
  },
});

export default PanelPompaScreen;
