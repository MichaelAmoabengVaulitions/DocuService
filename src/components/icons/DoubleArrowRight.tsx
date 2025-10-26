import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const DoubleArrowRight: React.FC<IconProps> = ({
  color = Colors.WHITE,
  size,
  style,
  ...props
}) => {
  const ratio = 24 / 24;

  return (
    <Svg
      width={size}
      height={size && size / ratio}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M12.5 18s6-4.419 6-6c0-1.581-6-6-6-6M5.5 18s6-4.419 6-6c0-1.581-6-6-6-6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DoubleArrowRight;
