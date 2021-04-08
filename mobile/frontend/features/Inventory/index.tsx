import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import Grid from "./Grid";
import Detail from "./Detail";

interface Props {}

const Inventory: React.FC<Props> = ({}) => {
  const Stack = createStackNavigator();

  // Main return
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Inventory.Grid" component={Grid} />
        <Stack.Screen name="Inventory.Detail" component={Detail} />
      </Stack.Navigator>
    </>
  );
};

export default Inventory;
