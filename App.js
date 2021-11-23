import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FlowMeterScreen from "./app/screens/FlowMeterScreen";
import PanelPompaScreen from "./app/screens/PanelPompaScreen";
import PressureSolarScreen from "./app/screens/PressureSolarScreen";
import TestGaugeScreen from "./app/screens/TestGaugeScreen";

export default function App() {
  console.log("App started...");
  return <PanelPompaScreen />;
}
