import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { WHITE } from "../../theme/Colors";
import { IconProps } from "./IconProps";

const Shopping: React.FC<IconProps> = ({
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
        d="M19.543 2H6.5a2.5 2.5 0 00-2.496 2.635M6.5 4.5H16c.943 0 1.414 0 1.707.293C18 5.086 18 5.557 18 6.5M4.004 4.635A2.5 2.5 0 006.5 7H16c1.886 0 2.828 0 3.414.586C20 8.172 20 9.114 20 11v7c0 1.886 0 2.828-.586 3.414C18.828 22 17.886 22 16 22h-5.996c-2.829 0-4.243 0-5.122-.879-.878-.878-.878-2.293-.878-5.121V4.635zm0 0v-.134M15.5 12.5h-7m4 4h-4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Shopping;
