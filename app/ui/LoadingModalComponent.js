import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";

import colors from "../styles/colors";

const LoadingModalComponent = (props) => {
  const { show = false, navigation } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        navigation.goBack();
      }}
      visible={show}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View
          style={{ padding: 12, backgroundColor: "white", borderRadius: 12 }}
        >
          <ActivityIndicator
            animating={show}
            color={colors.primary}
            size="large"
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModalComponent;
