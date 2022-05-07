import React, { Component } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Image, TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Button, Thumbnail } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { f, store } from '../components/firebase';
var SharedPreferences = require('react-native-shared-preferences');

export default class App extends Component {



  static navigationOptions = {
    title: 'Profile View',
    headerStyle: {
      backgroundColor: '#9900ff',
      alignItems: 'center'

    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent: 'center',
      alignSelf: 'center',
      marginLeft: '35%'
    },
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      dp: true,
      fullname: '-',
      bio: '-',
      emailId: '-',
      gender: '-',
      homeTown: '-',
      rollNo: '-',
      dob: '-',
      uid: '-'
    };


    // this.setState({ fullname: '-', bio: '-' });



  }



  componentDidMount() {
    console.log('componentsdidmount');

    let temp_uid = ' ';
    let ref = this;
    SharedPreferences.getItems(['key', 'uid'], function (values) {
      if (values[0] === 'true') {
        temp_uid = values[1];
        ref.setState({
          uid:temp_uid
        })
      }
      else {
        console.log("User didnt login");
        //ref.props.navigation.navigate('Home');
      }

      console.log(temp_uid);

      console.log(ref.state);
    let cityRef = store.collection('users').doc(ref.state.uid);
    console.log(ref.state.uid);
    let getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());

          console.log('ce ckh', doc.data().fullName);
          const fullName = doc.data().fullName;
          const bio = doc.data().bio;
          const emailId = doc.data().emailId;
          const gender = doc.data().gender;
          const homeTown = doc.data().homeTown;
          const rollNo = doc.data().rollNo;
          const dob = doc.data().dob;
          const uid = ref.state.uid;

          ref.setState({
            fullname: fullName,
            bio: bio,
            emailId: emailId,
            gender: gender,
            homeTown: homeTown,
            rollNo: rollNo,
            dob: dob
          });

        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });


    });

    

    console.log(this.state);
  }


  handleClick() {
    var ref = this;
    alert('Button clicked!');
    console.log('button message pressed');
    SharedPreferences.getItem("uid", function (value) {
      console.log(value);
      console.log(ref.state.uid);

      let str1 = value;
      let str2 = ref.state.uid;

      if (str1 < str2)
        var roomId = str1.concat(str2);
      else
        var roomId = str2.concat(str1);

      console.log(roomId);

      let cityRef = store.collection('ichat').doc(roomId);
      let setWithOptions = cityRef.set({
        capital: true
      }, { merge: true });
    });
  }


  render() {
    console.log("rendering");
    console.log(this.state);

    const rollNo = this.state.rollNo;
    let res = rollNo.slice(0, 2);
    let d = new Date();
    const n = d.getFullYear();
    res = Number(res) + 2000;
    res = (n - res) + 1;
    res = res + ' year';

    let depCode = rollNo.slice(2, 4);
    let tempSec;
    if (depCode === 'pw' || depCode === 'PW') { depCode = 'Software Systems'; tempSec = '1 Section'; }



    const year = res;
    const dept = depCode;
    const section = tempSec;
    const location = this.state.homeTown;
    const date = this.state.dob;
    const name = this.state.fullname;
    const bio = this.state.bio;
    console.log('renser', this.state);

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bigView}>

          <View style={styles.mainCard}>
            <View style={{ width: '40%', height: '100%' }}>

              <Thumbnail
                large
                source={require('../components/assets/images/profilepic.jpg')}
                style={styles.profilePic}
              />
            </View>
            <View style={{ width: '60%', height: '100%' }}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.collDetWrap}>
                <Text style={{ color: '#969696', fontSize: wp('3%') }}>{year}  |  </Text>
                <Text style={{ color: '#969696', fontSize: wp('3%') }}>{dept}  |  </Text>
                <Text style={{ color: '#969696', fontSize: wp('3%') }}>{section}</Text>

              </View>

              <View style={styles.perDetWrap}>
                <Image
                  style={styles.icon}
                  source={require('../components/assets/images/location.png')}
                  resizeMode='contain'
                />
                <Text style={{ color: '#4d4d4d', fontSize: wp('3%') }}>{location}   </Text>
                <Image
                  style={styles.icon}
                  source={require('../components/assets/images/birthday-cake.png')}
                  resizeMode='contain'
                />
                <Text style={{ color: '#4d4d4d', fontSize: wp('3%') }}>  {date}</Text>

              </View>


            </View>

          </View>
          <View style={styles.messageCard} >
            <Button style={styles.button} onPress={this.handleClick}>
              <Text style={styles.buttonTextMessage}>Message</Text>
            </Button>
          </View>
          <View style={styles.bioCard}>
            <Text style={styles.cardTitle}>Bio</Text>
            <Text style={styles.Bio}>{bio}</Text>
          </View>



           <View style={styles.card}>
            <Text style={styles.cardTitle}>Alternate Reality</Text>
            <TouchableOpacity>
              {this.state.dp && (
                <Image
                  source={require('../components/assets/images/instagram.png')}
                  resizeMode='contain'
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.dp && (
                <Image
                  source={require('../components/assets/images/instagram.png')}
                  resizeMode='contain'
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.dp && (
                <Image
                  source={require('../components/assets/images/instagram.png')}
                  resizeMode='contain'
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.dp && (
                <Image
                  source={require('../components/assets/images/instagram.png')}
                  resizeMode='contain'
                  style={styles.image}
                />
              )}
            </TouchableOpacity>
          </View>
          <Button style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </Button>
        </View>  

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  bigView: {
    marginTop: hp('10%'),
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  card: {
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: wp('90%'),
    height: hp('25%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: hp('1%'),
    paddingLeft: hp('3%'),
    elevation: 5,
    marginBottom: hp('2%'),
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },
  cardTitle: {
    fontSize: hp('2%'),
    color: '#a6a6a6',


  },
  button: {

    color: 'white',
    backgroundColor: '#9900ff',
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 6,
    marginBottom: hp('5%'),
    width: wp('40%'),
  },
  buttonText: {
    color: 'white',
    fontSize: hp('2.8%'),
    paddingLeft: '35%'


  },
  buttonTextMessage: {
    color: 'white',
    fontSize: hp('2.8%'),
    paddingLeft: '23%'


  },
  Bio: {
    marginTop: hp('2%'),
    color: '#666666'

  },
  mainCard: {
    width: wp('90%'),
    height: hp('22%'),
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    marginBottom: hp('2%'),
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
    flexDirection: 'row'
  },
  image: {

    marginTop: hp('3'),
    height: hp(5),
    width: hp(5),
    marginLeft: '5%',
    left: hp(-15),
  },
  name: {
    marginTop: hp('5%'),
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginLeft: wp('2%')
  },
  collDetWrap: {
    flexDirection: 'row',
    marginLeft: wp('2%'),

  },
  perDetWrap: {
    marginTop: '10%',
    flexDirection: 'row',
    marginLeft: wp('2%'),
    textAlign: 'center',
    alignItems: 'center'

  },
  icon: {
    height: hp('5%'),
    width: wp('5%')
  },
  profilePic: {
    height: '65%',
    width: '65%',
    overflow: 'hidden',
    marginTop: '20%',
    marginLeft: '20%'
  },
  bioCard: {
    width: wp('90%'),
    //height: hp('25%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: hp('1%'),
    paddingLeft: hp('3%'),
    paddingBottom: hp('5.5%'),
    elevation: 5,
    marginBottom: hp('2%'),
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },
  messageCard: {
    width: wp('90%'),
    height: hp('10%'),
    //height: hp('25%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: hp('1%'),
    paddingLeft: hp('3%'),
    paddingBottom: hp('5.5%'),
    elevation: 5,
    marginBottom: hp('2%'),
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
  },


});
