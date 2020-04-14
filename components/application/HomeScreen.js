import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
// md-exit
export default function HomeScreen() {
  const [name, setname] = useState("");

  useEffect(() => {
    currentUser();
  }, []);

  const currentUser = async () => {
    const currentUser = await db.auth().currentUser;
    setname(currentUser.displayName);
  };

  const logOut = async () => {
    await db.auth().signOut();
  };
  return (
    <View style={styles.container}>
      <View style={styles.exitWrapper}>
        <Text>Signed in as {name}</Text>
        <TouchableOpacity>
          <Ionicons
            style={styles.exit}
            name="md-exit"
            size={35}
            color={"#3f9bc1"}
            onPress={logOut}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  exitWrapper: {
    marginTop: 40,
    flexDirection: "row",
    width: 380,
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: '#f4511e'
  },
});
