import { StyleSheet } from "react-native";

import colors from "./colors";

export default styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    fontFamily: "Roboto",
    backgroundColor: colors.background,
  },
  itemGroupWrapper: {
    flexWrap: "wrap",
    alignContent: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  itemTextValueWrapper: {
    marginVertical: 16,
    alignContent: "space-around",
    alignItems: "center",
  },
  textGroupTitle: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
    marginStart: 8,
  },
  groupWrapper: {
    backgroundColor: colors.bgCard,
    marginBottom: 12,
    borderRadius: 10,
  },
  picker: {
    color: "white",
  },
  pickerBorder: {
    backgroundColor: colors.primary,
    marginTop: 16,
    borderRadius: 8,
    elevation: 5,
  },
  textGaugeValue: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  textItemValue: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
  },
  titleMonitorText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleMonitorWrapper: {
    marginTop: 16,
  },
  titleWrapper: {
    marginTop: 12,
    marginBottom: 24,
  },
  textItemTitle: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  scrollContainer: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  textTitle: {
    color: "white",
    textAlign: "center",
  },
});
