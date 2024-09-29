import { StyleSheet, Image, Platform, Pressable, View } from "react-native";

import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.square}>
          <Text variant="headlineLarge">CODE</Text>
          <Text variant="headlineSmall">for</Text>
          <Text variant="headlineLarge">STARTUP</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: 200,
    height: 200,
    borderWidth: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 1
  },
});
