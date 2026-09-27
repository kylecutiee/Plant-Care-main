import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>&lt;</Text>
          </TouchableOpacity>

          {/* Plant Icon Badge */}
          <View style={styles.logoBadge}>
            <Svg height="36" width="36" viewBox="0 0 24 24" fill="#283618">
              <Path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.5,17 5,17C6.5,17 8,15.5 8,13.5C8,11.5 6.5,9.5 5,9C8.5,8.25 14.5,8 17,8Z" />
            </Svg>
          </View>

          {/* Heading */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Sign in to continue caring for your plants.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#A3B19B"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#A3B19B"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIconContainer}
              >
                <Svg
                  height="20"
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#588157"
                  strokeWidth="2"
                >
                  <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <Circle cx="12" cy="12" r="3" />
                </Svg>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.8}
              onPress={() => router.push("/home")}
            >
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            {/* Google Button */}
            <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
              <Text style={styles.googleButtonText}>
                🌐 Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Footer switch */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.linkText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


//Style for login screen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAEFE9" },
  scrollContainer: { paddingHorizontal: 24, paddingVertical: 20 },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    marginBottom: 10,
  },
  backIcon: { fontSize: 24, fontWeight: "bold", color: "#283618" },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#D2E0CE",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  headerContainer: { alignItems: "center", marginBottom: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 6,
  },
  subtitle: { fontSize: 13, color: "#588157" },
  formContainer: { width: "100%" },
  label: { fontSize: 13, fontWeight: "600", color: "#3A5A40", marginBottom: 6 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: "#283618",
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: "#283618",
  },
  eyeIconContainer: { padding: 4 },
  forgotContainer: { alignItems: "flex-start", marginBottom: 20 },
  forgotText: { fontSize: 13, color: "#588157", fontWeight: "500" },
  primaryButton: {
    backgroundColor: "#283618",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "bold" },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  line: { flex: 1, height: 1, backgroundColor: "#D4DECFC0" },
  orText: { marginHorizontal: 12, fontSize: 13, color: "#879879" },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  googleButtonText: { color: "#283618", fontSize: 14, fontWeight: "600" },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: { fontSize: 13, color: "#606C38" },
  linkText: { fontSize: 13, color: "#283618", fontWeight: "bold" },
});
