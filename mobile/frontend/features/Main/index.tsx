import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SimpleLineIcons, AntDesign, Feather } from "@expo/vector-icons";

// Import Internal
import Logout from "../Logout";
import HomeScreen from "../HomeScreen";

const Tab = createMaterialBottomTabNavigator();

const Component: React.FC = ({}) => {
  // Main return
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#656369"
      barStyle={{ backgroundColor: "#111" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={23} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={HomeScreen}
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" color={color} size={23} />
          ),
        }}
      />

      <Tab.Screen
        name="Logout"
        component={Logout}
        options={{
          tabBarLabel: "Logout",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="logout" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Component;
