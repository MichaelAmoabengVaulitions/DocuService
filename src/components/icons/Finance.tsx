import * as React from 'react';
import Svg, { Path , Ellipse} from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

const Finance: React.FC<IconProps> = ({
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
             <Ellipse
                    cx={15.5}
                    cy={11}
                    rx={6.5}
                    ry={2}
                    stroke={color}
                    strokeWidth={1.5}
                />
                <Path
                    d="M22 15.5c0 1.105-2.91 2-6.5 2s-6.5-.895-6.5-2"
                    stroke={color}
                    strokeWidth={1.5}
                />
                <Path
                    d="M22 11v8.8c0 1.215-2.91 2.2-6.5 2.2S9 21.015 9 19.8V11"
                    stroke={color}
                    strokeWidth={1.5}
                />
                <Ellipse
                    cx={8.5}
                    cy={4}
                    rx={6.5}
                    ry={2}
                    stroke={color}
                    strokeWidth={1.5}
                />
                <Path
                    d="M6 11c-1.892-.23-3.63-.825-4-2m4 7c-1.892-.23-3.63-.825-4-2"
                    stroke={color}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                />
                <Path
                    d="M6 21c-1.892-.23-3.63-.826-4-2V4M15 6V4"
                    stroke={color}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                />
        </Svg>    
    );
};

export default Finance;
