import { Colors } from "@/constants/Colors";
import React, { useRef, useEffect, FC } from "react";
import { TextInput, StyleSheet } from "react-native";

interface TemplateTextInputProps {
  focus?: boolean;
  disabled?: boolean;
  placeholderTextColor?: string;
  placeholderStyle?: object;
  value?: string;
  style?: object;
  [key: string]: any;
}

const TemplateTextInput: FC<TemplateTextInputProps> = ({
  focus,
  children,
  disabled,
  placeholderTextColor,
  placeholderStyle,
  value,
  style,
  ...restProps
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (focus) {
      ref.current.focus();
    }
  }, [focus]);

  return (
    <TextInput
      {...restProps}
      ref={ref}
      selectionColor={Colors.WHITE}
      placeholderTextColor={placeholderTextColor || Colors.WHITE}
      value={value}
      editable={!disabled}
      style={[
        styles.default,
        restProps.style && restProps.style,
        !value && placeholderStyle,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    color: Colors.WHITE,
    fontSize: 15,
    borderRadius: 30,
    backgroundColor: Colors.WHITE_10,
    borderWidth: 0.6,
    borderColor: Colors.WHITE_20,
    height: 54,
    paddingHorizontal: 16,
  },
});

export default TemplateTextInput;
