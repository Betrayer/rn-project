import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const confirmation = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.loginHeader}>Please, enter your credentials</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Login"
          onChangeText={setLogin}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.loginInput}
          placeholder="Password"
          onChangeText={setPassword}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.loginButton}
          onPress={() => confirmation()}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <View style={styles.bottomWrapper}>
          <Text>Don't have an account yet? Register now!</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.loginButton}
            onPress={() => navigation.navigate("Registration")}
          >
            <Text>Registration</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  loginHeader: {
    marginTop: 100,
    marginBottom: 50,
  },
  loginInput: {
    padding: 5,
    borderWidth: 1,
    width: 180,
    height: 36,
    marginBottom: 10,
    borderColor: "#A9A9A9",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#1ef4e9",
    width: 90,
    height: 30,
  },
  bottomWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 150,
  },
});
