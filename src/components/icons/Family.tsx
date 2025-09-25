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
        d="M22 11.026c0-.493-.005-.986-.016-1.48-.065-3.075-.098-4.612-1.229-5.751-1.131-1.14-2.705-1.179-5.854-1.258-1.94-.05-3.862-.05-5.802 0-3.149.079-4.723.119-5.854 1.258-1.131 1.139-1.164 2.676-1.23 5.75a69.492 69.492 0 000 2.961c.066 3.075.099 4.613 1.23 5.752 1.057 1.064 2.5 1.168 5.255 1.242"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 5l6.913 3.925c2.526 1.433 3.648 1.433 6.174 0L22 5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M13.5 18.5c-.506-.491-2.5-1.8-2.5-2.5s1.994-2.008 2.5-2.5M22 21.5c-.116-2.524-.013-3.443-1.656-4.62-.808-.58-2.433-.961-4.626-.755m1.734-2.532l-2.297 2.153a.502.502 0 00-.003.706l2.3 2.188"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Health;
