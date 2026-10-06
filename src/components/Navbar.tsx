import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import Button from "./Button";

interface NavbarProps {
  onNavigate?: (route: string) => void;
  activeRoute?: string;
}

export function Navbar({ onNavigate, activeRoute = "home" }: NavbarProps) {
  const { colors, typography, spacing, isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "explore", label: "Explore" },
    { id: "write", label: "Write" },
  ];

  const handleNav = (id: string) => {
    setIsOpen(false);
    onNavigate?.(id);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.inner,
          { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
        ]}
      >
        {/* Logo and Brand */}
        <Pressable onPress={() => handleNav("home")} style={styles.brand}>
          <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.logoImage}
            />
          </View>
          <Text
            style={[
              styles.brandText,
              { color: colors.primary, fontSize: typography.sizes.lg },
            ]}
          >
            Nepal Can <Text style={{ color: colors.foreground }}>Blog</Text>
          </Text>
        </Pressable>

        {/* Right action controls */}
        <View style={styles.actions}>
          {/* Theme Toggle */}
          <Pressable
            onPress={toggleTheme}
            style={({ pressed }) => [
              styles.iconBtn,
              {
                backgroundColor: colors.muted,
                borderColor: colors.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            accessibilityLabel="Toggle Theme"
          >
            <Ionicons
              name={isDark ? "sunny-outline" : "moon-outline"}
              size={18}
              color={colors.foreground}
            />
          </Pressable>

          {/* Menu Hamburger */}
          <Pressable
            onPress={() => setIsOpen(!isOpen)}
            style={({ pressed }) => [
              styles.iconBtn,
              {
                backgroundColor: colors.muted,
                borderColor: colors.border,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            accessibilityLabel="Toggle Navigation Menu"
          >
            <Ionicons
              name={isOpen ? "close" : "menu"}
              size={20}
              color={colors.foreground}
            />
          </Pressable>
        </View>
      </View>

      {/* Expanded Menu Dropdown */}
      {isOpen && (
        <View
          style={[
            styles.menuDropdown,
            {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              padding: spacing.lg,
            },
          ]}
        >
          {navItems.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => handleNav(item.id)}
                style={({ pressed }) => [
                  styles.menuItem,
                  {
                    backgroundColor: isActive
                      ? colors.muted
                      : pressed
                        ? colors.muted
                        : "transparent",
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.md,
                    borderRadius: 8,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isActive ? colors.primary : colors.foreground,
                    fontSize: typography.sizes.base,
                    fontWeight: isActive
                      ? typography.weights.bold
                      : typography.weights.medium,
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}

          <View
            style={[
              styles.menuAuth,
              {
                borderTopColor: colors.border,
                paddingTop: spacing.md,
                marginTop: spacing.sm,
                gap: spacing.sm,
              },
            ]}
          >
            <Button variant="outline" onPress={() => handleNav("login")}>
              Login
            </Button>
            <Button variant="primary" onPress={() => handleNav("register")}>
              Get Started
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    zIndex: 100,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuDropdown: {
    borderTopWidth: 1,
  },
  menuItem: {
    marginBottom: 4,
  },
  menuAuth: {
    borderTopWidth: 1,
  },
  logoImage: {
    width: 20,
    height: 20,
  },
});

export default Navbar;
