import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {IcMobile} from '../assets/images/icons';
import {Black, FiraBold, FiraRegular, LightBlack} from '../config/theme';

function Loader() {
  return (
    <View style={styles.container}>
      <Image source={IcMobile} style={styles.image} />
      <Text style={styles.title}>Loading Product Data</Text>
      <Text style={styles.subtitle}>Please wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 48,
    height: 75,
    marginBottom: 28,
  },
  title: {
    fontSize: 20,
    fontFamily: FiraBold,
    color: Black,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FiraRegular,
    color: LightBlack,
  },
});

export default Loader;
