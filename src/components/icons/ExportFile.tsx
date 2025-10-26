import * as React from "react";
import { Colors } from "@/constants/Colors";
import { IconProps } from "./IconProps";
import Svg, { Path } from "react-native-svg";

const ExportFile: React.FC<IconProps> = ({
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
        d="M4 7c.59.607 2.16 3 3 3 .84 0 2.41-2.393 3-3M7 9V2"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 13v1.544c0 3.245 0 4.868.886 5.967a4 4 0 00.603.603C6.59 22 8.211 22 11.456 22c.705 0 1.058 0 1.381-.114.067-.024.133-.051.197-.082.31-.148.559-.397 1.058-.896l4.736-4.736c.579-.579.867-.867 1.02-1.235.152-.368.152-.776.152-1.594V10c0-3.771 0-5.657-1.172-6.828C17.657 2 15.771 2 12 2m1 19.5V21c0-2.828 0-4.243.879-5.121C14.757 15 16.172 15 19 15h.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ExportFile;
