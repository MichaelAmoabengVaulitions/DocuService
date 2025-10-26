import { ColorValue, StyleSheet, ViewStyle } from "react-native";
import { Colors } from "./Colors";

export const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.WHITE_20,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 3,
  },
  lightCard: {
    shadowColor: Colors.WHITE_20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  none: {
    shadowColor: undefined,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  wrapper: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  flexWrapper: {
    height: "100%",
    width: "100%",
    flex: 1,
    overflow: "hidden",
  },
  android: {
    elevation: 1,
  },
});

export type ShadowType = "card" | "none" | "wrapper" | "lightCard" | "android";
export type BackgroundColorType = ColorValue;

// eslint-disable-next-line max-len
export const Shadow: (
  type: ShadowType,
  backgroundColor: BackgroundColorType,
  restProps?: ViewStyle
) => ViewStyle = (type, backgroundColor, restProps = {}) => {
  const style: ViewStyle = styles[type];

  return {
    ...style,
    backgroundColor: backgroundColor || Colors.BLACK,
    ...restProps,
  };
};

export default {
  styles,
  Shadow,
};
