import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

const House: React.FC<IconProps> = ({
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
                d="M20 8.585V13.5c0 3.772 0 5.657-1.172 6.829-.808.808-1.956 1.059-3.828 1.136M4 8.585V13.5c0 3.772 0 5.657 1.172 6.829 1.063 1.063 2.714 1.162 5.828 1.17a.998.998 0 001-.998v-3"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M22 10.5l-4.343-4.164C14.99 3.779 13.657 2.5 12 2.5S9.01 3.78 6.343 6.336L2 10.5M14.001 9v2.5m-4 0V9m-1.495 3.38c-.04-.475.37-.88.89-.88h5.214c.52 0 .93.405.89.88l-.107 1.298a5.164 5.164 0 01-.98 2.61l-.35.483c-.331.455-.889.73-1.486.73h-1.148c-.597 0-1.155-.275-1.486-.73l-.35-.483a5.163 5.163 0 01-.98-2.61l-.107-1.298z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
            />
        </Svg>    
    );
};

export default House;
