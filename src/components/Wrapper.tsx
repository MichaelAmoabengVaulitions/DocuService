import React, { forwardRef } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "./Box";
import DynamicIcon from "./icons/DynamicIcon";
import { Colors } from "@/constants/Colors";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "@/constants/Layout";

type ScrollKeyboardContainerProps = {
  keyboard?: boolean;
  scroll?: boolean;
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  extraHeight?: number;
} & Omit<ScrollViewProps, "contentContainerStyle"> &
  Omit<KeyboardAwareScrollViewProps, "contentContainerStyle">;

export const ScrollKeyboardContainer = forwardRef<
  any,
  ScrollKeyboardContainerProps
>(
  (
    {
      keyboard,
      scroll,
      children,
      contentContainerStyle,
      extraHeight,
      ...restProps
    },
    ref
  ) => {
    if (!keyboard && !scroll) return <>{children}</>;

    if (keyboard) {
      return (
        <KeyboardAwareScrollView
          contentContainerStyle={[
            styles.contentContainer,
            contentContainerStyle,
          ]}
          scrollIndicatorInsets={{ right: 1 }}
          ref={ref}
          {...restProps}
        >
          {children}
        </KeyboardAwareScrollView>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        scrollIndicatorInsets={{ right: 1 }}
        ref={ref}
        {...restProps}
      >
        {children}
      </ScrollView>
    );
  }
);

type BottomWrapperProps = ViewProps & {
  children?: React.ReactNode;
  background?: string;
  expandable?: boolean;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

export const BottomWrapper = ({
  children,
  style,
  background,
  expandable,
  radius,
  ...restProps
}: BottomWrapperProps) => (
  <View
    style={[
      styles.bottomWrapper,
      { borderTopLeftRadius: radius, borderTopRightRadius: radius },
      style,
    ]}
    {...restProps}
  >
    {!!expandable && (
      <Box style={styles.toggleButton} onPress={comingSoonAlert}>
        <DynamicIcon name="ArrowRight" color={background} />
      </Box>
    )}
    {children}
  </View>
);

/** ---------- Wrapper ---------- */

type WrapperProps = Omit<ScrollKeyboardContainerProps, "children"> & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  outerStyle?: StyleProp<ViewStyle>;
  background?: string;
  loading?: boolean;
  safe?: boolean;
};

const Wrapper = forwardRef<any, WrapperProps>(
  (
    {
      children,
      style,
      outerStyle,
      background,
      keyboard,
      extraHeight,
      scroll,
      contentContainerStyle,
      loading,
      safe,
      ...restProps
    },
    ref
  ) => {
    const content = loading ? (
      <ActivityIndicator style={styles.activityIndicator} size="large" />
    ) : (
      children
    );

    const Inner: React.ElementType = safe ? SafeAreaView : View;

    return (
      <View style={styles.container}>
        <View
          style={[styles.backgroundColor, { backgroundColor: background }]}
        />
        <ScrollKeyboardContainer
          keyboard={keyboard}
          scroll={!loading && !!scroll}
          ref={ref}
          endFillColor={Colors.BLACK}
          extraHeight={extraHeight}
          style={[styles.container, outerStyle]}
          contentContainerStyle={[
            { backgroundColor: background },
            contentContainerStyle,
          ]}
          {...restProps}
        >
          <Inner style={[styles.safeArea, loading && styles.loading, style]}>
            {content}
          </Inner>
        </ScrollKeyboardContainer>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundColor: {
    height: SCREEN_HEIGHT * 0.3,
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH,
  },
  loading: { alignItems: "center", justifyContent: "center" },
  activityIndicator: { flex: 1 },
  contentContainer: { flexDirection: "column" },
  safeArea: {
    marginHorizontal: WRAPPER_MARGIN,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -24,
    left: SCREEN_WIDTH / 2 - 24,
  },
  bottomWrapper: {
    width: "100%",
    backgroundColor: Colors.WHITE,
    paddingTop: 50,
    marginTop: 34,
  },
});

export default Wrapper;

function comingSoonAlert(): void {
  Alert.alert("This feature is coming soon!");
}
