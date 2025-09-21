/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { ViewStyle, StyleSheet } from "react-native";

import TemplateBox from "../TemplateBox";
import {
  BLACK_20,
  BLACK_SECONDARY,
  PRIMARY,
  WHITE_10,
  WHITE_30,
} from "../../theme/Colors";
import { RADIUS_XSMALL, SPACE_XSMALL } from "../../theme/Layout";
import { wp } from "../../Utils/getResponsiveSize";

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
  activePaginationColor = WHITE_30,
  inactivePaginationColor = WHITE_10,
  ...restProps
}: any) => (
  <TemplateBox row center selfCenter mt={10} {...restProps}>
    {paginationSize > 1 &&
      Array.from(Array(paginationSize).keys()).map((item, index) => {
        const isActive = index === position;

        return (
          <TemplateBox
            key={`${index}`}
            mh={wp(6)}
            borderRadius={RADIUS_XSMALL}
            vGradient={isActive}
            backgroundColor={
              (index !== position && inactivePaginationColor) || BLACK_20
            }
            style={
              isActive
                ? [
                    styles.dot,
                    {
                      ...styles.activeDot,
                      backgroundColor: dots
                        ? activePaginationColor || PRIMARY
                        : inactivePaginationColor || BLACK_SECONDARY,
                    },
                  ]
                : styles.dot
            }
          />
        );
      })}
  </TemplateBox>
);

TemplatePagination.defaultProps = {
  dotStyle: null,
  activeDotStyle: null,
};

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
