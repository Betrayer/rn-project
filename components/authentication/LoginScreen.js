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
import { auth } from "../../firebase/config";

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const confirmation = async () => {
    console.log("state", state);
    const { email, password } = state;
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.loginHeader}>Please, enter your credentials</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          onChangeText={(value) => setState({ ...state, email: value })}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.loginInput}
          placeholder="Password"
          onChangeText={(value) => setState({ ...state, password: value })}
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
