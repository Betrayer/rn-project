import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginScreen from "./components/authentication/LoginScreen";
import RegistrationScreen from "./components/authentication/RegistrationScreen";
import {HomeScreen} from "./components/application/HomeScreen";
import ProfileScreen from "./components/application/ProfileScreen";
import CreateScreen from "./components/application/CreateScreen";
import { auth } from "./firebase/config";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const application = (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
    }}
  >
    <Tab.Screen
      options={{
        tabBarOptions: {
          activeBackgroundColor: "#tomato",
        },
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons name="ios-home" size={focused ? 35 : size} color={color} />
        ),
      }}
      name="Home"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons
            name="ios-add-circle"
            size={focused ? 35 : size}
            color={color}
          />
        ),
      }}
      name="Create"
      component={CreateScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ focused, size, color }) => (
          <Ionicons
            name="ios-person"
            size={focused ? 35 : size}
            color={color}
          />
        ),
      }}
      name="Profile"
      component={ProfileScreen}
    />
  </Tab.Navigator>
);

const useRoute = (isAuth) => {
  if (isAuth) {
    return application;
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Welcome to this.app!",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
        name="Login"
        component={LoginScreen}
      />
      {/* {(props) => {
          return <LoginScreen {...props} />;
        }}
      </Stack.Screen> */}
      <Stack.Screen
        options={{
          title: "Welcome to this.app!",
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
        }}
        name="Registration"
        component={RegistrationScreen}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuth, setIsAuth] = useState(null);

  auth.onAuthStateChanged((user) => {
    // console.log("Current user", user);
    setIsAuth(user);
  });
  const routing = useRoute(isAuth);
  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
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
