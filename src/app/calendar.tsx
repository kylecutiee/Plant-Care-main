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
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BottomNav from "@/components/BottomNav"; // Reusable SVG bottom navigation

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<number | null>(22);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const availablePlants = [
    { name: "Snake Plant", color: "#283618" },
    { name: "Peace Lily", color: "#10B981" },
    { name: "Aloe Vera", color: "#F59E0B" },
  ];
  const [selectedPlantName, setSelectedPlantName] = useState("Snake Plant");
  const [newPlantDate, setNewPlantDate] = useState("24");
  const [newPlantInterval, setNewPlantInterval] = useState("7");
  const [schedules, setSchedules] = useState<Record<number, any[]>>({
    19: [
      {
        id: "p1",
        name: "Peace Lily",
        color: "#10B981",
        interval: "3 days",
        lastWatered: "Sep 16, 2026",
      },
    ],
    22: [
      {
        id: "p1",
        name: "Peace Lily",
        color: "#10B981",
        interval: "3 days",
        lastWatered: "Sep 19, 2026",
      },
      {
        id: "p2",
        name: "Aloe Vera",
        color: "#F59E0B",
        interval: "10 days",
        lastWatered: "Sep 12, 2026",
      },
    ],
    23: [
      {
        id: "p3",
        name: "Snake Plant",
        color: "#283618",
        interval: "7 days",
        lastWatered: "Sep 16, 2026",
      },
    ],
    25: [
      {
        id: "p1",
        name: "Peace Lily",
        color: "#10B981",
        interval: "3 days",
        lastWatered: "Sep 22, 2026",
      },
    ],
    28: [
      {
        id: "p1",
        name: "Peace Lily",
        color: "#10B981",
        interval: "3 days",
        lastWatered: "Sep 25, 2026",
      },
    ],
    30: [
      {
        id: "p3",
        name: "Snake Plant",
        color: "#283618",
        interval: "7 days",
        lastWatered: "Sep 23, 2026",
      },
    ],
  });

  const calendarWeeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, null, null, null],
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayPress = (date: number) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const handleMarkAsWatered = (day: number, plantId: string) => {
    setSchedules((prev) => {
      const dayPlants = prev[day] || [];
      const updated = dayPlants.filter((p) => p.id !== plantId);
      return { ...prev, [day]: updated };
    });
  };

  const handleMarkAllAsWatered = (day: number) => {
    setSchedules((prev) => ({ ...prev, [day]: [] }));
  };

  // Add new schedule handler using the selected dropdown option
  const handleAddNewSchedule = () => {
    const targetDay = parseInt(newPlantDate) || 24;
    const intervalDays = parseInt(newPlantInterval) || 7;

    const matchedPlant =
      availablePlants.find((p) => p.name === selectedPlantName) ||
      availablePlants[0];

    const newEntry = {
      id: Date.now().toString(),
      name: matchedPlant.name,
      color: matchedPlant.color,
      interval: `${intervalDays} days`,
      lastWatered: `Sep ${Math.max(1, targetDay - intervalDays)}, 2026`,
    };

    setSchedules((prev) => {
      const existing = prev[targetDay] || [];
      return { ...prev, [targetDay]: [...existing, newEntry] };
    });

    setAddModalVisible(false);
  };

  const activeDayPlants = selectedDate ? schedules[selectedDate] || [] : [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title & Add Schedule Action Button */}
        <View style={styles.headerRowContainer}>
          <Text style={styles.screenHeaderTitle}>Watering Calendar</Text>
          <TouchableOpacity
            style={styles.addScheduleButton}
            activeOpacity={0.8}
            onPress={() => setAddModalVisible(true)}
          >
            <Text style={styles.addScheduleButtonText}>+ Add Schedule</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Card Container */}
        <View style={styles.calendarCard}>
          {/* Month Header Switcher */}
          <View style={styles.monthHeaderRow}>
            <TouchableOpacity>
              <Text style={styles.monthArrow}>&lt;</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>September 2026</Text>
            <TouchableOpacity>
              <Text style={styles.monthArrow}>&gt;</Text>
            </TouchableOpacity>
          </View>

          {/* Days of the Week Header Labels */}
          <View style={styles.weekDaysRow}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDayLabel}>
                {day}
              </Text>
            ))}
          </View>

          {/* Date Grid Rows */}
          {calendarWeeks.map((week, rowIndex) => (
            <View key={rowIndex} style={styles.weekRow}>
              {week.map((date, colIndex) => {
                if (date === null) {
                  return <View key={colIndex} style={styles.dayCell} />;
                }
                const isSelected = date === selectedDate;
                const dayPlants = schedules[date] || [];

                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={[
                      styles.dayCell,
                      isSelected && styles.selectedDayCell,
                    ]}
                    onPress={() => handleDayPress(date)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.selectedDayText,
                      ]}
                    >
                      {date}
                    </Text>
                    {/* Plant Indicator Dots */}
                    <View style={styles.dotsRow}>
                      {dayPlants.map((plant, pIdx) => (
                        <View
                          key={pIdx}
                          style={[styles.dot, { backgroundColor: plant.color }]}
                        />
                      ))}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Legend Section Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Legend</Text>
          <View style={styles.legendRow}>
            <View style={[styles.dotLegend, { backgroundColor: "#283618" }]} />
            <Text style={styles.legendText}>Snake Plant (7 days)</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.dotLegend, { backgroundColor: "#10B981" }]} />
            <Text style={styles.legendText}>Peace Lily (3 days)</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.dotLegend, { backgroundColor: "#F59E0B" }]} />
            <Text style={styles.legendText}>Aloe Vera (10 days)</Text>
          </View>
        </View>

        {/* Upcoming Waterings Section Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Upcoming Waterings</Text>
          {Object.entries(schedules).map(([dayStr, plants]) => {
            const dayNum = Number(dayStr);
            if (plants.length === 0) return null;
            return plants.map((plant, idx) => (
              <TouchableOpacity
                key={`${dayStr}-${idx}`}
                style={styles.upcomingRow}
                onPress={() => handleDayPress(dayNum)}
              >
                <Text style={styles.upcomingDateText}>Sep {dayNum}</Text>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: plant.color, marginRight: 8 },
                  ]}
                />
                <Text style={styles.upcomingPlantName}>{plant.name}</Text>
              </TouchableOpacity>
            ));
          })}
        </View>
      </ScrollView>

      {/* WATERING MODAL (Day view) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>
                September {selectedDate}, 2026
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {activeDayPlants.length === 0 ? (
                <View style={styles.emptyModalContainer}>
                  <View style={styles.modalLeafBadge}>
                    <Svg
                      height="36"
                      width="36"
                      viewBox="0 0 24 24"
                      fill="#283618"
                    >
                      <Path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.5,17 5,17C6.5,17 8,15.5 8,13.5C8,11.5 6.5,9.5 5,9C8.5,8.25 14.5,8 17,8Z" />
                    </Svg>
                  </View>
                  <Text style={styles.emptyModalTitle}>
                    No watering scheduled for this day.
                  </Text>
                  <Text style={styles.emptyModalSub}>
                    Your plants don't need watering today.
                  </Text>
                </View>
              ) : (
                activeDayPlants.map((plant) => (
                  <View key={plant.id} style={styles.modalPlantCard}>
                    <View style={styles.modalCardHeader}>
                      <Text style={styles.modalPlantName}>🌱 {plant.name}</Text>
                    </View>
                    <Text style={styles.modalPlantDetail}>
                      Watering scheduled today.
                    </Text>
                    <Text style={styles.modalPlantDetail}>
                      Last watered: {plant.lastWatered}
                    </Text>
                    <Text style={styles.modalPlantDetail}>
                      Watering interval: {plant.interval}
                    </Text>

                    <TouchableOpacity
                      style={styles.markWateredButton}
                      onPress={() =>
                        handleMarkAsWatered(selectedDate!, plant.id)
                      }
                    >
                      <Text style={styles.markWateredButtonText}>
                        💧 Mark as Watered
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}

              {activeDayPlants.length > 0 && (
                <TouchableOpacity
                  style={styles.markAllButton}
                  onPress={() => handleMarkAllAsWatered(selectedDate!)}
                >
                  <Text style={styles.markAllButtonText}>
                    Mark All as Watered
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ADD SCHEDULE MODAL (WITH PLANT DROPDOWN) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>Set Watering Schedule</Text>
              <TouchableOpacity onPress={() => setAddModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Select Available Plant</Text>
            {/* Dummy Dropdown Buttons Row */}
            <View style={styles.dropdownRow}>
              {availablePlants.map((plant) => {
                const isSelected = selectedPlantName === plant.name;
                return (
                  <TouchableOpacity
                    key={plant.name}
                    style={[
                      styles.dropdownOption,
                      isSelected && styles.selectedDropdownOption,
                    ]}
                    onPress={() => setSelectedPlantName(plant.name)}
                  >
                    <Text
                      style={[
                        styles.dropdownOptionText,
                        isSelected && styles.selectedDropdownOptionText,
                      ]}
                    >
                      {plant.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.inputLabel}>Day of Month (September 2026)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., 24"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={newPlantDate}
              onChangeText={setNewPlantDate}
            />

            <Text style={styles.inputLabel}>
              Watering Interval (Every X Days)
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., 3, 7, 10"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={newPlantInterval}
              onChangeText={setNewPlantInterval}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddNewSchedule}
            >
              <Text style={styles.saveButtonText}>Save Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.closeModalButton, { marginTop: 10 }]}
              onPress={() => setAddModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Reusable SVG Bottom Navigation Bar */}
      <BottomNav />
    </SafeAreaView>
  );
}

// Style for Calendar Screen 

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAEFE9" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  headerRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  screenHeaderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#283618",
  },
  addScheduleButton: {
    backgroundColor: "#283618",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addScheduleButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  monthHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  monthArrow: { fontSize: 18, fontWeight: "bold", color: "#3A5A40" },
  monthTitle: { fontSize: 16, fontWeight: "bold", color: "#283618" },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDayLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#588157",
    width: 36,
    textAlign: "center",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayCell: {
    width: 38,
    height: 42,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 12,
    paddingTop: 4,
  },
  selectedDayCell: {
    borderWidth: 1.5,
    borderColor: "#3A5A40",
    backgroundColor: "#F3F7F2",
  },
  dayText: { fontSize: 13, fontWeight: "600", color: "#283618" },
  selectedDayText: { fontWeight: "bold", color: "#283618" },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
    marginTop: 4,
  },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 10,
  },
  legendRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  dotLegend: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  legendText: { fontSize: 13, color: "#588157", fontWeight: "500" },
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F0",
  },
  upcomingDateText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#283618",
    width: 65,
  },
  upcomingPlantName: { fontSize: 13, color: "#588157", fontWeight: "600" },

  // Modal Styles
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
    maxHeight: "85%",
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalHeaderTitle: { fontSize: 18, fontWeight: "bold", color: "#283618" },
  closeIcon: { fontSize: 18, color: "#879879", fontWeight: "bold" },
  emptyModalContainer: { alignItems: "center", paddingVertical: 30 },
  modalLeafBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EAEFE9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  emptyModalTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 4,
    textAlign: "center",
  },
  emptyModalSub: { fontSize: 12, color: "#588157", textAlign: "center" },
  modalPlantCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  modalCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  modalPlantName: { fontSize: 16, fontWeight: "bold", color: "#283618" },
  modalPlantDetail: { fontSize: 12, color: "#588157", marginBottom: 2 },
  markWateredButton: {
    backgroundColor: "#283618",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  markWateredButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "bold" },
  markAllButton: {
    backgroundColor: "#3A5A40",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },
  markAllButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  closeModalButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  closeModalButtonText: { color: "#283618", fontSize: 14, fontWeight: "bold" },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3A5A40",
    marginBottom: 6,
  },
  dropdownRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  dropdownOption: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#F3F7F2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    alignItems: "center",
  },
  selectedDropdownOption: {
    backgroundColor: "#283618",
    borderColor: "#283618",
  },
  dropdownOptionText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#3A5A40",
  },
  selectedDropdownOptionText: {
    color: "#FFFFFF",
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
  saveButton: {
    backgroundColor: "#283618",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
});
