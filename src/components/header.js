import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
 } from 'react-native-responsive-screen';


class LoginForm extends Component {

  render() {
    return (

<Text style={styles.logoText}>{this.props.headerText}</Text>

    );
  }
}
export default LoginForm;

const styles = StyleSheet.create({
  logoText: {
  color: 'black',
  fontSize: hp('4.5'),
  fontWeight: '500',
  marginTop: hp('5'),
  marginLeft: hp('10'),
  }

});
