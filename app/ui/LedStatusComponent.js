import React from "react";
import { Text, View } from "react-native";

import styles from "../styles/stylesheet";

const LedStatusComponent = (props) => {
  return (
    <View style={styles.itemTextValueWrapper}>
      <Text style={styles.textItemTitle}>{props.name}</Text>
      <Text style={[styles.textItemValue, { fontSize: 22 }]}>
        {props.value}
      </Text>
    </View>
  );
};

export default LedStatusComponent;
