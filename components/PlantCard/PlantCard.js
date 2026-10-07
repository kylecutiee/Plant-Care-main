import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlantCard({ name, waterEvery }) {
  return (
    <View style={styles.card}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>🌿</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.schedule}>
          Water every {waterEvery} days
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D4DECF",
  },

  icon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#D2E0CE",
    justifyContent: "center",
    alignItems: "center",
  },

  iconText: {
    fontSize: 23,
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#283618",
  },

  schedule: {
    marginTop: 4,
    color: "#879879",
  },
});
