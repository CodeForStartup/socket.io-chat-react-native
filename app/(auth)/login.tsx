import { useState } from "react";
import { Pressable, StyleSheet, View, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/auth";
import { ThemedText } from "@/components/ThemedText";
import { useLogin } from "@/hooks/useLogin";
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";

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

  const { control, handleSubmit } = useForm();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Username"
            style={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 32,
              paddingHorizontal: 32,
              paddingVertical: 16,
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Password"
            secureTextEntry
            style={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 32,
              paddingHorizontal: 32,
              paddingVertical: 16,
            }}
          />
        )}
      />
      <Button mode="contained" onPress={onLoginPress} disabled={isLoading}>
        <ThemedText style={styles.text}>Login</ThemedText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
    paddingHorizontal: 32,
    // backfaceVisibility
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
    width: "100%",
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
