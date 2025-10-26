import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const Filter: React.FC<IconProps> = ({
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
        d="M13 4H3M11 19H3M21 19h-4M21 11.5H11M21 4h-2M5 11.5H3M14.5 2c.466 0 .699 0 .883.076a1 1 0 01.54.541c.077.184.077.417.077.883v1c0 .466 0 .699-.076.883a1 1 0 01-.541.54C15.199 6 14.966 6 14.5 6s-.699 0-.883-.076a1 1 0 01-.54-.541C13 5.199 13 4.966 13 4.5v-1c0-.466 0-.699.076-.883a1 1 0 01.541-.54C13.801 2 14.034 2 14.5 2zM12.5 17c.466 0 .699 0 .883.076a1 1 0 01.54.541c.077.184.077.417.077.883v1c0 .466 0 .699-.076.883a1 1 0 01-.541.54c-.184.077-.417.077-.883.077s-.699 0-.883-.076a1 1 0 01-.54-.541C11 20.199 11 19.966 11 19.5v-1c0-.466 0-.699.076-.883a1 1 0 01.541-.54c.184-.077.417-.077.883-.077zM9.5 9.5c.466 0 .699 0 .883.076a1 1 0 01.54.541c.077.184.077.417.077.883v1c0 .466 0 .699-.076.883a1 1 0 01-.541.54c-.184.077-.417.077-.883.077s-.699 0-.883-.076a1 1 0 01-.54-.541C8 12.699 8 12.466 8 12v-1c0-.466 0-.699.076-.883a1 1 0 01.541-.54c.184-.077.417-.077.883-.077z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Filter;
