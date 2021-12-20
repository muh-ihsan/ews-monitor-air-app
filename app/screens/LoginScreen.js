import React, { useState } from "react";
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";

import colors from "../styles/colors";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isValid, setValid] = useState(true);

  const emailValidity = (emailArg) => {
    var rEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rEx.test(String(emailArg).toLowerCase());
  };

  const loginCheck = () => {
    if (!email) {
      setError("Email kosong");
      setValid(false);
      return;
    } else if (!pass) {
      setError("Password kosong");
      setValid(false);
      return;
    } else if (!emailValidity(email)) {
      setError("Email invalid");
      setValid(false);
      return;
    } else {
      setError(null);
      setValid(true);
    }

    console.log(error);

    auth()
      .signInWithEmailAndPassword(email, pass.trim())
      .then(() => {
        console.log("User signed in!");
        messaging()
          .subscribeToTopic("notif")
          .then(() => console.log("Subscribe to topic"));
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          Alert.alert("Error Login", "Email tidak valid");
        } else if (err.code === "auth/user-disabled") {
          Alert.alert(
            "Error Login",
            "User dengan email ini tidak di-enable. Kontak admin"
          );
        } else if (err.code === "auth/user-not-found") {
          Alert.alert(
            "Error Login",
            "User tidak ditemukan. Silahkan sign-up terlebih dahulu"
          );
        } else if (err.code === "auth/wrong-password") {
          Alert.alert("Error Login", "Password salah");
        }
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={colors.background}
      />
      <View style={styles.inputWrapper}>
        {/* <Text style={styles.textLogin}>Log In</Text> */}
        <Image
          style={styles.imageLogin}
          source={require("../assets/logo_purabaya.png")}
          fadeDuration={0}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="grey"
          onChangeText={(text) => {
            setError;
            setEmail(text);
          }}
          keyboardType="email-address"
          error={isValid}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="grey"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPass(text)}
          keyboardType="default"
          error={isValid}
        />
        {error ? (
          <View style={styles.errorLabelContainer}>
            <Text style={styles.textError}>{error}</Text>
          </View>
        ) : null}
        <TouchableHighlight style={styles.buttonSignIn} onPress={loginCheck}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.textSignInButton}>Sign In</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonSignIn: {
    width: 160,
    height: 50,
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  buttonWrapper: {
    flex: 0.2,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: colors.background,
  },
  errorLabelContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogin: {
    width: 148,
    height: 148,
    alignSelf: "center",
    marginBottom: 40,
  },
  inputWrapper: {
    paddingHorizontal: 24,
    justifyContent: "space-around",
  },
  textError: {
    color: "#CA566B",
    textAlign: "center",
  },
  textInput: {
    marginVertical: 8,
    borderRadius: 6,
    padding: 8,
    height: 55,
    backgroundColor: colors.bgCard,
    color: "white",
  },
  textLogin: {
    marginBottom: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 24,
  },
  textSignInButton: {
    color: "white",
  },
});

export default LoginScreen;
