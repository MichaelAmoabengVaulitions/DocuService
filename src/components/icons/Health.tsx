import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

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
                d="M15.994 5.498a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                stroke={color}
                strokeWidth={1.5}
            />
            <Path
                d="M21 3c-.5 2-1.5 5-6 6-3.514.781-6.5 1-8 4"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M13.5 9.5S13 20.5 5 21M17 8.5S17.5 17 3 17"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>    
    );
};

export default Health;
