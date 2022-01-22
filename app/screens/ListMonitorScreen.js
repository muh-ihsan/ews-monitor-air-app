import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import database from "@react-native-firebase/database";
import {
  Button,
  FAB,
  Modal,
  Portal,
  Surface,
  TouchableRipple,
} from "react-native-paper";

import colors from "../styles/colors";
import LoadingModalComponent from "../ui/LoadingModalComponent";

function ListMonitorScreen({ route, navigation }) {
  const { jenisMonitor, name, screenName } = route.params;
  const dbPath = "ewsApp/";
  const [listMonitor, setListMonitor] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [tambahVisible, setTambahVisible] = useState(false);
  const [tambahNama, setTambahNama] = useState("");

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
        listPanelTemp.sort((a, b) => {
          if (a.value > b.value) return 1;
          else return -1;
        });
        setListMonitor(listPanelTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tambahVisible]);

  const tambahMonitor = () => {
    let objTambah = {};
    let id;
    let jenisMonitorTambah;
    if (name === "Panel Pompa") {
      objTambah = {
        currentR: 0,
        currentS: 0,
        currentT: 0,
        frequency: 0,
        led1: {
          nama: "LED 1",
          value: "OFF",
        },
        led2: {
          nama: "LED 2",
          value: "OFF",
        },
        led3: {
          nama: "LED 3",
          value: "OFF",
        },
        led4: {
          nama: "LED 4",
          value: "OFF",
        },
        led5: {
          nama: "LED 5",
          value: "OFF",
        },
        led6: {
          nama: "LED 6",
          value: "OFF",
        },
        relay1: { nama: "Relay 1", trigger: 0 },
        relay2: { nama: "Relay 2", trigger: 1 },
        nama: tambahNama,
        power: 0,
        powerFactor: 0,
        voltR: 0,
        voltS: 0,
        voltT: 0,
      };
      const extractLastId = Number(
        listMonitor[listMonitor.length - 1].value.substring(10)
      );
      id = `panelPompa${extractLastId + 1}`;
      jenisMonitorTambah = "panel-pompa";
    }

    database()
      .ref(`ewsApp/${jenisMonitorTambah}/${id}`)
      .set(objTambah)
      .then(() => {
        console.log("Tambah Monitor berhasil!");
        setTambahVisible(false);
      })
      .catch(() => {
        Alert.alert("Error", "Gagal tambah monitor");
      });
  };

  const renderMonitorList = () => {
    return listMonitor.map((i, index) => {
      return (
        <Surface key={index} style={[styles.listWrapper, { elevation: 2 }]}>
          <TouchableRipple
            style={styles.listWrapper}
            borderless={true}
            rippleColor="#B3B3B3"
            underlayColor="#B3B3B3"
            onPress={() => {
              navigation.navigate(screenName, { monitorValue: i.value });
            }}
          >
            <Text style={styles.itemText}>{i.label}</Text>
          </TouchableRipple>
        </Surface>
      );
    });
  };

  // console.log(
  //   "Sorting: ",
  //   listMonitor.sort((a, b) => {
  //     if (a.value > b.value) return 1;
  //     else return -1;
  //   })
  // );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        translucent={true}
      />
      <LoadingModalComponent show={initializing} navigation={navigation} />
      <Portal>
        <Modal
          visible={tambahVisible}
          contentContainerStyle={styles.tambahModalContainer}
          onDismiss={() => setTambahVisible(false)}
        >
          <Text style={[styles.titleText, { marginBottom: 16 }]}>
            Tambah Baru
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={`Nama ${name}`}
            placeholderTextColor="grey"
            onChangeText={(text) => setTambahNama(text)}
            autoCapitalize="none"
            keyboardType="default"
          />
          <View style={styles.buttonModalWrapper}>
            <Button
              mode="contained"
              disabled={!tambahNama}
              color={colors.primary}
              style={styles.buttonModal}
              onPress={tambahMonitor}
            >
              Tambah
            </Button>
            <Button
              mode="text"
              color={colors.primary}
              onPress={() => setTambahVisible(false)}
            >
              Batal
            </Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{name}</Text>
      </View>
      <ScrollView>{renderMonitorList()}</ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        label="tambah"
        visible={!initializing}
        onPress={() => setTambahVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonModal: {
    marginHorizontal: 4,
  },
  buttonModalWrapper: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "row-reverse",
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: "white",
  },
  fab: {
    backgroundColor: colors.primary,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  itemText: {
    color: colors.text,
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
  tambahModalContainer: {
    height: 210,
    marginHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  textInput: {
    borderColor: colors.primary,
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    padding: 8,
    height: 55,
    backgroundColor: colors.bgCard,
    color: colors.text,
  },
  titleText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleWrapper: {
    marginVertical: 16,
  },
});

export default ListMonitorScreen;
