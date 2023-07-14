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
  disabled: boolean;
}
const ButtonQTY = ({backgroundColor, onPress, textBtn, disabled}: Props) => {
  const buttonStyles: StyleProp<ViewStyle> = backgroundColor
    ? {backgroundColor: disabled ? Grey : backgroundColor}
    : {};
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.btn, buttonStyles]}>
      <Text style={styles.textBtn}>{textBtn}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: Grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    fontSize: 20,
    fontFamily: FiraBold,
    color: White,
  },
});
export default ButtonQTY;
