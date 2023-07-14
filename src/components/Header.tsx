import React, {Fragment} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {IcMobileWhite} from '../assets/images/icons';
import {
  ContentPadding,
  FiraBold,
  FiraRegular,
  Primary,
  White,
} from '../config/theme';
import CustomeStatusBar from './CustomeStatusBar';

interface Props {
  product: number;
}
const Header = ({product}: Props) => {
  return (
    <Fragment>
      <CustomeStatusBar backgroundColor={Primary} />
      <View style={styles.header}>
        <Image source={IcMobileWhite} style={styles.logo} />
        <View>
          <Text style={styles.title}>Product List</Text>
          {product ? (
            <Text style={styles.subtitle}>{product.toString()} Products</Text>
          ) : null}
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Primary,
    paddingHorizontal: ContentPadding,
    paddingVertical: 23,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  logo: {
    width: 18,
    height: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: FiraBold,
    color: White,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FiraRegular,
    color: White,
  },
});
export default Header;
