import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tabIconSelected,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"}
              color={
                focused
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      /> */}
      <Tabs.Screen
        name="test"
        options={{
          href: null,
          headerShown: true,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen name="add-friend" options={{ href: null }} />
      <Tabs.Screen name="chat" options={{ href: null }} />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={
                focused
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",

          tabBarItemStyle: {},
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={
                focused
                  ? Colors.light.tabIconSelected
                  : Colors.light.tabIconDefault
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}