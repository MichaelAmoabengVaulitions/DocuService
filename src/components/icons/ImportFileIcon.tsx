import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const ImportFileIcon: React.FC<IconProps> = ({
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
        d="M3 17c0 .93 0 1.395.102 1.776a3 3 0 002.121 2.122C5.605 21 6.07 21 7 21h10c.93 0 1.395 0 1.776-.102a3 3 0 002.122-2.122C21 18.395 21 17.93 21 17M16.5 7.5S13.186 3 12 3 7.5 7.5 7.5 7.5M12 4v12"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ImportFileIcon;
