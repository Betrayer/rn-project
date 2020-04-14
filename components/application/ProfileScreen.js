import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebase/config";

export default function ProfileScreen() {
  const logOut = async () => {
    await db.auth().signOut();
  };
  return (
    <View style={styles.container}>
      <View style={styles.exitWrapper}>
        <Text>Profile</Text>
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
  },
});
