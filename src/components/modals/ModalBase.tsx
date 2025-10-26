import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, ViewStyle, Modal } from "react-native";

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
    backgroundColor: Colors.BLACK,
  },
});

export default ModalBase;
