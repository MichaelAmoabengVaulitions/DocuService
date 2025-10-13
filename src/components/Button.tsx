import React, { FC } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import TemplateTouchable from "./TemplateTouchable";
import {
  BLACK,
  BLUE_SECONDARY,
  DARK_FOREST_GREEN,
  FOREST_GREEN,
  IOS_BLUE,
  PRIMARY,
  SECONDARY,
  WHITE,
} from "../theme/Colors";
import { SCREEN_WIDTH } from "../theme/Layout";
import TemplateText from "./TemplateText";
import DynamicIcon, { DynamicIconName } from "./icons/DynamicIcon";

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
  color = FOREST_GREEN,
  onPress,
  title = "Button",
  loading = false,
  disabled = false,
  style,
  titleColor = WHITE,
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
    <TemplateTouchable
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
        <ActivityIndicator size="small" color={WHITE} />
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
    </TemplateTouchable>
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
