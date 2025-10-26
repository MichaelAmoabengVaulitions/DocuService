import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const Share: React.FC<IconProps> = ({
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
        d="M10.002 3c-2.947.032-4.591.22-5.684 1.312C3 5.63 3 7.752 3 11.997c0 4.244 0 6.366 1.318 7.684C5.637 21 7.76 21 12.003 21s6.366 0 7.685-1.319c1.093-1.092 1.28-2.737 1.312-5.685M14 3h4c1.414 0 2.121 0 2.56.44C21 3.878 21 4.585 21 6v4m-1-6l-9 9"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Share;
