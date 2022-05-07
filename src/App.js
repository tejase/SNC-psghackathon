import React, { Component } from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUpScreen from './screens/App';
import HomePage from './screens/homepage';
 import Barcode from './screens/barcodeScanner';
// import Scrape from './components/cheerio';
import Sample from './screens/home';
import Login from './screens/login';
import FullProfile from './screens/fullProfile2';
import Preview from './screens/preview';
import Dummy from './screens/dummy'
import changeProfile from './screens/changeProfile'
import Students from './screens/students'


class App extends Component {

  render() {
    return (
      <AppContainer />
    );
  }
}


const RootStack = createStackNavigator({

  Dummy: {
    screen: Dummy
  },
  Home: {
    screen: HomePage
  },
  Signup: {
    screen: SignUpScreen
    },
  Sample: {
    screen: Sample
  },
  Login: {
    screen: Login
  },
  FullProfile: {
    screen: FullProfile
  },
  Barcode: {
      screen: Barcode
    },
    Preview: {
      screen: Preview
    },
    changeProfile: {
      screen: changeProfile
    },
    Students: {
      screen : Students
    }

  });

const AppContainer = createAppContainer(RootStack);
export default App;
