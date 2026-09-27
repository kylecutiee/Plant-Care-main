import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import BottomNav from "@/components/BottomNav";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [diaryNote, setDiaryNote] = useState("");
  const [wateringInterval, setWateringInterval] = useState("3");
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [plantsList, setPlantsList] = useState([
    {
      id: "1",
      name: "Snake Plant",
      status: "Healthy",
      waterSchedule: "Every 7 days",
      intervalDays: 7,
      note: "My snake plant is growing well! New leaves are coming out.",
      image:
        "https://images.unsplash.com/photo-1599593915997-6f8d39e2467d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      name: "Peace Lily",
      status: "Healthy",
      waterSchedule: "Every 3 days",
      intervalDays: 3,
      note: "Blooming nicely with regular watering.",
      image:
        "https://images.unsplash.com/photo-1593482834249-f0896082987a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      name: "Aloe Vera",
      status: "Healthy",
      waterSchedule: "Every 10 days",
      intervalDays: 10,
      note: "Looking healthy and holding moisture well.",
      image:
        "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  const handleAddPlant = () => {
    if (plantName.trim() === "") return;
    const intervalNum = parseInt(wateringInterval) || 3;
    setPlantsList([
      ...plantsList,
      {
        id: Date.now().toString(),
        name: plantName,
        status: "Healthy",
        waterSchedule: `Every ${intervalNum} days`,
        intervalDays: intervalNum,
        note: diaryNote || "New plant added with watering schedule.",
        image:
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      },
    ]);
    setPlantName("");
    setDiaryNote("");
    setWateringInterval("3");
    setModalVisible(false);
  };

  const handleOpenPlantDetails = (plant: any) => {
    setSelectedPlant(plant);
    setDetailModalVisible(true);
  };
  const upcomingWaterings = [
    { name: "Peace Lily", date: "Sep 22", color: "#10B981" },
    { name: "Aloe Vera", date: "Sep 22", color: "#F59E0B" },
    { name: "Snake Plant", date: "Sep 23", color: "#283618" },
    { name: "Peace Lily", date: "Sep 25", color: "#10B981" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Dark Green Header Section */}
        <View style={styles.headerCard}>
          <View style={styles.headerTopRow}>
            <View>
              <Text style={styles.greetingText}>GOOD AFTERNOON</Text>
              <Text style={styles.nameText}>Shun!</Text>
            </View>
            <TouchableOpacity
              style={styles.profileIconButton}
              onPress={() => router.push("/profile")}
            >
              <Svg
                height="20"
                width="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
              >
                <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <Circle cx="12" cy="7" r="4" />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Metric Cards Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <View style={styles.metricHeaderRow}>
                <Svg height="12" width="12" viewBox="0 0 24 24" fill="#A3B19B">
                  <Path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.5,17 5,17C6.5,17 8,15.5 8,13.5C8,11.5 6.5,9.5 5,9C8.5,8.25 14.5,8 17,8Z" />
                </Svg>
                <Text style={styles.metricLabel}> PLANTS</Text>
              </View>
              <Text style={styles.metricValue}>{plantsList.length}</Text>
            </View>

            <View style={styles.metricBox}>
              <View style={styles.metricHeaderRow}>
                <Svg
                  height="12"
                  width="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A3B19B"
                  strokeWidth="3"
                >
                  <Path d="M20 6L9 17l-5-5" />
                </Svg>
                <Text style={styles.metricLabel}> HEALTHY</Text>
              </View>
              <Text style={styles.metricValue}>{plantsList.length}</Text>
            </View>

            <View style={styles.metricBox}>
              <View style={styles.metricHeaderRow}>
                <Svg height="12" width="12" viewBox="0 0 24 24" fill="#A3B19B">
                  <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </Svg>
                <Text style={styles.metricLabel}> NEXT DAY</Text>
              </View>
              <Text style={styles.metricValue}>22</Text>
            </View>
          </View>
        </View>

        {/* This Week Calendar Row Widget */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <Text style={styles.dateBadgeText}>Sep 2026</Text>
          </View>
          <View style={styles.calendarCard}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => {
                const dateNum = 20 + index;
                const isSelected = index === 0;
                const hasDotTue = index === 2;
                const hasDotWed = index === 3; 
                const hasDotFri = index === 5;

                return (
                  <View
                    key={day}
                    style={[
                      styles.dayColumn,
                      isSelected && styles.selectedDayColumn,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayLabel,
                        isSelected && styles.selectedDayLabel,
                      ]}
                    >
                      {day}
                    </Text>
                    <Text
                      style={[
                        styles.dayNumber,
                        isSelected && styles.selectedDayNumber,
                      ]}
                    >
                      {dateNum}
                    </Text>
                    <View style={styles.dotsRow}>
                      {hasDotTue && (
                        <>
                          <View
                            style={[styles.dot, { backgroundColor: "#10B981" }]}
                          />
                          <View
                            style={[styles.dot, { backgroundColor: "#F59E0B" }]}
                          />
                        </>
                      )}
                      {hasDotWed && (
                        <View
                          style={[styles.dot, { backgroundColor: "#283618" }]}
                        />
                      )}
                      {hasDotFri && (
                        <View
                          style={[styles.dot, { backgroundColor: "#10B981" }]}
                        />
                      )}
                    </View>
                  </View>
                );
              },
            )}
          </View>
        </View>

        {/* Upcoming Waterings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Waterings</Text>
          <View style={styles.upcomingCardContainer}>
            {upcomingWaterings.map((item, index) => (
              <View key={index} style={styles.upcomingRow}>
                <Image
                  source={{
                    uri:
                      index % 2 === 0
                        ? plantsList[0].image
                        : plantsList[1].image,
                  }}
                  style={styles.upcomingThumb}
                />
                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingName}>{item.name}</Text>
                  <Text style={styles.upcomingInterval}>Watering Schedule</Text>
                </View>
                <View style={styles.datePill}>
                  <Text style={styles.datePillText}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* My Plants Section (Clickable Cards) */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>My Plants</Text>
            <Text style={styles.countText}>{plantsList.length} plants</Text>
          </View>

          {plantsList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.plantItemCard}
              activeOpacity={0.8}
              onPress={() => handleOpenPlantDetails(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.plantThumbnail}
              />
              <View style={styles.plantDetails}>
                <Text style={styles.plantItemName}>{item.name}</Text>
                <View style={styles.badgeLine}>
                  <Svg
                    height="10"
                    width="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    style={{ marginRight: 4 }}
                  >
                    <Path d="M20 6L9 17l-5-5" />
                  </Svg>
                  <Text style={styles.plantStatusText}>{item.status}</Text>
                </View>
                <View style={styles.badgeLine}>
                  <Svg
                    height="10"
                    width="10"
                    viewBox="0 0 24 24"
                    fill="#588157"
                    style={{ marginRight: 4 }}
                  >
                    <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </Svg>
                  <Text style={styles.plantWaterText}>
                    {item.waterSchedule}
                  </Text>
                </View>
              </View>
              <Svg
                height="16"
                width="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A3B19B"
                strokeWidth="2.5"
              >
                <Path d="M9 18l6-6-6-6" />
              </Svg>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button (+) */}
      <TouchableOpacity
        style={styles.fabButton}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        >
          <Path d="M12 5v14M5 12h14" />
        </Svg>
      </TouchableOpacity>

      {/* Reusable SVG Bottom Navigation Component */}
      <BottomNav />

      {/* ADD PLANT MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Plant</Text>

            <TouchableOpacity style={styles.modalUploadBox}>
              <View style={{ marginBottom: 6 }}>
                <Svg
                  height="20"
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#588157"
                  strokeWidth="2"
                >
                  <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <Circle cx="12" cy="13" r="4" />
                </Svg>
              </View>
              <Text style={styles.uploadBoxText}>Add Photo of Plant</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Plant Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., Monstera, Aloe Vera"
              placeholderTextColor="#999"
              value={plantName}
              onChangeText={setPlantName}
            />

            <Text style={styles.inputLabel}>
              Watering Schedule (Every X Days)
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., 3, 7, 10"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={wateringInterval}
              onChangeText={setWateringInterval}
            />

            <Text style={styles.inputLabel}>Diary Note</Text>
            <TextInput
              style={[
                styles.modalInput,
                { height: 70, textAlignVertical: "top" },
              ]}
              placeholder="Write plant care notes..."
              placeholderTextColor="#999"
              multiline
              value={diaryNote}
              onChangeText={setDiaryNote}
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddPlant}
              >
                <Text style={styles.saveButtonText}>Save Plant</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* VIEW PLANT DETAILS MODAL (VIEW ONLY) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>Plant Information</Text>
              <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedPlant && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={{ uri: selectedPlant.image }}
                  style={styles.detailModalImage}
                />
                <Text style={styles.detailPlantName}>{selectedPlant.name}</Text>
                <View style={styles.statusBadgeRow}>
                  <View style={styles.badgeLinePill}>
                    <Svg
                      height="11"
                      width="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3"
                      style={{ marginRight: 4 }}
                    >
                      <Path d="M20 6L9 17l-5-5" />
                    </Svg>
                    <Text style={styles.detailStatus}>
                      {selectedPlant.status}
                    </Text>
                  </View>
                  <View style={styles.badgeLinePillDark}>
                    <Svg
                      height="11"
                      width="11"
                      viewBox="0 0 24 24"
                      fill="#3A5A40"
                      style={{ marginRight: 4 }}
                    >
                      <Path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </Svg>
                    <Text style={styles.detailWater}>
                      {selectedPlant.waterSchedule}
                    </Text>
                  </View>
                </View>
                <Text style={styles.detailSectionLabel}>
                  Care Notes &amp; Diary
                </Text>
                <View style={styles.detailNoteCard}>
                  <Text style={styles.detailNoteText}>
                    {selectedPlant.note}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.closeDetailButton}
                  onPress={() => setDetailModalVisible(false)}
                >
                  <Text style={styles.closeDetailButtonText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Style for home screen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAEFE9" },
  scrollContent: { paddingBottom: 100 },
  headerCard: {
    backgroundColor: "#283618",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 11,
    color: "#A3B19B",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  nameText: { fontSize: 24, fontWeight: "bold", color: "#FFFFFF" },
  profileIconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  metricBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 12,
  },
  metricHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 10,
    color: "#A3B19B",
    fontWeight: "bold",
  },
  metricValue: { fontSize: 20, fontWeight: "bold", color: "#FFFFFF" },
  sectionContainer: { paddingHorizontal: 20, marginTop: 20 },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#283618" },
  dateBadgeText: { fontSize: 12, color: "#588157", fontWeight: "600" },
  countText: { fontSize: 12, color: "#588157", fontWeight: "600" },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dayColumn: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  selectedDayColumn: { backgroundColor: "#283618" },
  dayLabel: {
    fontSize: 10,
    color: "#879879",
    marginBottom: 4,
    fontWeight: "600",
  },
  selectedDayLabel: { color: "#A3B19B" },
  dayNumber: { fontSize: 13, fontWeight: "bold", color: "#283618" },
  selectedDayNumber: { color: "#FFFFFF" },
  dotsRow: { flexDirection: "row", gap: 2, marginTop: 4 },
  dot: { width: 4, height: 4, borderRadius: 2 },

  upcomingCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F7F2",
  },
  upcomingThumb: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#EAEFE9",
    marginRight: 12,
  },
  upcomingInfo: { flex: 1 },
  upcomingName: { fontSize: 14, fontWeight: "bold", color: "#283618" },
  upcomingInterval: { fontSize: 11, color: "#879879" },
  datePill: {
    backgroundColor: "#EAEFE9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  datePillText: { fontSize: 11, fontWeight: "bold", color: "#3A5A40" },

  plantItemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  plantThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#EAEFE9",
    marginRight: 14,
  },
  plantDetails: { flex: 1 },
  plantItemName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 3,
  },
  badgeLine: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  plantStatusText: { fontSize: 12, color: "#10B981", fontWeight: "600" },
  plantWaterText: { fontSize: 12, color: "#588157" },

  fabButton: {
    position: "absolute",
    right: 24,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#283618",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: "85%",
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
  },
  closeIcon: { fontSize: 18, color: "#879879", fontWeight: "bold" },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 20,
    textAlign: "center",
  },
  modalUploadBox: {
    height: 80,
    borderWidth: 1.5,
    borderColor: "#B5C9AC",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F7F2",
    marginBottom: 14,
  },
  uploadBoxText: { fontSize: 13, fontWeight: "600", color: "#588157" },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3A5A40",
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#283618",
    marginBottom: 12,
  },
  modalButtonsRow: { flexDirection: "row", gap: 12, marginTop: 6 },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F1F5F0",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: { color: "#588157", fontWeight: "bold", fontSize: 14 },
  saveButton: {
    flex: 1,
    backgroundColor: "#283618",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },

  // Detail Modal specific styles
  detailModalImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#EAEFE9",
  },
  detailPlantName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 6,
  },
  statusBadgeRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  badgeLinePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2EFE0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeLinePillDark: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEFE9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  detailStatus: { fontSize: 13, fontWeight: "600", color: "#10B981" },
  detailWater: { fontSize: 13, fontWeight: "600", color: "#3A5A40" },
  detailSectionLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3A5A40",
    marginBottom: 6,
  },
  detailNoteCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  detailNoteText: { fontSize: 13, color: "#588157", lineHeight: 18 },
  closeDetailButton: {
    backgroundColor: "#283618",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  closeDetailButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
});
