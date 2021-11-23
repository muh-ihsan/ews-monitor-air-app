import React from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Speedometer from "../ui/gauge/gauge";

const screenHeight = Dimensions.get("window").height;

function PanelPompaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.locationTitleWrapper}>
        <Text style={styles.title}>Nama Panel</Text>
        <View style={styles.locationWrapper}>
          <Text style={styles.locationText}>Latitude: 25.90657</Text>
          <Text style={styles.locationText}>Longitude: 65.43001</Text>
        </View>
      </View>
      <ScrollView style={{ height: screenHeight - 240 }}>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 180 },
          ]}
        >
          <View>
            <Text style={styles.groupTitle}>Tegangan</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.itemTextTitle}>Volt R</Text>
              <Speedometer
                value={76}
                size={100}
                labelStyle={{
                  fontSize: 12,
                }}
                labelNoteStyle={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              />
            </View>
            <View>
              <Text style={styles.itemTextTitle}>Volt S</Text>
              <Speedometer
                value={12}
                size={100}
                labelStyle={{
                  fontSize: 12,
                }}
                labelNoteStyle={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              />
            </View>
            <View>
              <Text style={styles.itemTextTitle}>Volt T</Text>
              <Speedometer
                value={12}
                size={100}
                labelStyle={{
                  fontSize: 12,
                }}
                labelNoteStyle={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#ff7f50", height: 180 },
          ]}
        >
          <View>
            <Text style={styles.groupTitle}>Arus Listrik</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.itemTextTitle}>Current R</Text>
              <Speedometer
                value={12}
                size={100}
                labelStyle={{
                  fontSize: 12,
                }}
                labelNoteStyle={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              />
            </View>
            <View>
              <Text style={styles.itemTextTitle}>Current S</Text>
              <Speedometer
                value={12}
                size={100}
                labelStyle={{
                  fontSize: 12,
                }}
                labelNoteStyle={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              />
            </View>
            <View>
              <Text style={styles.itemTextTitle}>Current T</Text>
              <Speedometer
                value={12}
                size={100}
                labelStyle={{
                  fontSize: 12,
                }}
                labelNoteStyle={{
                  fontSize: 12,
                  textAlign: "center",
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 90 },
          ]}
        >
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.itemTextTitle}>Power Factor</Text>
              <Text style={styles.itemTextValue}>60 %</Text>
            </View>
            <View>
              <Text style={styles.itemTextTitle}>Frequency</Text>
              <Text style={styles.itemTextValue}>50 Hz</Text>
            </View>
            <View>
              <Text style={styles.itemTextTitle}>Power</Text>
              <Text style={styles.itemTextValue}>200 W</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#ff7f50", height: 120 },
          ]}
        >
          <View>
            <Text style={styles.groupTitle}>LED States</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.itemTextTitle}>LED 1</Text>
              <Text style={styles.itemTextValue}>ON</Text>
            </View>
            <View>
              <Text style={styles.itemTextTitle}>LED 2</Text>
              <Text style={styles.itemTextValue}>ON</Text>
            </View>
            <View>
              <Text style={styles.itemTextTitle}>LED 3</Text>
              <Text style={styles.itemTextValue}>ON</Text>
            </View>
            <View>
              <Text style={styles.itemTextTitle}>LED 4</Text>
              <Text style={styles.itemTextValue}>OFF</Text>
            </View>
            <View>
              <Text style={styles.itemTextTitle}>LED 5</Text>
              <Text style={styles.itemTextValue}>ON</Text>
            </View>
            <View>
              <Text style={styles.itemTextTitle}>LED 6</Text>
              <Text style={styles.itemTextValue}>OFF</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 90 },
          ]}
        >
          <View>
            <Text style={styles.groupTitle}>Button Relays</Text>
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
  groupTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
    marginStart: 8,
  },
  groupWrapper: {
    marginBottom: 12,
  },
  itemTextValue: {
    fontSize: 28,
    textAlign: "center",
  },
  locationText: {
    color: "black",
    fontSize: 14,
  },
  locationTitleWrapper: {
    flex: 1,
    marginBottom: 24,
  },
  locationWrapper: {
    alignSelf: "flex-start",
    marginTop: 12,
  },
  itemTextTitle: {
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  title: {
    color: "black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 24,
  },
});

export default PanelPompaScreen;
