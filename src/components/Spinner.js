import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
   heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    top: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
