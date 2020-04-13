import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function RegistrationScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const registration = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.registrationHeader}>
          Fill the forms below to create account
        </Text>
        <TextInput
          style={styles.registrationInput}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.registrationInput}
          placeholder="Login"
          onChangeText={setLogin}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.registrationInput}
          placeholder="Password"
          onChangeText={setPassword}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.registrationButton}
          onPress={() => registration()}
        >
          <Text>Create account</Text>
        </TouchableOpacity>
        <View style={styles.bottomWrapper}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.registrationButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text>Back to login</Text>
          </TouchableOpacity>
        </View>

        {/* <Button title="Login" onPress={() => navigation.navigate("Login")} /> */}
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
  registrationHeader: {
    marginTop: 100,
    marginBottom: 50,
  },
  registrationInput: {
    padding: 5,
    borderWidth: 1,
    width: 180,
    height: 36,
    marginBottom: 10,
    borderColor: "#A9A9A9",
  },
  registrationButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#1ef4e9",
    width: 120,
    height: 30,
  },
  bottomWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 150,
  },
});
