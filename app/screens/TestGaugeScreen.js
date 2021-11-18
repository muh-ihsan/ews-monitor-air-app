import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
// import RNSpeedometer from "react-native-speedometer";
import RNSpeedometer from "../ui/gauge/gauge";

function TestGaugeScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <RNSpeedometer
        value={45}
        size={300}
        minValue={0}
        maxValue={100}
        useCustomRange={true}
        labels={[
          {
            name: "Underflow",
            labelColor: "#ff2900",
            activeBarColor: "#ff2900",
            thresholdValue: 10,
          },
          {
            name: "Normal",
            labelColor: "#14eb6e",
            activeBarColor: "#14eb6e",
            thresholdValue: 85,
          },
          {
            name: "Overflow",
            labelColor: "#ff2900",
            activeBarColor: "#ff2900",
            thresholdValue: 100,
          },
        ]}
        labelStyle={{ fontSize: 20 }}
        labelNoteStyle={{ fontSize: 12 }}
      />
    </SafeAreaView>
  );
}

export default TestGaugeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
