import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const CheckIcon: React.FC<IconProps> = ({
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
        d="M14.98 7.016s.5.5 1 1.5c0 0 1.589-2.5 3-3M9.995 2.021c-2.499-.105-4.429.182-4.429.182-1.219.088-3.554.77-3.554 4.762 0 3.956-.026 8.834 0 10.779 0 1.188.735 3.96 3.281 4.108 3.095.18 8.67.219 11.227 0 .685-.039 2.965-.576 3.253-3.056.3-2.57.24-4.355.24-4.78"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22 7.016c0 2.761-2.24 5-5.005 5a5.002 5.002 0 01-5.005-5c0-2.762 2.241-5 5.005-5a5.002 5.002 0 015.005 5zM6.98 13.016h4M6.98 17.016h8"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CheckIcon;
