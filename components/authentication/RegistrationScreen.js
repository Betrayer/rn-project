import { StyleSheet, Text, View, TextInput } from "react-native";

export default function RegistrationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Registration</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Login" />
      <TextInput placeholder="Password" />
      <Button onPress={() => navigation.navigate("Login")} />
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
