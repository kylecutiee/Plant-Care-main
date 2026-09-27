// src/components/BottomNav.tsx
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { router, usePathname } from "expo-router";
import Svg, { Path } from "react-native-svg";

export default function BottomNav() {
  const currentPath = usePathname();

  const navItems = [
    {
      name: "Home",
      path: "/home",
      // Home House SVG path
      svgPath: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    },
    {
      name: "Calendar",
      path: "/calendar",
      // Calendar SVG path
      svgPath:
        "M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z",
    },
    {
      name: "Diary",
      path: "/diary",
      // Book / Diary SVG path
      svgPath:
        "M19 2H6c-1.2 0-2 .9-2 2v16c0 1.1.8 2 2 2h13v-2H6V4h13v15h2V4c0-1.1-.9-2-2-2z",
    },
    {
      name: "Profile",
      path: "/profile",
      // User Profile SVG path
      svgPath:
        "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        const iconColor = isActive ? "#283618" : "#879879";

        return (
          <TouchableOpacity
            key={item.name}
            style={styles.navItem}
            onPress={() => router.push(item.path as any)}
            activeOpacity={0.7}
          >
            <Svg height="22" width="22" viewBox="0 0 24 24" fill={iconColor}>
              <Path d={item.svgPath} />
            </Svg>
            <Text style={[styles.navText, isActive && styles.activeNavText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 4,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 10,
    color: "#879879",
    marginTop: 4,
    fontWeight: "500",
  },
  activeNavText: {
    color: "#283618",
    fontWeight: "bold",
  },
});
