import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

const Social: React.FC<IconProps> = ({
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
                d="M19.5 20v-3.5c1.086 0 1.7 0 1.919-.474.22-.474-.024-1.123-.51-2.42l-1.241-3.317C19.258 9.193 18.418 8.5 17.5 8.5c-.918 0-1.757.693-2.168 1.789l-1.242 3.317c-.485 1.297-.728 1.946-.509 2.42.22.474.832.474 1.918.474V20c0 .943 0 1.414.293 1.707.293.293.765.293 1.708.293.942 0 1.414 0 1.707-.293.293-.293.293-.764.293-1.707z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinejoin="round"
            />
            <Path
                d="M8.5 4a2 2 0 11-4 0 2 2 0 014 0zM19.5 4a2 2 0 11-4 0 2 2 0 014 0z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M10.5 12.5c0-1.886 0-2.828-.586-3.414C9.328 8.5 8.386 8.5 6.5 8.5c-1.886 0-2.828 0-3.414.586C2.5 9.672 2.5 10.614 2.5 12.5v2c0 .943 0 1.414.293 1.707.293.293.764.293 1.707.293V20c0 .943 0 1.414.293 1.707C5.086 22 5.557 22 6.5 22c.943 0 1.414 0 1.707-.293.293-.293.293-.764.293-1.707v-3.5c.943 0 1.414 0 1.707-.293.293-.293.293-.764.293-1.707v-2z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinejoin="round"
            />
        </Svg>    
    );
};

export default Social;
