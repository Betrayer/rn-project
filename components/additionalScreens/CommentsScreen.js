import React from "react";

import { StyleSheet, View, Text } from "react-native";

export const CommentsScreen = () => (
  <View style={styles.container}>
    <Text>COMMENTS</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
