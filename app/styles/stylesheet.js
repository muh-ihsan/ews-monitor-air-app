import { StyleSheet } from "react-native";

import colors from "./colors";

export default styles = StyleSheet.create({
  container: {
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
    color: colors.text,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 8,
    marginStart: 8,
  },
  groupWrapper: {
    marginHorizontal: 16,
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
    color: colors.text,
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
  },
  textItemValue: {
    color: colors.text,
    fontSize: 28,
    textAlign: "center",
  },
  titleMonitorText: {
    color: colors.text,
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
    color: colors.text,
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
    color: colors.text,
    textAlign: "center",
  },
});
