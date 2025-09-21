import React, { FC } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import TemplateTouchable from "./TemplateTouchable";
import {
  BLACK,
  BLUE_SECONDARY,
  IOS_BLUE,
  PRIMARY,
  SECONDARY,
  WHITE,
} from "../theme/Colors";
import { SCREEN_WIDTH } from "../theme/Layout";
import TemplateText from "./TemplateText";

type ButtonProps = {
  height: number;
  width: number;
  color: string;
  onPress: () => void;
  title: string;
  loading: boolean;
  disabled: boolean;
  style: object | object[];
  titleColor: string;
};

const Button: FC<ButtonProps> = ({
  height = 52,
  width = SCREEN_WIDTH - 32,
  color = IOS_BLUE,
  onPress,
  title = "Button",
  loading = false,
  disabled = false,
  style,
  titleColor = WHITE,
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
        <TemplateText size={16} medium center color={titleColor}>
          {title}
        </TemplateText>
      )}
    </TemplateTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 56,
    borderWidth: 1,
    borderColor: "#3F3F46",
  },
});
export default Button;
