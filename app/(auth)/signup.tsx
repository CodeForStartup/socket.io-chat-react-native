import { useState } from "react";
import { Pressable, StyleSheet, View, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/auth";
import { ThemedText } from "@/components/ThemedText";
import { useLogin } from "@/hooks/useLogin";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputField from "@/components/form/TextInput";
import { router } from "expo-router";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const { signIn: signInToAuthProvider } = useAuth();

  const form = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(
      z.object({
        username: z.string().min(1, { message: "Username is required" }),
        // .min(1, { message: "Username must be at least 8 characters long" })
        // .max(16, { message: "Username must be at most 16 characters long" })
        // .regex(/^[a-zA-Z0-9_]+$/, {
        //   message:
        //     "Username can only contain letters, numbers, and underscores",
        // }),
        password: z.string().min(1, { message: "Password is required" }),
        // .min(1, { message: "Password must be at least 8 characters long" })
        // .max(16, { message: "Password must be at most 16 characters long" })
        // .regex(/[A-Z]/, {
        //   message: "Password must contain at least one uppercase letter",
        // })
        // .regex(/[0-9]/, {
        //   message: "Password must contain at least one number",
        // })
        // .regex(/[^a-zA-Z0-9]/, {
        //   message: "Password must contain at least one special character",
        // }),
      })
    ),
  });

  const { mutate: onLogin, data: loginData, isPending } = useLogin();

  const onLoginPress = async (data: LoginForm) => {
    try {
      await onLogin({
        username: data.username?.toLowerCase(),
        password: data.password,
      });

      if (!loginData) {
        throw new Error("Login failed");
      }

      console.log(loginData);

      await AsyncStorage.setItem("user", JSON.stringify(loginData));

      signInToAuthProvider({
        username: loginData?.username,
        id: loginData?.id,
      });
    } catch (error) {
      // show notification...
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <TextInputField
          name="username"
          label="Username"
          placeholder="Username"
        />
        <TextInputField
          name="password"
          label="Password"
          placeholder="Password"
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={form.handleSubmit(onLoginPress)}
          disabled={isPending}
        >
          <Text variant="bodyMedium" style={{ color: "white" }}>
            Login
          </Text>
        </Button>
      </FormProvider>

      <Button
        mode="text"
        onPress={() => router.push("/(auth)/signup")}
        disabled={isPending}
      >
        <Text variant="bodyMedium" style={{ color: "#05BFDB" }}>
          Sign up
        </Text>
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
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
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
