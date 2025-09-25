import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

import Modal from "react-native-modal";
import {
  BLACK,
  BLACK_30,
  BLACK_70,
  BLACK_90,
  DARK_FOREST_GREEN_20,
  DARK_FOREST_GREEN_30,
  DARK_FOREST_GREEN_50,
  WHITE,
  WHITE_10,
  WHITE_20,
} from "../../theme/Colors";

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
    isVisible={isVisible}
    onSwipeComplete={onClose}
    onBackdropPress={onClose}
    style={[styles.modal, style]}
    animationIn="slideInUp"
    animationOut="slideOutDown"
    animationInTiming={500}
    animationOutTiming={500}
    backdropTransitionInTiming={500}
    {...restProps}
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
