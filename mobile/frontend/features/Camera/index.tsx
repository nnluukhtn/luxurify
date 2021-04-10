import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// Screens
import Scanner from "./Scanner";
import Detail from "../Inventory/Detail";

const Stack = createStackNavigator();

const Camera = () => {
  // Main return
  return (
    <Stack.Navigator initialRouteName="Camera.Scanner">
      <Stack.Screen
        name="Camera.Scanner"
        component={Scanner}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Camera.Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default Camera;
