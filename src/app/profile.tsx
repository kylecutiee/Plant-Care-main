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
import Svg, { Path,Circle } from "react-native-svg";
import BottomNav from "@/components/BottomNav";

export default function ProfileScreen() {
  const [name, setName] = useState("Shun");
  const [bio, setBio] = useState("Plant lover");
  const memberSince = "September 2026";
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempBio, setTempBio] = useState(bio);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSaveProfile = () => {
    setName(tempName);
    setBio(tempBio);
    setEditModalVisible(false);
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    router.replace("/login");
  };

  const faqs = [
    {
      id: 1,
      q: "How do I add a plant?",
      a: "Tap the floating '+' button on the home screen to add a plant photo, name, and notes.",
    },
    {
      id: 2,
      q: "How do I change watering intervals?",
      a: "You can set or adjust watering schedules directly from the calendar or plant setup view.",
    },
    {
      id: 3,
      q: "How do I mark a plant as watered?",
      a: "Go to the Calendar, tap on the scheduled date, and click 'Mark as Watered'.",
    },
    {
      id: 4,
      q: "How do I edit my profile?",
      a: "Tap the 'Edit Profile' button at the top of your profile screen to change your name and bio.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Row with Edit Profile Button */}
        <View style={styles.topHeaderRow}>
          <View style={{ width: 70 }} />
          <TouchableOpacity
            style={styles.editProfilePill}
            onPress={() => {
              setTempName(name);
              setTempBio(bio);
              setEditModalVisible(true);
            }}
          >
            <Text style={styles.editProfilePillText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar & User Details */}
        <View style={styles.profileHeaderCenter}>
          <View style={styles.avatarCircle}>
            <Svg height="48" width="48" viewBox="0 0 24 24" fill="#3A5A40">
              <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </Svg>
          </View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userBio}>{bio}</Text>
          <Text style={styles.memberSinceText}>Member since {memberSince}</Text>
        </View>

        {/* Menu Navigation Cards */}
        <View style={styles.menuCardContainer}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/home")}
          >
            <View style={styles.menuLeft}>
              <Svg
                height="18"
                width="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#283618"
                strokeWidth="2"
              >
                <Path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.5,17 5,17C6.5,17 8,15.5 8,13.5C8,11.5 6.5,9.5 5,9C8.5,8.25 14.5,8 17,8Z" />
              </Svg>
              <Text style={styles.menuText}>My Plants</Text>
            </View>
            <View style={styles.menuRight}>
              <Text style={styles.menuBadgeCount}>3</Text>
              <Text style={styles.chevronText}>&gt;</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/calendar")}
          >
            <View style={styles.menuLeft}>
              <Svg
                height="18"
                width="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#283618"
                strokeWidth="2"
              >
                <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              </Svg>
              <Text style={styles.menuText}>Watering Calendar</Text>
            </View>
            <Text style={styles.chevronText}>&gt;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/diary")}
          >
            <View style={styles.menuLeft}>
              <Svg
                height="18"
                width="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#283618"
                strokeWidth="2"
              >
                <Path d="M19 2H6c-1.2 0-2 .9-2 2v16c0 1.1.8 2 2 2h13v-2H6V4h13v15h2V4c0-1.1-.9-2-2-2z" />
              </Svg>
              <Text style={styles.menuText}>Visual Diary</Text>
            </View>
            <Text style={styles.chevronText}>&gt;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setSettingsModalVisible(true)}
          >
            <View style={styles.menuLeft}>
              <Svg
                height="18"
                width="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#283618"
                strokeWidth="2"
              >
                <Path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </Svg>
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Text style={styles.chevronText}>&gt;</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setLogoutModalVisible(true)}
          >
            <View style={styles.menuLeft}>
              <Svg
                height="18"
                width="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
              >
                <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <Path d="M16 17l5-5-5-5" />
                <Path d="M21 12H9" />
              </Svg>
              <Text style={[styles.menuText, { color: "#EF4444" }]}>
                Log Out
              </Text>
            </View>
            <Text style={[styles.chevronText, { color: "#EF4444" }]}>&gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Motivational Quote Card */}
        <View style={styles.quoteCard}>
          <Svg height="24" width="24" viewBox="0 0 24 24" fill="#3A5A40">
            <Path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.5,17 5,17C6.5,17 8,15.5 8,13.5C8,11.5 6.5,9.5 5,9C8.5,8.25 14.5,8 17,8Z" />
          </Svg>
          <Text style={styles.quoteText}>
            &ldquo;Plants don&apos;t just make a home beautiful, they make it
            alive.&rdquo;
          </Text>
        </View>
      </ScrollView>

      {/*  EDIT PROFILE MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.editAvatarCenter}>
              <View style={styles.avatarCircleLarge}>
                <Svg height="42" width="42" viewBox="0 0 24 24" fill="#3A5A40">
                  <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </Svg>
                <View style={styles.cameraBadge}>
                  <Svg
                    height="12"
                    width="12"
                    viewBox="0 0 24 24"
                    fill="#FFFFFF"
                  >
                    <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <Circle cx="12" cy="13" r="4" />
                  </Svg>
                </View>
              </View>
              <Text style={styles.tapPhotoText}>Tap to change photo</Text>
            </View>

            <Text style={styles.inputLabel}>Display Name</Text>
            <TextInput
              style={styles.modalInput}
              value={tempName}
              onChangeText={setTempName}
            />

            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={styles.modalInput}
              value={tempBio}
              onChangeText={setTempBio}
            />

            <Text style={styles.inputLabel}>Member Since</Text>
            <View style={styles.disabledInput}>
              <Text style={styles.disabledInputText}>{memberSince}</Text>
            </View>

            <TouchableOpacity
              style={styles.saveChangesButton}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveChangesText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelTextButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.cancelTextButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/*  SETTINGS / FAQ MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>Settings &amp; FAQ</Text>
              <TouchableOpacity onPress={() => setSettingsModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <Text style={styles.faqHeaderLabel}>
                Frequently Asked Questions
              </Text>
              {faqs.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <TouchableOpacity
                    key={faq.id}
                    style={styles.faqCard}
                    activeOpacity={0.8}
                    onPress={() => setExpandedFaq(isOpen ? null : faq.id)}
                  >
                    <View style={styles.faqQuestionRow}>
                      <Text style={styles.faqQuestionText}>{faq.q}</Text>
                      <Text style={styles.faqChevron}>
                        {isOpen ? "∧" : "∨"}
                      </Text>
                    </View>
                    {isOpen && (
                      <Text style={styles.faqAnswerText}>{faq.a}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* LOGOUT CONFIRMATION MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModalContent}>
            <View style={styles.logoutIconBadge}>
              <Svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
              >
                <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <Path d="M16 17l5-5-5-5" />
                <Path d="M21 12H9" />
              </Svg>
            </View>
            <Text style={styles.logoutTitle}>Log Out?</Text>
            <Text style={styles.logoutSubtitle}>
              Are you sure you want to log out of your account?
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmLogoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.confirmLogoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Reusable SVG Bottom Navigation Bar */}
      <BottomNav />
    </SafeAreaView>
  );
}

// Style for profile Screen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAEFE9" },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  topHeaderRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  editProfilePill: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D4DECFC0",
  },
  editProfilePillText: { fontSize: 12, fontWeight: "600", color: "#3A5A40" },
  profileHeaderCenter: { alignItems: "center", marginBottom: 24 },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D2E0CE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#B5C9AC",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 2,
  },
  userBio: {
    fontSize: 13,
    color: "#588157",
    marginBottom: 4,
    fontWeight: "500",
  },
  memberSinceText: { fontSize: 11, color: "#879879" },

  menuCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F7F2",
  },
  menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuText: { fontSize: 14, fontWeight: "600", color: "#283618" },
  menuRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  menuBadgeCount: { fontSize: 12, fontWeight: "bold", color: "#588157" },
  chevronText: { fontSize: 16, color: "#A3B19B", fontWeight: "bold" },

  quoteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  quoteText: {
    flex: 1,
    fontSize: 12,
    fontStyle: "italic",
    color: "#588157",
    lineHeight: 18,
  },

  // Modal Common Styles
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
    marginBottom: 20,
  },
  modalHeaderTitle: { fontSize: 18, fontWeight: "bold", color: "#283618" },
  closeIcon: { fontSize: 18, color: "#879879", fontWeight: "bold" },

  // Edit Profile Modal
  editAvatarCenter: { alignItems: "center", marginBottom: 20 },
  avatarCircleLarge: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D2E0CE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#283618",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  tapPhotoText: { fontSize: 11, color: "#588157", fontWeight: "600" },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3A5A40",
    marginBottom: 6,
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
    marginBottom: 14,
  },
  disabledInput: {
    backgroundColor: "#F1F5F0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  disabledInputText: { fontSize: 13, color: "#879879" },
  saveChangesButton: {
    backgroundColor: "#283618",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  saveChangesText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  cancelTextButton: { alignItems: "center", paddingVertical: 6 },
  cancelTextButtonText: { color: "#588157", fontSize: 13, fontWeight: "bold" },

  // FAQ Styles
  faqHeaderLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3A5A40",
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  faqQuestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestionText: { fontSize: 13, fontWeight: "bold", color: "#283618" },
  faqChevron: { fontSize: 14, fontWeight: "bold", color: "#588157" },
  faqAnswerText: {
    fontSize: 12,
    color: "#588157",
    marginTop: 8,
    lineHeight: 16,
  },

  // Logout Modal
  logoutModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: "auto",
    marginTop: "auto",
    alignItems: "center",
  },
  logoutIconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#283618",
    marginBottom: 8,
  },
  logoutSubtitle: {
    fontSize: 13,
    color: "#588157",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
  },
  modalButtonsRow: { flexDirection: "row", gap: 12, width: "100%" },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F1F5F0",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelButtonText: { color: "#588157", fontWeight: "bold", fontSize: 14 },
  confirmLogoutButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmLogoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
