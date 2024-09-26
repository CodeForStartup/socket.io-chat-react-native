import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuth } from "@/context/auth";
import { useLogout } from "@/hooks/useLogout";
import { Button, Text } from "react-native-paper";

export default function TabTwoScreen() {
  const { signOut } = useAuth();

  const { mutate: onLogoutBE, data: logoutData, isPending } = useLogout();

  const { user } = useAuth();

  const onLogout = async () => {
    try {
      await onLogoutBE();
      AsyncStorage.removeItem("user");
      signOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={128} color="#808080" />
      <Text style={styles.username}>#{user?.username}</Text>
      <Button
        mode="contained"
        onPress={onLogout}
        loading={isPending}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 48,
  },
  button: {
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
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
});
