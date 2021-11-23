import React from "react";
import { Text, View } from "react-native";

import styles from "../styles/stylesheet";
import Speedometer from "react-native-speedometer";

function PressureSolarScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.titleWrapper, { height: 50 }]}>
        <Text style={styles.textTitle}>Nama Pressure & Solar Panel</Text>
      </View>
      <View
        style={[
          styles.groupWrapper,
          { backgroundColor: "#94ceff", height: 170 },
        ]}
      >
        <View>
          <Text style={styles.textGroupTitle}>Pressure</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Pressure</Text>
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
        </View>
      </View>
      <View
        style={[
          styles.groupWrapper,
          { backgroundColor: "#94ceff", height: 200 },
        ]}
      >
        <View>
          <Text style={styles.textGroupTitle}>Solar Panel</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Battery</Text>
            <Text style={styles.textItemValue}>55%</Text>
          </View>
          <View>
            <Text style={styles.textItemTitle}>Charging Current</Text>
            <Text style={styles.textItemValue}>2 A</Text>
          </View>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Light Received</Text>
            <Text style={styles.textItemValue}>8000 lux</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PressureSolarScreen;
