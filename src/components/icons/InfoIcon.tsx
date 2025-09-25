import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { WHITE } from "../../theme/Colors";
import { IconProps } from "./IconProps";

const InfoIcon: React.FC<IconProps> = ({
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
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16v-4.5M12 8.012v-.01"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InfoIcon;
