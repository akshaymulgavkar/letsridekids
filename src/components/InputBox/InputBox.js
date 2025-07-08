import React from 'react';
import {View, TextInput} from 'react-native';

import {styles} from './InputBox.Styles';

export const InputBox = ({
  mainViewStyle,
  textInputStyle,
  placeholder,
  placeholderTextColor,
  rightIcon,
  rightIconViewStyle,
  leftIconViewStyle,
  leftIcon,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, mainViewStyle]}>
      <View style={[styles.leftViewStyle, leftIconViewStyle]}>
        {leftIcon}
      </View>

      <TextInput
        {...textInputProps}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[styles.textInputStyle, textInputStyle]}
      />

      <View style={[styles.rightViewStyle, rightIconViewStyle]}>
        {rightIcon}
      </View>
    </View>
  );
};
