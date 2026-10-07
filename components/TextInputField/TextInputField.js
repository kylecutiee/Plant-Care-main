import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function TextInputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3A5A40",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4DECF",
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
  },
});
