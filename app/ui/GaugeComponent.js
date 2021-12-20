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
import colors from "../styles/colors";

const GaugeComponent = (props) => {
  return (
    <View style={{ marginVertical: 16 }}>
      <Text style={styles.textItemTitle}>{props.title || Gauge}</Text>
      <Speedometer
        value={props.value || 0}
        width={props.width || 140}
        min={props.min || 0}
        max={props.max || 100}
        angle={props.angle || 250}
        fontFamily={"roboto"}
        accentColor={colors.secondary}
      >
        <Background opacity={0.2} />
        <Arc opacity={0} />
        <Needle offset={35} circleRadius={12} baseWidth={4} baseOffset={6} />
        <Progress />
        <Marks
          fontSize={12}
          lineColor={colors.primary}
          step={props.markStep || 10}
        />
      </Speedometer>
      <Text style={styles.textGaugeValue}>
        {props.value} {props.unit || ""}
      </Text>
    </View>
  );
};

export default GaugeComponent;
