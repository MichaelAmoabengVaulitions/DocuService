import React, { FC } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import TemplateText from "./TemplateText";
import DynamicIcon, { DynamicIconName } from "./icons/DynamicIcon";
import Box from "./Box";
import { SCREEN_WIDTH } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";

type ButtonProps = {
  height?: number;
  width?: number;
  color?: string;
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  style?: object | object[];
  titleColor?: string;
  icon?: boolean;
  iconName?: DynamicIconName;
};

const Button: FC<ButtonProps> = ({
  height = 48,
  width = SCREEN_WIDTH - 32,
  color = Colors.IOS_BLUE,
  onPress,
  title = "Button",
  loading = false,
  disabled = false,
  style,
  titleColor = Colors.WHITE,
  icon = false,
  iconName,
}) => {
  const handleOnPress = () => {
    if (disabled) {
      return;
    }
    if (loading) {
      return;
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <Box
      onPress={handleOnPress}
      style={[
        styles.container,
        {
          height,
          width,
          backgroundColor: color,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.WHITE} />
      ) : (
        <TemplateText size={14} semiBold center color={titleColor}>
          {title}
        </TemplateText>
      )}
      {icon && iconName && (
        <DynamicIcon
          name={iconName}
          size={24}
          color={titleColor}
          style={{ marginLeft: 8 }}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3F3F46",
    flexDirection: "row",
  },
});
export default Button;
