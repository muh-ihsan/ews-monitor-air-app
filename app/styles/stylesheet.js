import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginHorizontal: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "Roboto",
    backgroundColor: "#FFF",
  },
  itemGroupWrapper: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textGroupTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
    marginStart: 8,
  },
  groupWrapper: {
    marginBottom: 12,
  },
  textItemValue: {
    fontSize: 28,
    textAlign: "center",
  },
  titleWrapper: {
    // flex: 1,
    marginBottom: 24,
  },
  textItemTitle: {
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  textTitle: {
    color: "black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 24,
  },
});