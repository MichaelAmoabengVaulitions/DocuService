import { Colors } from "@/constants/Colors";
import { IS_ANDROID, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/constants/Layout";
import React from "react";
import { StyleSheet, View } from "react-native";

export const TRANSPARENT_NO_LOGO_HEADER = {
  headerTitle: () => (IS_ANDROID ? null : ""),
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerTintColor: Colors.BLACK,
  headerTitleAlign: "center",
  headerBackground: () => <View style={styles.header} />,
  animationEnabled: true,
  headerMode: "screen",
  freezeOnBlur: true,
};

export const TRANSPARENT_HEADER = {
  headerTitle: () => (IS_ANDROID ? null : ""),
  headerTransparent: true,
  headerBackTitleVisible: true,
  headerBackTitle: "back",
  headerTintColor: Colors.WHITE,
  headerTitleAlign: "center",
  headerBackground: () => <View style={styles.header} />,
  animationEnabled: true,
  headerMode: "screen",
  freezeOnBlur: true,
};

export const TRANSPARENT_HEADER_NO_LOGO = {
  headerTitle: () => (IS_ANDROID ? null : ""),
  headerTransparent: true,
  headerBackTitleVisible: false,
  headerLeft: null,
  headerTintColor: Colors.BLACK,
  headerTitleAlign: "center",
  headerBackground: () => <View style={styles.header} />,
  animationEnabled: true,
  headerMode: "screen",
  freezeOnBlur: true,
};
export const SWITCH = {
  animationEnabled: false,
};

const styles = StyleSheet.create({
  header: {
    height: SCREEN_HEIGHT * 0.1,
    width: SCREEN_WIDTH,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ANIMATION_DISABLED_HEADER = {
  headerShown: false,
  animationEnabled: false,
};
