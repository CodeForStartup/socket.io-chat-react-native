import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider, UserCredentials } from "@/context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBindMessages from "@/hooks/useBindMessages";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [loadedUser, setLoadedUser] = useState<UserCredentials | null>(null);
  const [isReady, setIsReady] = useState(false);

  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setLoadedUser(JSON.parse(user));
    }
    setIsReady(true);
  };

  useBindMessages();

  useEffect(() => {
    getUserFromStorage();
  }, []);

  useEffect(() => {
    if (loaded && isReady) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isReady]);

  if (!loaded || !isReady) {
    return null;
  }

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Provider userCredentials={loadedUser}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                {loadedUser ? (
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                ) : (
                  <Stack.Screen
                    name="(auth)"
                    options={{ headerShown: false }}
                  />
                )}
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </Provider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
