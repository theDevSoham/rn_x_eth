/* eslint-disable prettier/prettier */
import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';

type StatusBarProps = {
  backgroundColor: string;
  barStyle: 'default' | 'light-content' | 'dark-content';
};

const CatchyStatusBar: React.FC<StatusBarProps> = ({backgroundColor, barStyle}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />
  </View>
);

const styles = StyleSheet.create({
  statusBar: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CatchyStatusBar;
