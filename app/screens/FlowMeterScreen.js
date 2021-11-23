import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Speedometer from "react-native-speedometer";
import styles from "../styles/stylesheet";

function FlowMeterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Nama Flow Meter</Text>
      </View>
      <View
        style={[
          styles.groupWrapper,
          { backgroundColor: "#94ceff", height: 280 },
        ]}
      >
        <View>
          <Text style={styles.textGroupTitle}>Flow Rate</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Flow Rate</Text>
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
            <Text style={styles.textItemTitle}>Energy Flow Rate</Text>
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
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Velocity</Text>
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
            <Text style={styles.textItemTitle}>Fluid Sound Speed</Text>
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
          { backgroundColor: "#ff7f50", height: 170 },
        ]}
      >
        <View>
          <Text style={styles.textGroupTitle}>Temperature</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Temperature Inlet</Text>
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
            <Text style={styles.textItemTitle}>Temperature Outlet</Text>
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
          { backgroundColor: "#94ceff", height: 120 },
        ]}
      >
        <View>
          <Text style={styles.textGroupTitle}>Accumulator</Text>
        </View>
        <View style={styles.itemGroupWrapper}>
          <View>
            <Text style={styles.textItemTitle}>Positive Accumulator</Text>
            <Text style={styles.textItemValue}>2.51</Text>
          </View>
          <View>
            <Text style={styles.textItemTitle}>Negative Accumulator</Text>
            <Text style={styles.textItemValue}>-3.12</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default FlowMeterScreen;
