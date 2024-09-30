import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="chat/[channelId]" />
      <Stack.Screen name="chat/add-friend" />
    </Stack>
  );
}
