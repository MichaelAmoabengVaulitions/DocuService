import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { WHITE } from "../../theme/Colors";
import { IconProps } from "./IconProps";

const Loading: React.FC<IconProps> = ({
  color = WHITE,
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
        d="M18.001 20A9.956 9.956 0 0112 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 .863-.11 1.701-.315 2.5-.223.867-1.17 1.27-2.015.973-.718-.253-1.048-1.073-.868-1.813A7 7 0 1015.608 18"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default Loading;
