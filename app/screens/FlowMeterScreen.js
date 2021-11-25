import React from "react";
import { View, ScrollView, Dimensions, Text } from "react-native";

import GaugeComponent from "../ui/GaugeComponent";
import styles from "../styles/stylesheet";

const screenHeight = Dimensions.get("window").height;

function FlowMeterScreen() {
  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Flow Meter</Text>
      </View>
      <ScrollView style={{ height: screenHeight - 240 }}>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#94ceff", height: 480 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Flow Rate</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Flow Rate"
              value={200}
              min={100}
              max={300}
              markStep={20}
              unit="m3/h"
            />
            <GaugeComponent
              title="Energy Flow Rate"
              value={200}
              min={100}
              max={300}
              markStep={20}
              unit="GJ/h"
            />
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Velocity"
              value={200}
              min={100}
              max={300}
              markStep={20}
              unit="m/s"
            />
            <GaugeComponent
              title="Fluid Sound Speed"
              value={200}
              min={100}
              max={300}
              markStep={20}
              unit="m/s"
            />
          </View>
        </View>
        <View
          style={[
            styles.groupWrapper,
            { backgroundColor: "#ff7f50", height: 260 },
          ]}
        >
          <View>
            <Text style={styles.textGroupTitle}>Temperature</Text>
          </View>
          <View style={styles.itemGroupWrapper}>
            <GaugeComponent
              title="Temperature Inlet"
              value={200}
              min={100}
              max={300}
              markStep={20}
              unit="°C"
            />
            <GaugeComponent
              title="Temperature Outlet"
              value={200}
              min={100}
              max={300}
              markStep={20}
              unit="°C"
            />
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
      </ScrollView>
    </View>
  );
}

export default FlowMeterScreen;
