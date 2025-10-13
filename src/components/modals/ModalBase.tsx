import React from "react";
import { StyleSheet, ViewStyle, Modal } from "react-native";

import {
  BLACK,
  BLACK_30,
  BLACK_70,
  BLACK_90,
  DARK_FOREST_GREEN_20,
  DARK_FOREST_GREEN_30,
  DARK_FOREST_GREEN_50,
  PRIMARY,
  WHITE,
  WHITE_10,
  WHITE_20,
} from "../../theme/Colors";
import TemplateBox from "../TemplateBox";

export interface ModalBaseProps {
  onClose: () => void;
  isVisible: boolean;
  style?: ViewStyle | ViewStyle[] | null;
  children?: any;
}

const ModalBase: React.FC<ModalBaseProps> = ({
  isVisible,
  onClose,
  style,
  children,
  ...restProps
}) => (
  <Modal
    visible={isVisible}
    style={[styles.modal, style]}
    onRequestClose={onClose}
    presentationStyle="pageSheet"
    {...restProps}
    animationType="slide"
  >
    {children}
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: BLACK,
  },
});

export default ModalBase;
