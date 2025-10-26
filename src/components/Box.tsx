import { wp } from "@/utils/getResponsiveSize";
import React, { FC, useEffect, useRef } from "react";
import { MeshGradientView } from "expo-mesh-gradient";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";

const BLUE_MESH = [
  "#0B1F3A", // deep navy
  "#0E3A68",
  "#115E9B",
  "#0E3A68",
  "#1677C5",
  "#2A9DF4",
  "#0B1F3A",
  "#1677C5",
  "#7CC3FF",
];
export interface Props {
  animated?: boolean;
  children?: React.ReactNode;
  center?: boolean;
  vCenter?: boolean;
  hCenter?: boolean;
  selfCenter?: boolean;
  spaceBetween?: boolean;
  flex?: boolean | number;
  flexGrow?: boolean | number;
  flexWrap?: string;
  row?: boolean;
  mAll?: number | null;
  mt?: number | false;
  mb?: number | false;
  mh?: number | false;
  mv?: number | false;
  ml?: number | false;
  mr?: number | false;
  pAll?: number | false;
  pv?: number | false;
  ph?: number | false;
  pl?: number | false;
  pt?: number | false;
  pr?: number | false;
  pb?: number | false;
  width?: number | string | false;
  minWidth?: number | string | false;
  height?: number | string | false;
  minHeight?: number | string | false;
  borderRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderTopLeftRadius?: number | false;
  borderTopRightRadius?: number | false;
  justifyContent?: string | false;
  alignItems?: string | false;
  alignSelf?: string | false;
  backgroundColor?: string | false;
  aspectRatio?: number;
  borderWidth?: number | false;
  borderColor?: string | false;
  absolute?: boolean;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  opacity?: number;
  zIndex?: number;
  style?: object;
  onPress?: (() => void) | null;
  activeOpacity?: number;
  meshGradient?: boolean;
  gradientColors?: string[];
  gradientStartBalance?: number;
  gradientEndBalance?: number;
  disabled?: boolean;
  overflow?: string;
  position?: string;
  fadeIn?: boolean;
  fadeInTime?: number;
  fadeInDelay?: number;
  slideIn?: boolean;
  slideInTime?: number;
  slideInDelay?: number;
  slideInDirection?: "left" | "right" | "top" | "bottom";
  animationType?: "spring" | "timing";
  slideInX?: number;
}
const Box: FC<Props> = ({
  animated,
  children,
  center,
  vCenter,
  hCenter,
  selfCenter,
  spaceBetween,
  flex,
  flexGrow,
  flexWrap,
  row,
  mAll,
  mt,
  mb,
  mh,
  mv,
  ml,
  mr,
  pAll,
  pv,
  ph,
  pl,
  pt,
  pr,
  pb,
  width,
  minWidth,
  height,
  minHeight,
  borderRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  justifyContent,
  alignItems,
  alignSelf,
  backgroundColor,
  aspectRatio,
  borderWidth,
  borderColor,
  absolute,
  top,
  bottom,
  left,
  right,
  opacity,
  zIndex,
  style,
  onPress,
  activeOpacity,
  meshGradient,
  gradientColors,
  gradientStartBalance,
  gradientEndBalance,
  disabled,
  overflow,
  fadeIn,
  fadeInTime,
  fadeInDelay,
  slideIn,
  slideInTime,
  slideInDelay,
  slideInDirection = "right",
  animationType = "timing",
  slideInX = 0,
  ...restProps
}) => {
  const Component = onPress
    ? animated || fadeIn
      ? Animated.createAnimatedComponent(TouchableOpacity)
      : TouchableOpacity
    : ((animated || fadeIn ? Animated.View : View) as React.ElementType);

  const fadeOpacity = useRef(new Animated.Value(0)).current;
  const slideValue = useRef(
    new Animated.ValueXY({ x: slideIn ? wp(slideInX) : 0, y: 0 })
  ).current;

  useEffect(() => {
    if (fadeIn) {
      setTimeout(() => {
        Animated.timing(fadeOpacity, {
          toValue: opacity || opacity === 0 ? opacity : 1,
          duration: ((fadeInTime || fadeInTime === 0) && fadeInTime) || 750,
          useNativeDriver: true,
        }).start();
      }, fadeInDelay || 0);
    }
  }, [opacity]);

  useEffect(() => {
    if (slideIn && !!slideInX) {
      setTimeout(() => {
        Animated.timing(slideValue, {
          toValue: { x: 0, y: 0 },
          duration: ((slideInTime || slideInTime === 0) && slideInTime) || 500,
          useNativeDriver: true,
        }).start();
      }, slideInDelay || 0);
    }
  }, []);

  return (
    <Component
      style={[
        !!flex && { flex: flex === true ? 1 : flex },
        !!flexGrow && { flexGrow: flexGrow === true ? 1 : flexGrow },
        !!slideIn && {
          transform: [
            { translateX: slideValue.x },
            { translateY: slideValue.y },
          ],
        },
        !!flexWrap && { flexWrap },
        center && styles.center,
        hCenter && styles.hCenter,
        vCenter && styles.vCenter,
        selfCenter && styles.selfCenter,
        spaceBetween && styles.spaceBetween,
        row && styles.row,
        !!mAll && { margin: mAll },
        !!mt && { marginTop: mt },
        !!mb && { marginBottom: mb },
        !!ml && { marginLeft: ml },
        !!mr && { marginRight: mr },
        !!mh && { marginHorizontal: mh },
        !!mv && { marginVertical: mv },
        !!width && { width },
        !!minWidth && { minWidth },
        !!height && { height },
        !!minHeight && { minHeight },
        !!pAll && { padding: pAll },
        !!ph && { paddingHorizontal: ph },
        !!pv && { paddingVertical: pv },
        !!pl && { paddingLeft: pl },
        !!pt && { paddingTop: pt },
        !!pr && { paddingRight: pr },
        !!pb && { paddingBottom: pb },
        !!justifyContent && { justifyContent },
        !!alignItems && { alignItems },
        !!alignSelf && { alignSelf },
        !!backgroundColor && { backgroundColor },
        !!aspectRatio && { aspectRatio },
        !!overflow && { overflow },
        !!borderWidth && { borderWidth },
        !!borderColor && { borderColor },
        !!borderRadius && { borderRadius },
        !!borderBottomLeftRadius && { borderBottomLeftRadius },
        !!borderBottomRightRadius && { borderBottomRightRadius },
        !!borderTopLeftRadius && { borderTopLeftRadius },
        !!borderTopRightRadius && { borderTopRightRadius },
        !fadeIn && (!!opacity || opacity === 0) && { opacity },
        !!fadeIn && { opacity: fadeOpacity },
        (!!zIndex || zIndex === 0) && { zIndex },
        !!absolute && { position: "absolute" },
        (!!top || top === 0) && { top },
        (!!bottom || bottom === 0) && { bottom },
        (!!left || left === 0) && { left },
        (!!right || right === 0) && { right },
        !!disabled && { opacity: 0.5 },
        style,
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity || 1}
      disabled={disabled}
      {...restProps}
    >
      {meshGradient && (
        <MeshGradientView
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, { opacity: 0.32 }]}
          columns={3}
          rows={3}
          colors={BLUE_MESH}
        />
      )}
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  center: { justifyContent: "center", alignItems: "center" },
  hCenter: { justifyContent: "center" },
  vCenter: { alignItems: "center" },
  selfCenter: { alignSelf: "center" },
  spaceBetween: { justifyContent: "space-between" },
  row: { flexDirection: "row" },
});

export default Box;
