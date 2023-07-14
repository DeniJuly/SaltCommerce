import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import {Black, FiraBold, Grey, White} from '../config/theme';

interface Props {
  color: string;
  textBtn: String;
  onPress: () => void;
  disabled?: boolean;
}
const ButtonOutline = ({color, onPress, textBtn, disabled}: Props) => {
  const buttonStyles: StyleProp<ViewStyle> = {
    borderColor: disabled ? Grey : color || Black,
  };
  const textStyles: StyleProp<TextStyle> = {
    color: disabled ? Grey : color || Black,
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, buttonStyles]}>
      <Text style={[styles.textBtn, textStyles]}>{textBtn}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 50,
    backgroundColor: White,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
  },
  textBtn: {
    fontSize: 16,
    fontFamily: FiraBold,
    color: White,
  },
});
export default ButtonOutline;
