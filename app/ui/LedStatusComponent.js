import React from "react";
import { Text, View } from "react-native";

import styles from "../styles/stylesheet";

const LedStatusComponent = (props) => {
  return (
    <View style={styles.itemTextValueWrapper}>
      <Text style={styles.textItemTitle}>{props.name}</Text>
      <Text style={styles.textItemValue}>{props.value ? "ON" : "OFF"}</Text>
    </View>
  );
};

export default LedStatusComponent;
