import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { WHITE } from "../../theme/Colors";
import { IconProps } from "./IconProps";

const Close: React.FC<IconProps> = ({
  color = WHITE,
  size,
  style,
  ...props
}) => {
  const ratio = 22 / 22;

  return (
    <Svg
      width={size}
      height={size && size / ratio}
      style={style}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <Path
        d="M18 6L6 18m12 0L6 6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Close;
