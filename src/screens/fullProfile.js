import React, { Component } from 'react';
import { View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground } from 'react-native';
import { Button, Text } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import ImagePicker from 'react-native-image-picker';
import {
   widthPercentageToDP as wp,
   heightPercentageToDP as hp
 } from 'react-native-responsive-screen';

 import { f, store } from '../components/firebase';


const fields = [
  {
      type: 'group',
      name: 'Personal Details',
      label: 'Personal Details',
      fields: [
        // {
        //   type: 'text',
        //   name: 'RollNo',
        //   required: true,
        //   icon: 'ios-person',
        //   label: 'RollNo',
        // },

        {
     type: 'date',
     mode: 'date',
     name: 'Date of birth',
     icon: 'ios-person',
     label: 'DOB',

     required: true,
     maxDate: new Date(2002, 12, 31),
     minDate: new Date(1990, 31, 12),


   },

        {

          type: 'picker',
          name: 'Gender',
          // mode: 'dialog',
          label: 'Select Gender',
          defaultValue: 'Male',

          options: ['Male', 'Female', 'Other'],
        },

      ],
    },

];

const fields1 = [
  {
    type: 'text',
    name: 'fb',

    icon: 'logo-facebook',
    label: 'facebook id',
  },

{
  type: 'text',
  name: 'insta',
  icon: 'logo-instagram',
  required: true,
  label: 'instagram id',
},


];
const fields2 = [
  {
    type: 'text',
    name: 'bio',
     maxLength: '400',
    icon: 'ios-cafe',
    label: 'bio',

    multiline: 'false',


  },


];
class fullProfile extends Component {
  state ={
    photo: null,
    dp: true,
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('response', response);
      if (response.uri) {
        this.setState({ photo: response, dp: false });
      }
    });
  };
   Preview() {
     const user = f.auth().currentUser;
      console.log(user);
     if (user != null) {
       store.collection('users').doc(user.uid).update({
         gender: fields[0].value.Gender,
         rollNo: this.props.navigation.state.params.data,
         bio: fields2[0].value,
         facebookId: fields1[0].value,
         instagramId: fields1[1].value,
     })
     .then(() => {
         console.log('Document successfully written!');

       this.props.navigation.navigate('Sample');
     })
     .catch((error) => {
         console.error('Error writing document: ', error);
     });

   }
 }
   render() {
     const { photo } = this.state;
    return (


      <View style={styles.Container}>

        <Text style={styles.logoText}>Set up your profile.</Text>
        <View style={{ flexDirection: 'row', padding: 20 }}>

          <TouchableOpacity
              style={styles.icon}
              onPress={this.handleChoosePhoto}
          >
          <View style={{ flex: 1, }}>
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
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields2}
          />

        </View>


          <View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>



          </View>
          </View>
          <ScrollView scrollEventThrottle={16} bounces >


<View>
          <GenerateForm
            ref={(c) => {
              this.formGenerator = c;
            }}
            fields={fields}
          />
        </View>
        <View>
          <Text style={styles.semiheading}>Social Media Links</Text>
        </View>
        <View>
                  <GenerateForm
                    ref={(c) => {
                      this.formGenerator = c;
                    }}
                    fields={fields1}
                  />
                </View>
                <View style={styles.submitButton}>
          <Button
            style={styles.button} warning
           onPress={() => this.Preview()}>
            <Text> Preview</Text>
          </Button>
        </View>
<View>


     <Button style={styles.buttonDup} warning ><Text>  </Text></Button>


<Button style={styles.buttonDup} warning ><Text>  </Text></Button>
<Button style={styles.buttonDup} warning ><Text>  </Text></Button>
<Button style={styles.buttonDup} warning ><Text>  </Text></Button>
<Button style={styles.buttonDup} warning ><Text>  </Text></Button>
<Button style={styles.buttonDup} warning ><Text>  </Text></Button>
<Button style={styles.buttonDup} warning ><Text>  </Text></Button>
<Button style={styles.buttonDup} warning ><Text>  </Text></Button>
<Button style={styles.buttonDup} warning ><Text>  </Text></Button>


        </View>
</ScrollView>
</View>

    );
  }
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  semiheading: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginTop: '2%',
    marginLeft: '5%',

  },
  submitButton: {
    top: '0%',
    width: '40%',
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',

  },

  logoText: {
    color: 'black',
    fontSize: 30,
    fontWeight: '500',
    marginTop: '11%',
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',


  },
  text: {
    color: '#121212',
    fontSize: 30,
    textAlign: 'left',
  },
  image: {

    width: '100%',
    height: '100%',
  },
  buttonDup: {

    width: '100%',
    color: '#fff',
    backgroundColor: '#F8F8F8',
    fontSize: 50,
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',

    //right: '50%',

  },
  button1: {

    width: '50%',
    color: '#fff',
    backgroundColor: '#F8F8F8',
    fontSize: 50,
    textAlign: 'center',
    height: '10%',


    //right: '50%',

  },
  toastText: {
    top: '15%',

    color: '#121212',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  materialButtonDanger: {
    width: 100,
    height: 36,
    position: 'absolute',
    left: 145.85,
    top: 612.17
  },
  text4: {
    top: 712.48,
    left: 81.97,
    position: 'absolute',
    color: '#121212'
  },
  hyperlink: {
    color: 'red',
    fontSize: 15,
    top: '5%',
    textAlign: 'center',

  },
  icon: {
  paddingLeft: 8,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',

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

export default fullProfile;
