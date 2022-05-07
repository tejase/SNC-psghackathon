import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

import Header from '../components/header';
import { Spinner } from '../components/Spinner';
import { f, auth } from '../components/firebase';

var SharedPreferences = require('react-native-shared-preferences');

class mainProfile extends Component {

state = { email: '', password: '', error: '', loading: false }

onSignUpSuccess() {
  console.log('Success');
  var user = f.auth().currentUser;

  if (user) {
    // User is signed in.
    var uid = user.uid;
    SharedPreferences.setItem('uid', user.uid);
  } else {
    // No user is signed in.
  }
SharedPreferences.setItem('key', 'true');
SharedPreferences.setItem('mail', this.state.email);


this.setState({
error: '',
email: '',
password: '',
loading: false
});

this.props.navigation.navigate('Sample');
}

logInUser() {
  const { email, password } = this.state;
  this.setState({ error: '', loading: true });
if (email && password) {
  f.auth().signInWithEmailAndPassword(email, password).then(this.onSignUpSuccess.bind(this))
  .catch((e) => {
  this.setState({ error: e.message, loading: false });
});
} else {
  this.setState({ error: 'Please fill all the credentials ', loading: false });
}
}

renderbutton() {
  if (this.state.loading) {
    return (
      <Spinner />
    );
  }
    return (
      <Button
      style={styles.button}
         warning onPress={this.logInUser.bind(this)}
      >
      <Text>   Next </Text>
      </Button>
    );
}
  render() {

SharedPreferences.getItems(['key', 'mail'], (values) => {
  console.log(values);
  if (values[0] === 'true') console.log('User Already logged in ');
});
    return (
<View style={styles.container}>
<Header headerText="Welcome back." />
<TextField
label='Email ID'
value={this.state.email}
onChangeText={email => this.setState({ email })}
/>

<TextField
secureTextEntry
label='Password'
value={this.state.password}
onChangeText={password => this.setState({ password })}
/>
<Text style={styles.error} >{this.state.error}</Text>
{this.renderbutton()}
</View>
          );
  }
}
export default withNavigation(mainProfile);


const styles = StyleSheet.create({
container: {
   height: '100%',
   flexDirection: 'column',
   marginLeft: '6%',
    marginRight: '6%'
},
button: {

  top: hp('8%'),
  color: '#9900ff',
  backgroundColor: '#9900ff',
  fontSize: 50,
  textAlign: 'center',
  alignSelf: 'center',
  alignContent: 'center',
  borderRadius: 6

  //right: '50%',

},
error: {
  textAlign: 'center',
  top: hp('3%'),
  color: '#FF9494',
  fontWeight: '900',
  fontSize: hp('3%')
}

});
