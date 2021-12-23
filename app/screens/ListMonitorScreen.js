import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import database from "@react-native-firebase/database";

import colors from "../styles/colors";

function ListMonitorScreen({ route }) {
  const { jenisMonitor } = route.params;
  const dbPath = "ewsApp/";
  const [listMonitor, setListMonitor] = useState([]);

  // Untuk ambil berapa banyak monitor panel pompa
  React.useEffect(() => {
    const listPanelTemp = [];
    database()
      .ref(dbPath + jenisMonitor)
      .once("value", (snapshot) => {
        const fetchData = snapshot.val();
        for (const panel in fetchData) {
          listPanelTemp.push({
            label: fetchData[panel].nama,
            value: panel.toString(),
          });
          console.log("Successfully add list");
          console.log("List: ", listPanelTemp);
        }
        setListMonitor(listPanelTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderMonitorList = () => {
    return listMonitor.map((i, index) => {
      return (
        <View key={index} style={styles.listWrapper}>
          <Text style={styles.itemText}>{i.label}</Text>
        </View>
      );
    });
  };

  return <View style={styles.container}>{renderMonitorList()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  divider: {
    backgroundColor: "white",
  },
  itemText: {
    color: "white",
    fontSize: 18,
    marginStart: 8,
  },
  listWrapper: {
    backgroundColor: colors.bgCard,
    borderRadius: 6,
    justifyContent: "center",
    height: 48,
    marginVertical: 8,
  },
  titleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleWrapper: {
    marginVertical: 24,
  },
});

export default ListMonitorScreen;
