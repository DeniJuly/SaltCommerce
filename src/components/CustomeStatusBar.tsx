import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

interface Props {
  backgroundColor: string;
}
const CustomeStatusBar = ({backgroundColor}: Props) => {
  return (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar backgroundColor={backgroundColor} translucent />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default CustomeStatusBar;
