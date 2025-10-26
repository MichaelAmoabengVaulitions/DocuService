/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { ViewStyle, StyleSheet } from "react-native";
import Box from "../Box";
import { wp } from "@/utils/getResponsiveSize";
import { RADIUS_XSMALL } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";

interface Props {
  paginationSize: number;
  position: number;
  dotStyle?: ViewStyle | null;
  activeDotStyle?: ViewStyle | null;
  children?: any;
  dots?: boolean;
  activePaginationColor?: string;
  inactivePaginationColor?: string;
}

const TemplatePagination: FC<Props> = ({
  paginationSize,
  position,
  children,
  dots,
  activePaginationColor,
  inactivePaginationColor,
  ...restProps
}: any) => (
  <Box row center selfCenter mt={10} {...restProps}>
    {paginationSize > 1 &&
      Array.from(Array(paginationSize).keys()).map((item, index) => {
        const isActive = index === position;

        return (
          <Box
            key={`${index}`}
            mh={wp(6)}
            borderRadius={RADIUS_XSMALL}
            backgroundColor={
              (index !== position && inactivePaginationColor) || Colors.BLACK_20
            }
            style={
              isActive
                ? [
                    styles.dot,
                    {
                      ...styles.activeDot,
                      backgroundColor: dots
                        ? activePaginationColor || Colors.WHITE_40
                        : inactivePaginationColor || Colors.BLACK_SECONDARY,
                    },
                  ]
                : styles.dot
            }
          />
        );
      })}
  </Box>
);

export default TemplatePagination;

const styles = StyleSheet.create({
  dot: {
    height: wp(10),
    width: wp(10),
  },
  activeDot: {
    height: wp(10),
    width: wp(32),
  },
});
