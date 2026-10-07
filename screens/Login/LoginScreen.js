import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import TextInputField from "../../components/TextInputField/TextInputField";
import CustomButton from "../../components/Button/CustomButton";

export default function LoginScreen({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌿</Text>

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Sign in to continue caring for your plants.
      </Text>

      <TextInputField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <CustomButton
        title="Sign In"
        onPress={() => navigate("Home")}
      />

      <CustomButton
        title="Create Account"
        onPress={() => navigate("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFE9",

    // FLEXBOX
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    fontSize: 50,
    textAlign: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#283618",
    textAlign: "center",
  },

  subtitle: {
    color: "#588157",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 8,
  },
});
