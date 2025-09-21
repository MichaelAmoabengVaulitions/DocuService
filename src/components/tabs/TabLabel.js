import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
    WHITE,
    ERROR_RED,
    WHITE_50,
    IOS_BLUE,
} from '../../theme/Colors';
import TemplateText from '../TemplateText';
import TemplateBox from '../TemplateBox';

const TabLabel = ({ focused, children, showNotification }) => (
    <TemplateBox row center mb={10}>
        <TemplateText
            semiBold
            center
            style={[
                styles.label,
                focused ? styles.activeLabel : styles.inactiveLabel,
            ]}
        >
            {children}
        </TemplateText>
        {!!showNotification && (
            <TemplateBox
                width={4}
                height={4}
                borderRadius={4}
                zIndex={999}
                backgroundColor={ERROR_RED}
                style={styles.dot}
            />
        )}
    </TemplateBox>
);

TabLabel.propTypes = {
    children: PropTypes.node.isRequired,
    focused: PropTypes.bool,
    showNotification: PropTypes.number,
};

TabLabel.defaultProps = {
    focused: false,
    showNotification: 0,
};

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: -14,
    },
    activeLabel: {
        color: IOS_BLUE,
    },
    inactiveLabel: {
        color: WHITE_50,
    },
    dot: {
        marginLeft: 4,
        marginTop: -10,
    },
});

export default TabLabel;
