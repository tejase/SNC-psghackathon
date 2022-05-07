import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'native-base';
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
 } from 'react-native-responsive-screen';


class App extends Component {

  static navigationOptions = {
        header: null
    }

   render() {
    return (

      <View style={styles.Container}>

        <Text style={styles.logoText}>A social network for {'\n'}PSG.</Text>


          <Image
            style={styles.image}
            source={require('../components/assets/images/Capture.png')}
            resizeMode='contain'


          />

  <Text style={styles.semiheading}>Welcome{'\n'}to{'\n'}Project SNC.</Text>

        <Text
          style={styles.hyperlink}
          onPress={
         () => this.props.navigation.navigate('Login')}
        >Already have an account</Text>


     <Button
        style={styles.button} warning onPress={
       () => this.props.navigation.navigate('Barcode')}
     >
     <Text> Sign Up</Text>
     </Button>


        <Text style={styles.toastText}>
          Best virtual place for your college life
        </Text>

</View>


    );
  }
}
const styles = StyleSheet.create({

  semiheading: {
    color: 'black',
    fontSize: hp('4%'),
    fontWeight: '500',
    marginTop: hp('2%'),
    marginLeft: wp('10%'),

  },

  logoText: {
    color: 'black',
    fontSize: hp('4.5%'),
    fontWeight: '500',
    marginTop: hp('6%'),
    marginLeft: wp('10%'),

  },
  image: {

    width: wp('100%'),
    height: hp('29%')
  },
  button: {

    top: hp('10%'),
    color: '#9900ff',
    backgroundColor: '#9900ff',
    fontSize: 50,
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 6

    //right: '50%',

  },
  toastText: {
    top: hp('15%'),
    fontSize: hp('2.3%'),
    textAlign: 'center',
    alignSelf: 'center',
    color: 'grey',
    alignContent: 'center',
  },

  hyperlink: {
    color: 'red',
    fontSize: hp('2.3%'),
    top: hp('5%'),
    textAlign: 'center',
    textDecorationLine: 'underline'

  },
});

export default App;
