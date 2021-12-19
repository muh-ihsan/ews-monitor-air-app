import React, { useState } from "react";
import { BackHandler, Modal, StyleSheet, Text, View } from "react-native";

function NoInternetComponent(props) {
  return (
    <Modal
      visible={props.show}
      transparent={true}
      onRequestClose={() => BackHandler.exitApp()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.offlineText}>Tidak ada koneksi internet.</Text>
          <Text style={styles.offlineText}>
            Silahkan hubungkan ke internet untuk menggunakan aplikasi ini.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#b52424",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  offlineText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default NoInternetComponent;
