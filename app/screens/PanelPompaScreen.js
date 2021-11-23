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

import Speedometer from "react-native-speedometer";

const screenHeight = Dimensions.get("window").height;

function PanelPompaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Nama Panel</Text>
      </View>
      <ScrollView style={{ height: screenHeight - 240 }}>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 170 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Tegangan</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Volt R</Text>
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
              <Text style={styles.textItemTitle}>Volt S</Text>
              <Speedometer
                value={80}
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
              <Text style={styles.textItemTitle}>Volt T</Text>
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
            { backgroundColor: "#ff7f50", height: 170 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Arus Listrik</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Current R</Text>
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
              <Text style={styles.textItemTitle}>Current S</Text>
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
              <Text style={styles.textItemTitle}>Current T</Text>
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
            { backgroundColor: "#94ceff", height: 110 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Power</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>Power Factor</Text>
              <Text style={styles.textItemValue}>60 %</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Frequency</Text>
              <Text style={styles.textItemValue}>50 Hz</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>Power</Text>
              <Text style={styles.textItemValue}>200 W</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#ff7f50", height: 110 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>LED States</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <View>
              <Text style={styles.textItemTitle}>LED 1</Text>
              <Text style={styles.textItemValue}>ON</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>LED 2</Text>
              <Text style={styles.textItemValue}>ON</Text>
            </View>
            <View>
              <Text style={styles.textItemTitle}>LED 3</Text>
              <Text style={styles.textItemValue}>ON</Text>
            </View>
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
  locationWrapper: {
    alignSelf: "flex-start",
    marginTop: 12,
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
    marginTop: 24,
  },
});

export default PanelPompaScreen;
