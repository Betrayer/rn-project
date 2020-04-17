import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PostScreen } from "../additionalScreens/PostScreen";
import { MapScreen } from "../additionalScreens/MapScreen";

const RootMain = createStackNavigator();

export const HomeScreen = () => (
  <RootMain.Navigator>
    <RootMain.Screen
      options={{
        headerShown: false,
      }}
      name="Posts"
      component={PostScreen}
    />
    <RootMain.Screen
      // options={{ headerShown: false }}
      name="Map"
      component={MapScreen}
    />
  </RootMain.Navigator>
);
