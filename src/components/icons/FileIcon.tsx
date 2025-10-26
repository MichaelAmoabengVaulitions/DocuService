import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const FileIcon: React.FC<IconProps> = ({
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
        d="M20.5 10.5V10c0-3.771 0-5.657-1.172-6.828C18.157 2 16.271 2 12.5 2h-1C7.729 2 5.843 2 4.672 3.172 3.5 4.343 3.5 6.229 3.5 10v4.5c0 3.287 0 4.931.908 6.038.166.202.352.388.554.554C6.07 22 7.712 22 11 22M7.5 7h9M7.5 12h6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.5 20v-3c0-1.43-1.343-3-3-3s-3 1.57-3 3v3.5a1.5 1.5 0 003 0V17"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default FileIcon;
