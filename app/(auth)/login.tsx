import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/auth";
import { ThemedText } from "@/components/ThemedText";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn: signInToAuthProvider } = useAuth();

  const { onLogin, isLoading, error } = useLogin();
  const onLoginPress = async () => {
    const result = await onLogin(username, password);

    await AsyncStorage.setItem("user", JSON.stringify(result?.data));

    signInToAuthProvider({
      username: result?.data.username,
      id: result?.data.id,
      password: result?.data.password,
    });
  };

  return (
    <View style={styles.container}>
      {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
      <TextInput
        style={styles.textInput}
        value={username}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Type password"
        secureTextEntry
      />
      <View style={styles.separator} />
      <Pressable
        onPress={onLoginPress}
        disabled={isLoading}
        style={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
      >
        <ThemedText style={styles.text}>Login</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginTop: 16,
  },
  textInput: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 8,
    width: "60%",
    borderRadius: 32,
  },
  text: {
    color: "white",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "60%",
    backgroundColor: "#05BFDB",
    marginTop: 8,
    borderRadius: 32,
    alignItems: "center",
  },
});
