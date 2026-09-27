import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BottomNav from "@/components/BottomNav"; // Reusable SVG bottom navigation

export default function DiaryScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: "1",
      title: "Snake Plant",
      date: "Sep 16, 2026",
      note: "My snake plant is growing well! New leaves are coming out.",
      image:
        "https://images.unsplash.com/photo-1599593915997-6f8d39e2467d?auto=format&fit=crop&w=600&q=80",
      status: "Healthy",
    },
    {
      id: "2",
      title: "Peace Lily",
      date: "Sep 14, 2026",
      note: "Blooming nicely!",
      image:
        "https://images.unsplash.com/photo-1593482834249-f0896082987a?auto=format&fit=crop&w=600&q=80",
      status: "Healthy",
    },
    {
      id: "3",
      title: "Aloe Vera",
      date: "Sep 12, 2026",
      note: "Looking healthy!",
      image:
        "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80",
      status: "Healthy",
    },
  ]);

  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editNote, setEditNote] = useState("");

  const handleOpenModal = (entry: any) => {
    setSelectedEntry(entry);
    setEditTitle(entry.title);
    setEditNote(entry.note);
    setIsEditing(false);
    setDeleteConfirmVisible(false);
    setModalVisible(true);
  };

  const handleSaveChanges = () => {
    setDiaryEntries(
      diaryEntries.map((item) =>
        item.id === selectedEntry.id
          ? { ...item, title: editTitle, note: editNote }
          : item,
      ),
    );
    setModalVisible(false);
  };

  const confirmDeleteEntry = () => {
    setDiaryEntries(
      diaryEntries.filter((item) => item.id !== selectedEntry.id),
    );
    setDeleteConfirmVisible(false);
    setModalVisible(false);
  };

  // Filter entries based on search input
  const filteredEntries = diaryEntries.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header Title */}
        <Text style={styles.screenHeaderTitle}>Visual Diary</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchIconWrapper}>
            <Svg
              height="16"
              width="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#588157"
              strokeWidth="2.5"
            >
              <Path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35" />
            </Svg>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search diary entries..."
            placeholderTextColor="#A3B19B"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Diary Cards List */}
        {filteredEntries.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.diaryCard}
            activeOpacity={0.8}
            onPress={() => handleOpenModal(item)}
          >
            <View style={styles.cardLeftContent}>
              <Image
                source={{ uri: item.image }}
                style={styles.plantThumbnail}
              />
              <View style={styles.cardTextContent}>
                <Text style={styles.plantTitle}>{item.title}</Text>
                <Text style={styles.plantDate}>{item.date}</Text>
                <Text style={styles.plantNote} numberOfLines={2}>
                  {item.note}
                </Text>
              </View>
            </View>

            {/* Small Leaf Badge Icon */}
            <View style={styles.cardLeafIcon}>
              <Svg height="18" width="18" viewBox="0 0 24 24" fill="#588157">
                <Path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.5,17 5,17C6.5,17 8,15.5 8,13.5C8,11.5 6.5,9.5 5,9C8.5,8.25 14.5,8 17,8Z" />
              </Svg>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* DIARY ENTRY MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* DELETE CONFIRMATION SUB-VIEW */}
            {deleteConfirmVisible ? (
              <View style={styles.confirmDeleteContainer}>
                <Text style={styles.confirmDeleteTitle}>Delete Entry?</Text>
                <Text style={styles.confirmDeleteText}>
                  Are you sure you want to delete this diary entry? This action
                  cannot be undone.
                </Text>

                <View style={styles.modalButtonsRow}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setDeleteConfirmVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.confirmDeleteButton}
                    onPress={confirmDeleteEntry}
                  >
                    <Text style={styles.confirmDeleteButtonText}>
                      Yes, Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                {/* Modal Header */}
                <View style={styles.modalHeaderRow}>
                  <Text style={styles.modalHeaderTitle}>Diary Entry</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>

                {selectedEntry && (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                  >
                    {/* Large Photo Display */}
                    <Image
                      source={{ uri: selectedEntry.image }}
                      style={styles.modalLargeImage}
                    />

                    {/* Title & Status Row */}
                    <View style={styles.modalTitleRow}>
                      {isEditing ? (
                        <TextInput
                          style={styles.editTitleInput}
                          value={editTitle}
                          onChangeText={setEditTitle}
                        />
                      ) : (
                        <Text style={styles.modalPlantTitle}>
                          {selectedEntry.title}
                        </Text>
                      )}

                      <View style={styles.statusBadge}>
                        <View style={styles.statusRowIcon}>
                          <Svg
                            height="10"
                            width="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3A5A40"
                            strokeWidth="3"
                            style={{ marginRight: 3 }}
                          >
                            <Path d="M20 6L9 17l-5-5" />
                          </Svg>
                          <Text style={styles.statusText}>
                            {selectedEntry.status}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Text style={styles.modalPlantDate}>
                      {selectedEntry.date}
                    </Text>

                    {/* Note Content / Edit Input */}
                    {isEditing ? (
                      <View style={{ marginTop: 10 }}>
                        <Text style={styles.inputLabel}>Edit Note:</Text>
                        <TextInput
                          style={styles.editNoteInput}
                          value={editNote}
                          onChangeText={setEditNote}
                          multiline
                        />
                        <TouchableOpacity
                          style={styles.saveChangesButton}
                          onPress={handleSaveChanges}
                        >
                          <Text style={styles.saveChangesText}>
                            Save Changes
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <Text style={styles.modalPlantNote}>
                        {selectedEntry.note}
                      </Text>
                    )}

                    {/* Action Buttons Row */}
                    {!isEditing && (
                      <View style={styles.modalButtonsRow}>
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => setIsEditing(true)}
                        >
                          <Text style={styles.editButtonText}>Edit Entry</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => setDeleteConfirmVisible(true)}
                        >
                          <Text style={styles.deleteButtonText}>
                            Delete Entry
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </ScrollView>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Reusable SVG Bottom Navigation Bar */}
      <BottomNav />
    </SafeAreaView>
  );
}

// Style for diary screen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAEFE9" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  screenHeaderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#283618",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D4DECFC0",
  },
  searchIconWrapper: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 14, color: "#283618" },
  diaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E8ECE6",
  },
  cardLeftContent: { flexDirection: "row", flex: 1 },
  plantThumbnail: {
    width: 76,
    height: 76,
    borderRadius: 12,
    backgroundColor: "#F3F7F2",
    marginRight: 14,
  },
  cardTextContent: { flex: 1, justifyContent: "center" },
  plantTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 2,
  },
  plantDate: {
    fontSize: 11,
    color: "#879879",
    fontWeight: "600",
    marginBottom: 6,
  },
  plantNote: { fontSize: 12, color: "#588157", lineHeight: 16 },
  cardLeafIcon: { position: "absolute", top: 16, right: 16 },

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
  modalLargeImage: {
    height: 200,
    width: "100%",
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#F3F7F2",
  },
  modalTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  modalPlantTitle: { fontSize: 20, fontWeight: "bold", color: "#283618" },
  statusBadge: {
    backgroundColor: "#E2EFE0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusRowIcon: { flexDirection: "row", alignItems: "center" },
  statusText: { fontSize: 11, fontWeight: "bold", color: "#3A5A40" },
  modalPlantDate: {
    fontSize: 12,
    color: "#879879",
    fontWeight: "600",
    marginBottom: 12,
  },
  modalPlantNote: {
    fontSize: 14,
    color: "#588157",
    lineHeight: 20,
    marginBottom: 24,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  editButtonText: { color: "#283618", fontWeight: "bold", fontSize: 14 },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FCA5A5",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  deleteButtonText: { color: "#EF4444", fontWeight: "bold", fontSize: 14 },

  // Delete Confirmation styles
  confirmDeleteContainer: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  confirmDeleteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 10,
    textAlign: "center",
  },
  confirmDeleteText: {
    fontSize: 13,
    color: "#588157",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },

  modalButtonsRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#F1F5F0",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#588157",
    fontWeight: "bold",
    fontSize: 14,
  },
  confirmDeleteButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmDeleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  // Edit mode styles
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3A5A40",
    marginBottom: 6,
  },
  editTitleInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283618",
    borderBottomWidth: 1,
    borderColor: "#D4DECFC0",
    flex: 1,
    marginRight: 10,
    paddingBottom: 2,
  },
  editNoteInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#D4DECFC0",
    borderRadius: 10,
    padding: 12,
    height: 80,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#283618",
    marginBottom: 16,
  },
  saveChangesButton: {
    backgroundColor: "#283618",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  saveChangesText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 14 },
});
