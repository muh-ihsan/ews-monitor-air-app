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
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
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
    backgroundColor: colors.primary,
    marginBottom: 12,
    borderRadius: 10,
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
    marginBottom: 8,
  },
  scrollContainer: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  textTitle: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
