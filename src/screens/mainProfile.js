import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { TextField } from 'react-native-material-textfield';

import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
 } from 'react-native-responsive-screen';
import { Spinner } from '../components/Spinner';
import { f, store } from '../components/firebase';
var SharedPreferences = require('react-native-shared-preferences');

class mainProfile extends Component {

state = { email: '', password: '', error: '', fullname: '', username: '', loading: false }

onSignUpSuccess() {
  const { fullname, username, email } = this.state;
  const user = f.auth().currentUser;
  console.log('Success');
  if (user != null) {
    store.collection('users').doc(user.uid).set({
      fullName: fullname,
      userName: username,
      emailId: email,
  })
  .then(() => {
      console.log('Document successfully written!');
      console.log(user.uid);
      console.log('Success');

    SharedPreferences.setItem('key', 'true');
    SharedPreferences.setItem('mail', this.state.email);
    SharedPreferences.setItem('uid', user.uid);
      this.setState({
    error: '',
    email: '',
    password: '',
    fullname: '',
    username: '',
    loading: false
    });
    this.props.navigation.navigate('FullProfile', { data: this.props.navigation.state.params.data });

  })
  .catch((error) => {
      console.error('Error writing document: ', error);
  });
  console.log(user);
}
}

signInUser() {
  const { email, password, fullname, username } = this.state;
  this.setState({ error: '', loading: true });
if (fullname && username) {
  f.auth().createUserWithEmailAndPassword(email, password).then(this.onSignUpSuccess.bind(this))
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
         warning onPress={this.signInUser.bind(this)}
      >
      <Text>   Done!   </Text>
      </Button>
    );
}

  render() {
    return (
<View style={styles.container}>

<TextField
label='Full Name'
value={this.state.fullname}
onChangeText={fullname => this.setState({ fullname })}
/>

<TextField
label='Username'
value={this.state.username}
onChangeText={username => this.setState({ username })}
/>

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
