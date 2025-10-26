import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";

const Scan: React.FC<IconProps> = ({
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
        d="M2 7.986c.11-2.21.437-3.588 1.418-4.568.98-.98 2.358-1.308 4.568-1.418M22 7.986c-.11-2.21-.437-3.588-1.418-4.568-.98-.98-2.358-1.308-4.568-1.418m0 20c2.21-.11 3.588-.437 4.569-1.418.98-.98 1.308-2.358 1.417-4.568M7.986 22c-2.21-.11-3.588-.437-4.568-1.418-.98-.98-1.308-2.358-1.418-4.568M16.515 8.942c.317.576.485 1.21.485 1.857v2.882c0 1.134-.536 2.252-1.464 3.054C14.606 17.537 13.313 18 12 18m-5-6.722v2.403c0 1.258.654 2.496 1.801 3.321M14.5 6.579a5.696 5.696 0 00-3.794-.432c-1.28.297-2.373 1.02-3.036 2.013m5.996 3.318v-.887c.01-.636-.533-1.21-1.27-1.36m-2.063 2.626v1.524c-.005.28.094.555.283.788.59.728 1.91.811 2.624.154"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Scan;
