import { StyleSheet, View } from "react-native";
import { useAuth } from "@/context/auth";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Text } from "react-native-paper";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputField from "@/components/form/TextInput";
import { router } from "expo-router";
import { useSignup } from "@/hooks/useSignup";

interface SignupForm {
  username: string;
  password: string;
  password_confirm: string;
}

export default function Login() {
  const { signIn: signInToAuthProvider } = useAuth();

  const form = useForm<SignupForm>({
    defaultValues: {
      username: "",
      password: "",
      password_confirm: "",
    },
    resolver: zodResolver(
      z
        .object({
          username: z
            .string()
            .min(1, { message: "Username is required" })
            .min(1, { message: "Username must be at least 8 characters long" })
            .max(16, { message: "Username must be at most 16 characters long" })
            .regex(/^[a-zA-Z0-9_]+$/, {
              message:
                "Username can only contain letters, numbers, and underscores",
            }),
          password: z
            .string()
            .min(1, { message: "Password is required" })
            .max(16, { message: "Password must be at most 16 characters long" })
            .regex(/^[a-zA-Z0-9_]+$/, {
              message:
                "Username can only contain letters, numbers, and underscores",
            }),
          password_confirm: z
            .string()
            .min(1, { message: "Password confirmation is required" }),
        })
        .refine((data) => data.password === data.password_confirm, {
          message: "Passwords do not match",
          path: ["password_confirm"],
        })
    ),
  });

  const { mutate: onSignup, data: signupData, isPending } = useSignup();

  const onSignupPress = async (data: SignupForm) => {
    try {
      await onSignup({
        username: data.username?.toLowerCase(),
        password: data.password,
      });

      router.push("/(auth)/login");
    } catch (error) {
      // show notification...
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Get started</Text>
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

        <TextInputField
          name="password_confirm"
          label="Confirm password"
          placeholder="Confirm password"
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={form.handleSubmit(onSignupPress)}
          disabled={isPending}
        >
          <Text variant="bodyMedium" style={{ color: "white" }}>
            Sign up
          </Text>
        </Button>
      </FormProvider>

      <Button
        mode="text"
        onPress={() => router.push("/(auth)/login")}
        disabled={isPending}
      >
        <Text variant="bodyMedium" style={{ color: "#05BFDB" }}>
          Login
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
