import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { WHITE } from '../../theme/Colors';
import { IconProps } from './IconProps';

const Work: React.FC<IconProps> = ({
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
                d="M12 15v1.5M3 15c.15 2.933.306 4.472 1.398 5.445C5.583 21.5 7.43 21.5 11.126 21.5h1.748c3.695 0 5.543 0 6.728-1.055C20.694 19.472 20.85 17.933 21 15"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2.847 10.443C4.547 13.674 8.38 15 12 15c3.62 0 7.453-1.326 9.153-4.557C21.964 8.901 21.35 6 19.352 6H4.648c-1.998 0-2.612 2.9-1.8 4.443zM16 6l-.088-.31c-.44-1.54-.66-2.31-1.184-2.75-.524-.44-1.22-.44-2.611-.44h-.234c-1.391 0-2.087 0-2.611.44s-.744 1.21-1.184 2.75L8 6"
                stroke={color}
                strokeWidth={1.5}
            />
        </Svg>    
    );
};

export default Work;
