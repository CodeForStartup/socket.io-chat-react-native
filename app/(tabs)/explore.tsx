import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, Pressable } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuth } from "@/context/auth";

export default function TabTwoScreen() {
  const { signOut } = useAuth();

  const onLogout = () => {
    AsyncStorage.removeItem("user");
    signOut();
    router.replace("/login");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"></ThemedText>
      </ThemedView>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>

      <Pressable onPress={onLogout} style={styles.button}>
        <ThemedText style={styles.buttonTitle}>Logout</ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: "red",
    borderRadius: 16,
    textAlign: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonTitle: {
    color: "white",
  },
});
