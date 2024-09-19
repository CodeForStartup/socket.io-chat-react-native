import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/auth";
import { useLogin } from "@/hooks/useLogin";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputField from "@/components/form/TextInput";
import { router } from "expo-router";
import { useEffect } from "react";

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
        password: z.string().min(1, { message: "Password is required" }),
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
    } catch (error) {
      // show notification...
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("login data result: ", loginData);

    if (!loginData) {
      // show notification...
      return;
    }

    AsyncStorage.setItem("user", JSON.stringify(loginData));

    signInToAuthProvider({
      username: loginData?.username,
      id: loginData?.id,
    });
  }, [loginData]);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Welcome back</Text>

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
    justifyContent: "center",
    gap: 16,
    width: "100%",
    paddingHorizontal: 32,
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
