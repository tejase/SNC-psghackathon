import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/header';
import MainProfile from './mainProfile';

class App extends Component {
  render() {
    return (
      <View>
 <Header headerText="Let's get started." />
 <MainProfile />
 </View>
    );
  }
}

export default App;
