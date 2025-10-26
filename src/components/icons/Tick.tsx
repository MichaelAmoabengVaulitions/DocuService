import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const Tick: React.FC<IconProps> = ({
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
        d="M5 14l3.5 3.5L19 6.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Tick;
