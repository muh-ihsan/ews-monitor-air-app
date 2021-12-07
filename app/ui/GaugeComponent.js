import React from "react";
import { View, Text } from "react-native";

import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
} from "react-native-cool-speedometer";

import styles from "../styles/stylesheet";

const GaugeComponent = (props) => {
  return (
    <View>
      <Text style={styles.textItemTitle}>{props.title || Gauge}</Text>
      <Speedometer
        value={props.value}
        width={props.width || 140}
        min={props.min || 0}
        max={props.max || 100}
        angle={props.angle || 250}
        fontFamily={"roboto"}
      >
        <Background />
        <Arc />
        <Needle />
        <Progress />
        <Marks fontSize={12} step={props.markStep || 10} />
      </Speedometer>
      <Text style={styles.textGaugeValue}>
        {props.value} {props.unit || ""}
      </Text>
    </View>
  );
};

export default GaugeComponent;
