import { StyleSheet, Image, Platform, Pressable, View } from "react-native";

import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text variant="headlineLarge">CODE</Text>
        <Text variant="headlineSmall">for</Text>
        <Text variant="headlineLarge">STARTUP</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
