import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Header from "../../components/Header/Header";
import CustomButton from "../../components/Button/CustomButton";

export default function ProfileScreen({ navigate }) {
  return (
    <View style={styles.container}>
      <Header title="My Profile" />

      <View style={styles.profileBox}>
        <Text style={styles.avatar}>♙</Text>
        <Text style={styles.name}>Shun</Text>
        <Text style={styles.bio}>Plant lover</Text>
      </View>

      <CustomButton
        title="Back to Home"
        onPress={() => navigate("Home")}
      />

      <CustomButton
        title="Log Out"
        onPress={() => navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFE9",
    padding: 20,
    paddingTop: 60,
  },

  profileBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
  },

  avatar: {
    fontSize: 55,
    backgroundColor: "#D2E0CE",
    padding: 15,
    borderRadius: 60,
  },

  name: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#283618",
    marginTop: 10,
  },

  bio: {
    color: "#588157",
    marginTop: 5,
  },
});
