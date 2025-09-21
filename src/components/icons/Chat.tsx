import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

const Chat: React.FC<IconProps> = ({
    color = WHITE,
    size,
    style,
    ...props
}) => {
    const ratio = 22 / 22;

    return (
        <Svg
            width={size}
            height={size && size / ratio}
            style={style}
            viewBox="0 0 22 22"
            fill="none"
            {...props}
        >
           <Path
                d="M11.995 12h.01M8 12h.009M22 11.567c0 5.283-4.478 9.566-10 9.566-.65.001-1.297-.059-1.935-.178-.459-.087-.688-.13-.848-.105-.16.024-.388.145-.842.386a6.5 6.5 0 01-4.224.657 5.292 5.292 0 001.087-2.348c.1-.53-.148-1.045-.52-1.422C3.034 16.411 2 14.105 2 11.567 2 6.284 6.478 2 12 2c.685 0 1.354.066 2 .191"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M20.839 2.476l.692.693a1.5 1.5 0 010 2.121l-3.627 3.696a2 2 0 01-1.047.552l-2.249.488a.5.5 0 01-.595-.594l.479-2.235a2 2 0 01.552-1.047l3.673-3.674a1.5 1.5 0 012.122 0z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>    
    );
};

export default Chat;
