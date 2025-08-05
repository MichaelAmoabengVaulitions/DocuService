import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

const Transport: React.FC<IconProps> = ({
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
                d="M6 19l-2 2m14-2l2 2M9 15h.009m5.982 0H15"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M5 9c4 4 10.5 4 14 0M5.273 7.894C6.094 3.716 7.23 3 11.454 3h1.091c4.225 0 5.36.716 6.182 4.894l.553 2.816c.755 3.84 1.132 5.76.032 7.025C18.212 19 16.142 19 12 19c-4.141 0-6.212 0-7.312-1.265-1.1-1.264-.723-3.185.032-7.025l.553-2.816z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinejoin="round"
            />
        </Svg>    
    );
};

export default Transport;
