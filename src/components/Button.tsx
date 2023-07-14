import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {FiraBold, Grey, White} from '../config/theme';

interface Props {
  backgroundColor: string;
  textBtn: String;
  onPress: () => void;
  disabled?: boolean;
}
const Button = ({backgroundColor, onPress, textBtn, disabled}: Props) => {
  const buttonStyles: StyleProp<ViewStyle> = backgroundColor
    ? {backgroundColor: disabled ? Grey : backgroundColor}
    : {};
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, buttonStyles]}>
      <Text style={styles.textBtn}>{textBtn}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    backgroundColor: Grey,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textBtn: {
    fontSize: 16,
    fontFamily: FiraBold,
    color: White,
  },
});
export default Button;
