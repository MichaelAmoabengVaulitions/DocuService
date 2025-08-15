/* eslint-disable max-len */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  ColorValue,
  Animated,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { PRIMARY_GRADIENT } from "../theme/Colors";
import { SHADOW } from "../theme/Shadow";
import { wp } from "../Utils/getResponsiveSize";
import { IS_ANDROID } from "../theme/Layout";

export interface BoxProps extends Animated.AnimatedProps<object> {
  animated?: boolean;
  shadow?: boolean;
  lightShadow?: boolean;
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
  borderRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderTopLeftRadius?: number | false;
  borderTopRightRadius?: number | false;
  justifyContent?: string | false;
  alignItems?: string | false;
  backgroundColor?: string | ColorValue | false;
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
  style?: ViewStyle | (ViewStyle | null | undefined)[] | null;
  onPress?: (() => void) | null;
  activeOpacity?: number;
  hGradient?: boolean;
  vGradient?: boolean;
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
  minHeight?: number | string | false;
}

const Box: React.FC<BoxProps> = ({
  animated,
  shadow,
  lightShadow,
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
  minHeight,
  height,
  borderRadius,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  justifyContent,
  alignItems,
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
  hGradient,
  vGradient,
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
  ...restProps
}) => {
  // eslint-disable-next-line no-nested-ternary
  const Component = onPress
    ? animated || fadeIn
      ? Animated.createAnimatedComponent(TouchableOpacity)
      : TouchableOpacity
    : ((animated || fadeIn ? Animated.View : View) as React.ElementType);

  const fadeOpacity = useRef(new Animated.Value(0)).current;
  const slideValue = useRef(
    new Animated.ValueXY({ x: slideIn ? wp(20) : 0, y: 0 })
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
  }, [opacity, fadeIn, fadeInTime, fadeInDelay, fadeOpacity]);

  useEffect(() => {
    if (slideIn) {
      setTimeout(() => {
        Animated.timing(slideValue, {
          toValue: { x: 0, y: 0 },
          duration: ((slideInTime || slideInTime === 0) && slideInTime) || 500,
          useNativeDriver: true,
        }).start();
      }, slideInDelay || 0);
    }
  }, [slideIn, slideValue, slideInTime, slideInDelay]);

  return (
    <Component
      style={[
        !!flex && { flex: flex === true ? 1 : flex },
        !!flexGrow && { flexGrow: flexGrow === true ? 1 : flexGrow },
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
        !!slideIn && {
          transform: [
            { translateX: slideValue.x },
            { translateY: slideValue.y },
          ],
        },
        !!mh && { marginHorizontal: mh },
        !!mv && { marginVertical: mv },
        !!width && { width },
        !!minWidth && { minWidth },
        !!minHeight && { minHeight },
        !!height && { height },
        !!pAll && { padding: pAll },
        !!ph && { paddingHorizontal: ph },
        !!pv && { paddingVertical: pv },
        !!pl && { paddingLeft: pl },
        !!pt && { paddingTop: pt },
        !!pr && { paddingRight: pr },
        !!pb && { paddingBottom: pb },
        !!justifyContent && { justifyContent },
        !!alignItems && { alignItems },
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
        IS_ANDROID &&
        (shadow || lightShadow) &&
        !animated &&
        SHADOW("android", backgroundColor, {}),
        style,
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity || 1}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {!IS_ANDROID && shadow && (
        <View
          style={[
            styles.overlay,
            SHADOW("card", backgroundColor, {}),
            !!borderRadius && { borderRadius },
            !!borderBottomLeftRadius && { borderBottomLeftRadius },
            !!borderBottomRightRadius && { borderBottomRightRadius },
            !!borderTopLeftRadius && { borderTopLeftRadius },
            !!borderTopRightRadius && { borderTopRightRadius },
          ]}
        />
      )}
      {!IS_ANDROID && shadow && (
        <View
          style={[
            styles.overlay,
            SHADOW("lightCard", backgroundColor, {}),
            !!borderRadius && { borderRadius },
            !!borderBottomLeftRadius && { borderBottomLeftRadius },
            !!borderBottomRightRadius && { borderBottomRightRadius },
            !!borderTopLeftRadius && { borderTopLeftRadius },
            !!borderTopRightRadius && { borderTopRightRadius },
          ]}
        />
      )}
      {(hGradient || vGradient) && (
        <LinearGradient
          start={{ x: gradientStartBalance || 0, y: gradientStartBalance || 0 }}
          end={
            hGradient
              ? { x: gradientEndBalance || 1, y: 0 }
              : { x: 0, y: gradientEndBalance || 1 }
          }
          style={[
            styles.overlay,
            !!borderRadius && { borderRadius },
            !!borderBottomLeftRadius && { borderBottomLeftRadius },
            !!borderBottomRightRadius && { borderBottomRightRadius },
            !!borderTopLeftRadius && { borderTopLeftRadius },
            !!borderTopRightRadius && { borderTopRightRadius },
          ]}
          colors={gradientColors || PRIMARY_GRADIENT}
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
