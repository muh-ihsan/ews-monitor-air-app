import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import database from "@react-native-firebase/database";

import colors from "../styles/colors";
import LoadingModalComponent from "../ui/LoadingModalComponent";

function ListMonitorScreen({ route, navigation }) {
  const { jenisMonitor, name, screenName } = route.params;
  const dbPath = "ewsApp/";
  const [listMonitor, setListMonitor] = useState([]);
  const [initializing, setInitializing] = useState(true);

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
          setInitializing(false);
        }
        listPanelTemp.reverse();
        setListMonitor(listPanelTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderMonitorList = () => {
    return listMonitor.map((i, index) => {
      return (
        <TouchableHighlight
          key={index}
          style={styles.listWrapper}
          onPress={() => {
            navigation.pop();
            navigation.navigate(screenName, { monitorValue: i.value });
          }}
        >
          <Text style={styles.itemText}>{i.label}</Text>
        </TouchableHighlight>
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        translucent={true}
      />
      <LoadingModalComponent show={initializing} />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{name}</Text>
      </View>
      <ScrollView>{renderMonitorList()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: "white",
  },
  itemText: {
    color: "white",
    fontSize: 17,
    marginStart: 12,
  },
  listWrapper: {
    backgroundColor: colors.bgCard,
    borderRadius: 6,
    justifyContent: "center",
    height: 50,
    marginVertical: 6,
  },
  titleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleWrapper: {
    marginVertical: 16,
  },
});

export default ListMonitorScreen;
