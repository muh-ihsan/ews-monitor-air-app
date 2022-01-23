import React, { useState } from "react";
import {
  Alert,
  FlatList,
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
  IconButton,
  Menu,
  Modal,
  Portal,
  Snackbar,
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
  const [ubahVisible, setUbahVisible] = useState(false);
  const [tambahNama, setTambahNama] = useState("");
  const [ubahNama, setUbahNama] = useState("");
  const [ubahNamaOri, setUbahNamaOri] = useState("");
  const [idUbahNama, setIdUbahNama] = useState("");
  const [refreshList, setRefreshList] = useState(false);

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
            menuVisible: false,
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
  }, [refreshList]);

  const tambahMonitor = () => {
    let objTambah = {};
    let id;
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
        listMonitor[listMonitor.length - 1].value.substring(10) // ekstrak nomor dari id terakhir
      );
      id = `panelPompa${extractLastId + 1}`;
    } else if (name === "Flow Meter") {
      objTambah = {
        energyFlow: 0,
        flowRate: 0,
        fluidSoundSpeed: 0,
        nama: tambahNama,
        tempInlet: 0,
        tempOutlet: 0,
        negativeAcc: 0,
        positiveAcc: 0,
        velocity: 0,
        totalAir: 0,
      };
      const extractLastId = Number(
        listMonitor[listMonitor.length - 1].value.substring(9) // ekstrak nomor dari id terakhir
      );
      id = `flowMeter${extractLastId + 1}`;
    } else if (name === "Pressure & Solar") {
      objTambah = {
        nama: tambahNama,
        current: 0,
        pressureBar: 0,
        pressurePsi: 0,
        voltage: 0,
      };
      const extractLastId = Number(
        listMonitor[listMonitor.length - 1].value.substring(13) // ekstrak nomor dari id terakhir
      );
      id = `pressureSolar${extractLastId + 1}`;
    }

    database()
      .ref(`ewsApp/${jenisMonitor}/${id}`)
      .set(objTambah)
      .then(() => {
        console.log("Tambah Monitor berhasil!");
        setTambahVisible(false);
        setTambahNama("");
        setRefreshList(!refreshList);
      })
      .catch(() => {
        Alert.alert("Error", "Gagal tambah monitor");
      });
  };

  const ubahNamaMonitor = () => {
    let objUbah = {};
    let jenisMonitorUbah;
    if (name === "Panel Pompa") {
      objUbah = {
        nama: ubahNama,
      };
      jenisMonitorUbah = "panel-pompa";
    } else if (name === "Flow Meter") {
      objUbah = {
        nama: ubahNama,
      };
      jenisMonitorUbah = "flow-meter";
    } else if (name === "Pressure & Solar") {
      objUbah = {
        nama: ubahNama,
      };
      jenisMonitorUbah = "pressure-solar";
    }

    database()
      .ref(`ewsApp/${jenisMonitorUbah}/${idUbahNama}`)
      .update(objUbah)
      .then(() => {
        console.log("Ubah Nama Monitor berhasil!");
        setUbahVisible(false);
        setUbahNama("");
        setUbahNamaOri("");
        setIdUbahNama("");
        setRefreshList(!refreshList);
      })
      .catch(() => {
        Alert.alert("Error", "Gagal ubah nama monitor");
      });
  };

  const renderMonitorList = ({ item, index }) => {
    return (
      <Surface style={[styles.listWrapper, { elevation: 2 }]}>
        <View style={styles.listViewWrapper}>
          <TouchableRipple
            style={[styles.listWrapper, { width: "88%" }]}
            borderless={true}
            rippleColor="#B3B3B3"
            underlayColor="#B3B3B3"
            onPress={() => {
              navigation.navigate(screenName, { monitorValue: item.value });
            }}
          >
            <Text style={styles.itemText}>{item.label}</Text>
          </TouchableRipple>
          <Menu
            visible={item.menuVisible}
            onDismiss={() => {
              const tempArr = [...listMonitor];
              tempArr[index].menuVisible = false;

              setListMonitor(tempArr);
            }}
            anchor={
              <IconButton
                icon="dots-vertical"
                color="grey"
                size={24}
                onPress={() => {
                  const tempArr = [...listMonitor];
                  tempArr[index].menuVisible = true;

                  setListMonitor(tempArr);
                }}
              />
            }
          >
            <Menu.Item
              title="Ubah Nama"
              onPress={() => {
                setUbahNama(item.label);
                setUbahNamaOri(item.label);
                setIdUbahNama(item.value);
                setUbahVisible(true);
                const tempArr = [...listMonitor];
                tempArr[index].menuVisible = false;

                setListMonitor(tempArr);
              }}
            />
            <Menu.Item
              title="Hapus"
              onPress={() => {
                const tempArr = [...listMonitor];
                tempArr[index].menuVisible = false;

                setListMonitor(tempArr);
                Alert.alert(
                  "",
                  "Apakah anda yakin ingin menghapus monitor ini?",
                  [
                    {
                      text: "Iya",
                      onPress: () => {
                        database()
                          .ref(`ewsApp/${jenisMonitor}/${item.value}`)
                          .remove()
                          .then(() => {
                            console.log("Hapus monitor berhasil!");
                            setRefreshList(!refreshList);
                          })
                          .catch(() => {
                            Alert.alert("Error", "Gagal hapus monitor");
                          });
                      },
                    },
                    {
                      text: "Tidak",
                    },
                  ]
                );
              }}
            />
          </Menu>
        </View>
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
        translucent={true}
      />
      <LoadingModalComponent show={initializing} navigation={navigation} />
      <Portal>
        {/* Untuk tambah nama */}
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
      <Portal>
        {/* Untuk ubah nama */}
        <Modal
          visible={ubahVisible}
          contentContainerStyle={styles.tambahModalContainer}
          onDismiss={() => setUbahVisible(false)}
        >
          <Text style={[styles.titleText, { marginBottom: 16 }]}>
            Ubah Nama
          </Text>
          <TextInput
            style={styles.textInput}
            value={ubahNama}
            selectTextOnFocus={true}
            placeholderTextColor="grey"
            onChangeText={(text) => setUbahNama(text)}
            autoCapitalize="none"
            keyboardType="default"
          />
          <View style={styles.buttonModalWrapper}>
            <Button
              mode="contained"
              disabled={!ubahNama || ubahNama === ubahNamaOri}
              color={colors.primary}
              style={styles.buttonModal}
              onPress={ubahNamaMonitor}
            >
              Ubah Nama
            </Button>
            <Button
              mode="text"
              color={colors.primary}
              onPress={() => setUbahVisible(false)}
            >
              Batal
            </Button>
          </View>
        </Modal>
      </Portal>
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>{name}</Text>
      </View>
      <FlatList
        data={listMonitor}
        renderItem={renderMonitorList}
        keyExtractor={(item) => item.value}
      />
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
  listViewWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
