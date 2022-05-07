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
  Picker,
  ScrollView,

  } from 'react-native';
import { Button, Text } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import Header from '../components/header';
import { f, store } from '../components/firebase';

// import RNFetchBlob from 'react-native-fetch-blob'

const { State: TextInputState } = TextInput;

// Prepare Blob support
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

// const uploadImage = (uri, mime = 'application/octet-stream') => {
//   return new Promise((resolve, reject) => {
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
//     const sessionId = new Date().getTime()
//     let uploadBlob = null
//     const imageRef = storage.ref('images').child(`${sessionId}`)

//     fs.readFile(uploadUri, 'base64')
//       .then((data) => {
//         return Blob.build(data, { type: `${mime};BASE64` })
//       })
//       .then((blob) => {
//         uploadBlob = blob
//         return imageRef.put(blob, { contentType: mime })
//       })
//       .then(() => {
//         uploadBlob.close()
//         return imageRef.getDownloadURL()
//       })
//       .then((url) => {
//         resolve(url)
//       })
//       .catch((error) => {
//         reject(error)
//     })
//   })
// }

class App extends Component {


  state = {
    shift: new Animated.Value(0),
    photo: null,
    dp: true,
    bio: '',
    homeTown: '',
    gender: 'Male',
    date: '',
    height:'',
    width:'',
    uploadURL:''
  };



  componentWillMount() { 
    const user = f.auth().currentUser;
    console.log(user);
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };

    ImagePicker.launchImageLibrary({}, response => {
      console.log('response', response);
      if (response.uri) {
        
        // uploadImage(response.uri)
        // .then(url => this.setState({ uploadURL: url }))
        // .catch(error => console.log(error))



        // this.setState({ photo: response.uri, 
        //                 dp: false,
        //                 height:response.height,
        //                 width:response.width, });
        // console.log(this.response);
        // console.log(this.state);
        // uploadImage(this.state.photo,"hello").then(url=>{
        //   console.log(url);
        // })

      }
    });
  };

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

    Preview() {
      const user = f.auth().currentUser;
      console.log("logging user")
      console.log(user);
      if (user != null) {
      console.log('user is not null uid printed');
      console.log(this.state.bio);
      console.log(this.state.homeTown);
      console.log(user.uid);

      


      // console.log(this.state.date);
      store.collection('users').doc(user.uid).update({
        bio: this.state.bio,
        homeTown: this.state.homeTown,
        rollNo: this.props.navigation.state.params.data,
        dob: this.state.date,
        gender: this.state.gender
      })
      .then(() => {
          console.log('Document successfully written!');
          this.props.navigation.navigate('Preview');
      })
      .catch((error) => {
          console.error('Error writing document: ', error);
      });
    }
    console.log(this.state);
    }

    onGenderChange(gender) {
    this.setState({
      gender
    });
    console.log(this.state);
  }


  render() {
    const { shift } = this.state;
    const { photo } = this.state;

    return (

        <ScrollView>
      <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>

<View style={styles.back}>
      <View>
        <Header headerText="Set up Your profile." />
      </View>

      <TouchableOpacity
          onPress={this.handleChoosePhoto}
      >
      <View style={{ width: wp('100%'), alignItems: 'center', marginTop: hp('3%') }}>
      {photo && (
          <Image
        source={{ uri: photo.uri }}
        style={{ width: 100, height: 100, borderRadius: 40, borderWidth: 10,  }}
          />
        )}

      {this.state.dp && (
      <Image
        source={require('../components/assets/images/profilepic1.png')}
        resizeMode='contain'
        style={{ height: hp('20%'), width: wp('30%'), alignSelf: 'center' }}
      />
    )}
    </View>
    </TouchableOpacity>

      <View style = {styles.main}>
        <View style = {styles.box}>

          <View style={styles.inputWithHead}>
          <Text style = {styles.heading}>Bio</Text>
          <TextInput placeholder='Bio (optional)'
          maxHeight ={120}
          multiline = {true}
          style={styles.inputBox}
          numberOfLines={4}
          value={this.state.bio}
          onChangeText={bio => this.setState({ bio })}
           />
          </View>
            <View style={{ flexDirection: 'row' }}>
          <View style={styles.inputWithHead}>
          <Text style={styles.heading}>Gender</Text>

              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.gender}
                onValueChange={this.onGenderChange.bind(this)}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
          </View>

          <View style={styles.inputWithHead}>
          <Text style = {styles.heading}>DOB</Text>
          <DatePicker style={styles.inputWithHead}
        style={{width: hp('30%')}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-01-1980"
        maxDate="01-01-2019"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: hp('0'),
            top: hp('-1.5'),
            marginLeft: hp('0'),
            marginTop: hp('3'),
          },
          dateInput: {
              marginLeft: hp('5'),
              marginTop: hp('2'),
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => { this.setState({ date }); }}
          />
          </View>
          </View>

          <View style={styles.inputWithHead}>
          <Text style={styles.heading}>Hometown</Text>
          <TextInput
          placeholder='Hometown'
          onChangeText={homeTown => this.setState({ homeTown })}
          style={styles.inputBox}
          value={this.state.homeTown}
          />

          </View>

        </View>
      </View>
      <View style={styles.inputWithHead}>
      <Button
      style={styles.button} warning
      onPress={() => this.Preview()}
      >
      <Text>Preview</Text>
      </Button>
      </View>

</View>

</Animated.View>
      </ScrollView>
    );
  }


}

    export default (App);


      const styles = StyleSheet.create({

        back: {
          backgroundColor:'white',
        },
        main: {
          marginTop: hp('3'),
          //flex: 1
        },

        heading: {
          fontSize: hp('2.1'),
          fontWeight: '500',

        },

        box: {
          marginLeft: hp(2),
          marginRight: hp(2),
          marginBottom: hp(3),
          marginTop: hp(1.5),
          flexDirection: 'column',
          justifyContent: 'flex-start',
          height: hp('50%'),

        },
          image: {
            alignItems: 'center',
            height: hp('2%'),
            width: wp('2%'),
            alignSelf: 'center',
            // marginTop: hp(3),

          },
          inputBox:{
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
          inputWithHead: {
            marginTop: hp('4%')
          }

      });
