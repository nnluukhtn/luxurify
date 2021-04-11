import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import Scanner from "./Scanner";

const Stack = createStackNavigator();

const Camera = () => {
  // Main return
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera.Scanner"
        component={Scanner}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Camera;
