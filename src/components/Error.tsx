import React from "react";
import { View, StyleSheet } from "react-native";

import TemplateText from "./TemplateText";
import { IS_SHORT_DEVICE, IS_SMALL_DEVICE } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";

interface ErrorProps {
  show: boolean;
  children:
    | string
    | React.ReactNode
    | null
    | (string | React.ReactNode | null)[];
  style?: any;
}

const Error: React.FC<ErrorProps> = ({ show, children, style }) =>
  show && (
    <View
      style={[
        styles.errorContainer,
        style,
        IS_SMALL_DEVICE && !show && styles.hideOnSmallDevice,
      ]}
    >
      <TemplateText size={12} medium style={styles.error}>
        {children}
      </TemplateText>
    </View>
  );

const styles = StyleSheet.create({
  errorContainer: {
    marginTop: 5,
    marginBottom: IS_SMALL_DEVICE ? 2 : 0,
    width: "100%",
    overflow: IS_SMALL_DEVICE ? "visible" : "visible",
  },
  hideOnSmallDevice: {
    height: 0,
  },
  error: {
    color: Colors.ERROR_RED,
    lineHeight: IS_SHORT_DEVICE ? 12 : 15,
  },
});

export default Error;
