import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { ImageBackground } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={28}
              color={focused ? "#0861e3" : "#888888"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="explore"
              size={28}
              color={focused ? "#0861e3" : "#888888"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={28}
              color={focused ? "#0861e3" : "#888888"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
