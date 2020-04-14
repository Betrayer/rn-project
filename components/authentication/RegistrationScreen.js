import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { db } from "../../firebase/config";

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState({
    email: "",
    login: "",
    password: "",
  });

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    const currentUser = await db.auth().currentUser;
  };

  // const addInfo = async() => {
  //   const currentUser = await db.auth().currentUser.updateProfile({
  //     displayName: 'Bodya'
  //   })
  // }

  const registration = async () => {
    const { email, password } = state;
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
    Keyboard.dismiss();
    setState({
      email: "",
      login: "",
      password: "",
    });
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
          onChangeText={(value) => setState({ ...state, email: value })}
        />
        {/* <TextInput
          style={styles.registrationInput}
          placeholder="Login"
          onChangeText={(value) => setState({ ...state, login: value })}
        /> */}
        <TextInput
          secureTextEntry={true}
          style={styles.registrationInput}
          placeholder="Password"
          onChangeText={(value) => setState({ ...state, password: value })}
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
