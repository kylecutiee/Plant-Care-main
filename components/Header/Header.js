import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Plant Care</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#283618",
  },

  subtitle: {
    marginTop: 5,
    color: "#588157",
  },
});
