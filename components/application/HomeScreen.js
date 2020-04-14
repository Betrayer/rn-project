import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { db } from "../../firebase/config";

export default function HomeScreen() {
  const logOut = async () => {
    await db.auth().signOut();
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title='logout' onPress={logOut} />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
