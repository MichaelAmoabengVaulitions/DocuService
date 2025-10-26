import React, { forwardRef, LegacyRef, MutableRefObject } from "react";
import { StyleSheet, FlatList, FlatListProps, ViewStyle } from "react-native";
import TemplatePagination from "./TemplatePagination";
import { SCREEN_WIDTH } from "@/constants/Layout";
import Box from "../Box";

export interface TemplateCarouselProps extends FlatListProps<any> {
  style?: ViewStyle;
  showPagination?: boolean;
  contentContainerStyle?: ViewStyle | (ViewStyle | false)[];
  flex?: number | boolean;
  paginationSize?: number;
  refField?: MutableRefObject<any> | null;
  onShowAllPress?: (() => void) | null;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  dots?: boolean;
  activePaginationColor?: string;
  inactivePaginationColor?: string;
}
type RefType =
  | LegacyRef<FlatList<any>>
  | MutableRefObject<FlatList<any> | null>;

const OnboardingCarousel = forwardRef<FlatList<any>, TemplateCarouselProps>(
  (
    {
      style,
      showPagination,
      children,
      flex,
      paginationSize,
      snapToInterval,
      refField,
      onShowAllPress,
      activeIndex,
      setActiveIndex,
      dots,
      activePaginationColor,
      inactivePaginationColor,
      ...restProps
    },
    ref: RefType
  ) => (
    // @ts-ignore
    <Box flex={flex}>
      <FlatList
        ref={refField || ref}
        horizontal
        snapToInterval={snapToInterval}
        decelerationRate="fast"
        disableIntervalMomentum
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        style={[styles.container, style]}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const {
            nativeEvent: {
              contentOffset: { x: offset = 0 },
            },
          } = event;
          const newIndex = offset / (snapToInterval || SCREEN_WIDTH);
          setActiveIndex(Math.round(newIndex));
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />

      {showPagination && (
        <TemplatePagination
          paginationSize={paginationSize || 0}
          position={activeIndex}
          dots={dots}
          activePaginationColor={activePaginationColor}
          inactivePaginationColor={inactivePaginationColor}
        />
      )}
    </Box>
  )
);

const styles = StyleSheet.create({
  container: {},
});

export default OnboardingCarousel;
