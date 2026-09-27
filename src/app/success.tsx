import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";

export default function SuccessScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Plant Logo Badge with Checkmark Overlay */}
        <View style={styles.badgeWrapper}>
          <View style={styles.logoBadge}>
            <Svg height="42" width="42" viewBox="0 0 24 24" fill="#283618">
              <Path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.5,17 5,17C6.5,17 8,15.5 8,13.5C8,11.5 6.5,9.5 5,9C8.5,8.25 14.5,8 17,8Z" />
            </Svg>
          </View>
          <View style={styles.checkBadge}>
            <Svg
              height="14"
              width="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
            >
              <Path d="M20 6L9 17l-5-5" />
            </Svg>
          </View>
        </View>

        {/* Text Details */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Account Created!</Text>
          <Text style={styles.subtitle}>
            Welcome to Plant Care &amp; Watering Scheduler.
          </Text>
          <Text style={styles.nameText}>Hello, Shera!</Text>
        </View>

        {/* Continue Button -> Navigates to Home */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={() => router.replace("/home")}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


//Style for success screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFE9",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  badgeWrapper: {
    position: "relative",
    marginBottom: 32,
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D2E0CE",
    borderWidth: 1.5,
    borderColor: "#B5C9AC",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3A5A40",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#EAEFE9",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: "#588157",
    marginBottom: 6,
    textAlign: "center",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#283618",
  },
  buttonContainer: {
    width: "100%",
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#283618",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
