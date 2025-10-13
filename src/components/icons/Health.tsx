import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { WHITE } from "../../theme/Colors";
import { IconProps } from "./IconProps";

const Health: React.FC<IconProps> = ({
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
        d="M14.5 7.5a5 5 0 10-10 0 5 5 0 0010 0zM2.5 19.5a7 7 0 0110-6.326M21.5 17v-2.5c-2 0-3.5-1-3.5-1s-1.5 1-3.5 1V17c0 3.5 3.5 4.5 3.5 4.5s3.5-1 3.5-4.5z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Health;
