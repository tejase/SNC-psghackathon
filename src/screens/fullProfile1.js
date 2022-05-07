import React, { Component } from 'react';
import { StyleSheet,
  View,
  Image,
  Animated,
  Dimensions,
  Keyboard,
  UIManager,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../components/header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import { Button, Text } from 'native-base';
import { f, store } from '../components/firebase';


const { State: TextInputState } = TextInput;

class fullProfile1 extends Component {


  state = {
    shift: new Animated.Value(0),
    photo: null,
    dp: true,
    bio: '',
    homeTown: '',
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.uri) {
        this.setState({ photo: response, dp: false });
        console.log(this.state.dp);
      }
    });
  };
Preview() {
  const user = f.auth().currentUser;
  console.log(user);
  if(user != null) {
  console.log('user is not null');
  console.log(this.state.bio);
  console.log(this.state.homeTown);
  store.collection('users').doc(user.uid).update({
    bio: this.state.bio,
    homeTown: this.state.homeTown,

  })
  .then(() => {
      console.log('Document successfully written!');
  })
  .catch((error) => {
      console.error('Error writing document: ', error);
  });
}
}
  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }



  render() {
    const { photo } = this.state;
    const { shift } = this.state;

    return (

      <Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
      <View style = {styles.back}>
      <View>
        <Header headerText="Set up Your profile." />
      </View><View style={{ maxHeight: hp('3')}}>
      <TouchableOpacity


          onPress={this.handleChoosePhoto}
      >
      <View style = {styles.image}>
      {photo && (
          <Image
        source={{ uri: photo.uri }}
        style={{ width: 100, height: 100, borderRadius: 40, borderWidth: 10,  }}
          />
        )}
      </View>

      {this.state.dp && (
      <ImageBackground

        source={require('../components/assets/images/profilepic1.png')}
        resizeMode='contain'
        style={styles.image}
      />
    )}
    </TouchableOpacity>
    </View>


      <ScrollView>

      <View style = {styles.main}>
        <View style = {styles.box}>


          <Text  style = {styles.heading}>Bio</Text>
          <TextInput
          value={this.state.bio}
          onChangeText={bio => this.setState({ bio })}
          placeholder='Bio (optional)'
          multiline={true}
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top'}}
          style={styles.inputBox}
          />

          <Text style = {styles.heading}>DOB</Text>
          <TextInput placeholder='Date of Birth' style={styles.inputBox}/ >

          <Text style = {styles.heading}>Hometown</Text>
          <TextInput
          value={this.state.homeTown}

          onChangeText={homeTown => this.setState({ homeTown })}
          placeholder='Hometown'
          style={styles.inputBox}
          / >

          <Button
            style={styles.button} warning
           onPress={() => this.Preview()}>
            <Text> Preview</Text>
          </Button>

        </View>
      </View>
  </ScrollView>
</View>
</Animated.View>

    );
  }


  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: -150,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }
    ).start();
  }
}



    export default (fullProfile1);


      const styles = StyleSheet.create({

        back: {
          backgroundColor:'white',
        },
        main: {
          marginTop: hp('3'),
          flex: 1,
        },

        heading: {
          fontSize: hp('2.1'),
          fontWeight: '500',
          marginTop: hp('10%'),

        },

        box: {
          marginLeft: hp('2'),
          marginRight: hp('2'),
          marginBottom: hp('3'),
          marginTop: hp('1.5'),
          flexDirection: 'column',
          justifyContent: 'space-around',
          //height: hp('100%'),

        },
          image:{
            alignItems: 'center',
            marginTop: hp('3'),
            height: hp(12),
            width: hp(60),
          },
          inputBox: {
            borderBottomWidth: 1,

            borderBottomColor: 'grey',
          },
          button: {


            color: '#9900ff',
            backgroundColor: '#9900ff',
            fontSize: 50,
            textAlign: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            borderRadius: 6,
            bottom: hp('1%')

            //right: '50%',

          },

      });
