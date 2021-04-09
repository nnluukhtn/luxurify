import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import Scanner from "./Scanner";
import Detail from "../Inventory/Detail";

interface Props {}

const Camera: React.FC<Props> = ({}) => {
  const Stack = createStackNavigator();

  // Main return
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Camera.Scanner"
          component={Scanner}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Camera.Detail" component={Detail} />
      </Stack.Navigator>
    </>
  );
};

export default Camera;
