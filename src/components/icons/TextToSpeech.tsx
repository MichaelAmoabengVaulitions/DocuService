import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { WHITE } from "../../theme/Colors";
import { IconProps } from "./IconProps";

const TextToSpeech: React.FC<IconProps> = ({
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
        d="M16 17h-6M8 4v4M5 2v8M2 5v2m9-2v2M4 13c.002 4.152.048 6.275 1.318 7.612C6.636 22 8.758 22 13 22h.45c3.807 0 5.71 0 6.973-1.135.179-.161.346-.337.499-.526C22 19.01 22 17.007 22 13s0-6.012-1.078-7.34a4.623 4.623 0 00-.5-.526C19.32 4.14 17.726 4.016 14.8 4H14"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default TextToSpeech;
