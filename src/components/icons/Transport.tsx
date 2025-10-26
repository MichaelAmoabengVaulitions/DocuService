import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const Transport: React.FC<IconProps> = ({
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
        d="M7 11H6c-3.31 0-4 .69-4 4v3c0 3.31.69 4 4 4h12c3.31 0 4-.69 4-4v-3c0-2.211-.308-3.253-1.5-3.701M12 18h6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.244 3.133c.447-.485.67-.728.908-.87a1.861 1.861 0 011.862-.027c.242.134.472.37.933.841.46.472.691.707.823.954a1.981 1.981 0 01-.028 1.905c-.138.243-.375.472-.85.93l-5.642 5.441c-1.494 1.442-2.42 1.741-4.49 1.687-.377-.01-.565-.015-.674-.139-.11-.124-.094-.316-.064-.7.137-1.767.449-2.673 1.652-3.978l5.57-6.044z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Transport;
