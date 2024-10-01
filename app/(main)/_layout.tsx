import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      // initialRouteName="index"
      screenOptions={{
        // headerShown: false,
        contentStyle: { backgroundColor: "white" },
        // headerTitle: ""
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
        ),
        headerShadowVisible: false,
        headerStyle: {
          // backgroundColor: "white",
        },
        // headerBorderVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat/[channelId]"
        options={{ headerShown: true, headerTitle: "Chat" }}
      />
      <Stack.Screen
        name="chat/add-friend"
        options={{ headerTitle: "Add Friend" }}
      />
      <Stack.Screen
        name="chat/add-group"
        options={{ headerTitle: "Add Group" }}
      />
    </Stack>
  );
}
