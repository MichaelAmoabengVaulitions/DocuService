import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import createHapticFeedback from '../Utils/CreateHapticFeedback';

type TemplateTouchableProps = {
    children?: React.ReactNode,
    onPress?: ((...args: any[]) => void) | null,
    activeOpacity?: number,
    disabled?: boolean,
}

const TemplateTouchable: FC<TemplateTouchableProps> = ({
    children,
    onPress,
    activeOpacity,
    disabled,
    ...restProps
}) => {
    const onPressWithHaptic: (...values: any[]) => void = (...values) => {
        createHapticFeedback();
        if (onPress) {
            onPress(...values);
        }
    };
    return (
        <TouchableOpacity
            disabled={disabled}
            {...restProps}
            onPress={onPressWithHaptic}
            activeOpacity={disabled ? 0.6 : activeOpacity}
        >
            {children}
        </TouchableOpacity>
    );
};


export default TemplateTouchable;
