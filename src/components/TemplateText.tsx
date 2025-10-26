/* eslint-disable max-len */
/* eslint-disable react-native/no-inline-styles */
/* @ts-ignore */
import { Colors } from "@/constants/Colors";
import { IS_SHORT_DEVICE } from "@/constants/Layout";
import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";

interface Props {
  light?: boolean;
  medium?: boolean;
  bold?: boolean;
  black?: boolean;
  white?: boolean;
  title?: boolean;
  caps?: boolean;
  subTitle?: boolean;
  underLine?: boolean;
  small?: boolean;
  green?: boolean;
  semiBold?: boolean;
  onPress?: () => void;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  color?: string | null;
  size?: number | null;
  lineThrough?: boolean;
  numberOfLines?: number | null;
  startCase?: boolean;
  italic?: boolean;
  children?:
    | string
    | React.ReactNode
    | null
    | (string | React.ReactNode | null)[];
  lineHeight?: number | null;
  style?: any;
  adjustsFontSizeToFit?: boolean;
  allowFontScaling?: boolean;
  ml?: number;
  mr?: number;
  mt?: number;
  mb?: number;
  fontFamily?: string;
  maxWidth?: number | string;
  secondary?: boolean;
}
const TemplateText: FC<Props> = ({
  light,
  medium,
  bold,
  black,
  white,
  title,
  caps,
  subTitle,
  underLine,
  small,
  green,
  semiBold,
  center,
  left,
  right,
  color,
  size,
  lineThrough,
  children,
  numberOfLines,
  startCase,
  italic,
  lineHeight,
  adjustsFontSizeToFit,
  allowFontScaling,
  onPress,
  ml,
  mr,
  mt,
  mb,
  fontFamily,
  maxWidth,
  secondary = false,
  ...restProps
}) => {
  const textStyle = {} as any;

  if (secondary) {
    textStyle.fontFamily = "NotoSerif-Regular";
  }

  if (light) {
    textStyle.fontWeight = "400";
  }

  if (medium) {
    textStyle.fontWeight = "500";
  }

  if (bold) {
    textStyle.fontWeight = "700";
  }
  if (semiBold) {
    textStyle.fontWeight = "600";
  }

  if (black) {
    textStyle.color = Colors.BLACK;
  }

  if (white) {
    textStyle.color = Colors.WHITE;
  }

  if (title) {
    textStyle.fontSize = 29;
  }

  if (caps) {
    textStyle.textTransform = "uppercase";
  }
  if (subTitle) {
    textStyle.fontSize = 20;
  }
  if (underLine) {
    textStyle.textDecorationLine = "underline";
  }

  if (small) {
    textStyle.fontSize = 14;
  }

  if (left) {
    textStyle.textAlign = "left";
  }
  if (right) {
    textStyle.textAlign = "right";
  }

  if (center) {
    textStyle.textAlign = "center";
  }

  if (color) {
    textStyle.color = color;
  }

  if (italic) {
    textStyle.fontStyle = "italic";
  }

  if (size) {
    textStyle.fontSize = size;
  }

  if (fontFamily) {
    textStyle.fontFamily = fontFamily;
  }
  if (lineThrough) {
    textStyle.textDecorationLine = "line-through";
    textStyle.textDecorationStyle = "solid";
  }
  if (lineHeight) {
    textStyle.lineHeight = lineHeight;
  }

  if (ml) textStyle.marginLeft = ml;
  if (mr) textStyle.marginRight = mr;
  if (mt) textStyle.marginTop = mt;
  if (mb) textStyle.marginBottom = mb;
  if (maxWidth) textStyle.maxWidth = maxWidth;

  let content = children;

  if (startCase && typeof children === "string") {
    content = children
      .replace(/-/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <Text
      {...restProps}
      // @ts-ignore
      style={[styles.default, restProps.style && restProps.style, textStyle]}
      // @ts-ignore
      numberOfLines={numberOfLines}
      allowFontScaling={
        // @ts-ignore
        numberOfLines === 1 ? true : restProps?.allowFontScaling
      }
      adjustsFontSizeToFit={
        // @ts-ignore
        numberOfLines === 1 ? true : restProps?.adjustsFontSizeToFit
      }
      onPress={onPress}
    >
      {content}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "Poppins-Regular",
    fontSize: IS_SHORT_DEVICE ? 15 : 18,
    color: Colors.WHITE,
  },
});

export default TemplateText;
