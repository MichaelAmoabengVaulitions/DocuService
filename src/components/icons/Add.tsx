import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "./IconProps";
import { Colors } from "@/constants/Colors";

const Add: React.FC<IconProps> = ({
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
        d="M4 12v2.545c0 3.245 0 4.867.886 5.966a4 4 0 00.603.603C6.59 22 8.211 22 11.456 22c.705 0 1.058 0 1.381-.113.067-.024.133-.052.197-.082.31-.148.559-.398 1.058-.896l4.736-4.737c.579-.578.867-.867 1.02-1.235.152-.367.152-.776.152-1.593V10c0-3.772 0-5.657-1.172-6.829-1.059-1.06-2.701-1.16-5.793-1.17M13 21.5V21c0-2.828 0-4.242.879-5.12C14.757 15 16.172 15 19 15h.5M12 6H4m4-4v8"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Add;
