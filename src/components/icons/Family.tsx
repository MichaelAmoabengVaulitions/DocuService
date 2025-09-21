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
                d="M15.59 17.74c-.629.422-2.277 1.282-1.273 2.358.49.526 1.037.902 1.723.902h3.92c.686 0 1.233-.376 1.723-.902 1.004-1.076-.644-1.936-1.273-2.357a4.29 4.29 0 00-4.82 0zM20 12.5a2 2 0 11-4 0 2 2 0 014 0z"
                stroke={color}
                strokeWidth={1.5}
            />
             <Path
                d="M10 6h5m-5-3h8M7 9.5V14c0 .943 0 1.414-.293 1.707C6.414 16 5.943 16 5 16H4c-.943 0-1.414 0-1.707-.293C2 15.414 2 14.943 2 14v-2.5c0-.943 0-1.414.293-1.707C2.586 9.5 3.057 9.5 4 9.5h3zm0 0h5"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M6.5 5a2 2 0 11-4 0 2 2 0 014 0z"
                stroke={color}
                strokeWidth={1.5}
            />
        </Svg>    
    );
};

export default Health;
