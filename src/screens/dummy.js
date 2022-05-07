import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
var SharedPreferences = require('react-native-shared-preferences');

class Dummy extends Component {

  static navigationOptions = {
        header: null
    }



constructor(props) {
  super(props);
  const ref = this;
  console.log("dummy");
  SharedPreferences.getItems(['key', 'mail'], function (values) {
    console.log(values);
    if (values[0] === 'true') {
 console.log('User Already logged in ');
     ref.props.navigation.navigate('Sample');
    console.log(ref.props);
  }
  else {
    console.log("User didnt login");
    ref.props.navigation.navigate('Home');
  }
    // this - > curr
  });
}
   render() {
    return (

        <Text>A social network for {'\n'}PSG.</Text>

    );
  }



}


export default withNavigation(Dummy);
