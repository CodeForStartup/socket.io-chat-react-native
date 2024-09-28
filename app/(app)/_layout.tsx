import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      {/* <Stack.Screen name="" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{ headerShown: false }} />
      <Stack.Screen name="add-friend" options={{ headerShown: false }} />
    </Stack>
  );
}
