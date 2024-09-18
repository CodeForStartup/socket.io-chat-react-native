import { Controller, useFormContext } from "react-hook-form";
import { TextInput as RNTextInput, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  name: string;
}

export default function TextInputField({
  name,
  label,
  placeholder,
  secureTextEntry = false,
}: TextInputProps) {
  const { control, formState } = useFormContext();

  if (!control) {
    throw new Error("TextInput must be used within a FormProvider");
  }

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="labelMedium" theme={{ colors: { text: "grey" } }}>
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <RNTextInput
            style={styles.textInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
          />
        )}
      />
      {formState.errors[name] && (
        <Text variant="labelSmall" style={{ color: "red" }}>
          {formState.errors[name]?.message as string}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  textInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
});
