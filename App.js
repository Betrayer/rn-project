import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/authentication/LoginScreen";
import RegistrationScreen from "./components/authentication/RegistrationScreen";
import HomeScreen from "./components/application/HomeScreen";
import MapScreen from "./components/application/MapScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const application = (
  <Tab.Navigator>
    <Tab.Screen component={HomeScreen} />
    <Tab.Screen component={MapScreen} />
  </Tab.Navigator>
);

const useRoute = (isAuth) => {
  if (isAuth) {
    return application;
  }
  return (application = (
    <Stack.Navigator>
      <View style={styles.container}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </View>
    </Stack.Navigator>
  ));
};

export default function App() {
  // return (
  //   <Stack.Navigator>
  //     <View style={styles.container}>
  //     <Stack.Screen name='Login' component={LoginScreen} />
  //     <Stack.Screen name='Registration' component={RegistrationScreen} />
  //     </View>
  //   </Stack.Navigator>
  // );
  const [isAuth, setIsAuth] = useState(true);
  const routing = useRoute(true);
  return <NavigationContainer>{routing}</NavigationContainer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
