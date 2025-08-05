import React from 'react';
import PropTypes from 'prop-types';
import { BLACK } from '../../theme/Colors';
import DynamicIcon from '../icons/DynamicIcon';
import TemplateBox from '../TemplateBox';
import { StyleSheet } from 'react-native';

const TabButton = ({ icon , color}) => (
    
        <DynamicIcon
            name={icon}
            size={24}
            color={color}
            style={styles.icon}
        />

);

TabButton.propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
};

TabButton.defaultProps = {
    color: BLACK,
};

const styles = StyleSheet.create({
    icon : {
        marginBottom: 4
    }
})

export default TabButton;
