import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

const Language: React.FC<IconProps> = ({
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
                d="M22 11.567c0 5.283-4.478 9.566-10 9.566-.65.001-1.297-.059-1.935-.178-.459-.087-.688-.13-.848-.105-.16.024-.388.145-.842.386a6.5 6.5 0 01-4.224.657 5.292 5.292 0 001.087-2.348c.1-.53-.148-1.045-.52-1.422C3.034 16.411 2 14.105 2 11.567 2 6.284 6.478 2 12 2s10 4.284 10 9.567z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinejoin="round"
            />
            <Path
                d="M8 8.241h4m4 0h-1.429m-2.571 0h2.571m-2.571 0V7m2.571 1.241c-.469 1.698-1.45 3.303-2.571 4.713M9.143 16c.906-.844 1.929-1.878 2.857-3.046m0 0c-.571-.678-1.371-1.776-1.6-2.272m1.6 2.272l1.714 1.805"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>    
    );
};

export default Language;
