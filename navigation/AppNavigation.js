import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

export default function AppNavigation() {
  const [screen, setScreen] = useState("Login");

  function navigate(screenName) {
    setScreen(screenName);
  }

  return (
    <View style={styles.container}>
      {screen === "Login" && <LoginScreen navigate={navigate} />}
      {screen === "Home" && <HomeScreen navigate={navigate} />}
      {screen === "Profile" && <ProfileScreen navigate={navigate} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
