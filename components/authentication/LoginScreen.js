import { StyleSheet, Text, View, TextInput } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="Login" />
      <TextInput placeholder="Password" />
      <Button onPress={() => navigation.navigate("Registration")} />
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
