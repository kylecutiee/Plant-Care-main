import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import Header from "../../components/Header/Header";
import PlantCard from "../../components/PlantCard/PlantCard";
import CustomButton from "../../components/Button/CustomButton";

export default function HomeScreen({ navigate }) {
  const plants = [
    { name: "Snake Plant", waterEvery: 7 },
    { name: "Peace Lily", waterEvery: 3 },
    { name: "Aloe Vera", waterEvery: 10 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header title="Good Afternoon, Shun!" />

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{plants.length}</Text>
            <Text style={styles.statText}>Plants</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statText}>Healthy</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>22</Text>
            <Text style={styles.statText}>Next Day</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Plants</Text>

        {plants.map((plant) => (
          <PlantCard
            key={plant.name}
            name={plant.name}
            waterEvery={plant.waterEvery}
          />
        ))}

        <CustomButton
          title="Go to Profile"
          onPress={() => navigate("Profile")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEFE9",
  },

  content: {
    padding: 20,
    paddingTop: 60,
  },

  statsRow: {
    // FLEXBOX: horizontal row
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  statBox: {
    // FLEXBOX: each box shares the available width
    flex: 1,
    backgroundColor: "#283618",
    padding: 15,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: "center",
  },

  statNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  statText: {
    color: "#D2E0CE",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 12,
  },
});
