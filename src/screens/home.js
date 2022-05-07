import React, { Component } from 'react';
import { View, 
         StyleSheet,
         FlatList, 
         ActivityIndicator,
         TouchableOpacity   } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { Button, Text } from 'native-base';
import { f, store } from '../components/firebase';
import Header from '../components/header';


import { Spinner } from '../components/Spinner';

class Sample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  



  componentDidMount() {

    this.setState({
      loading: true
    })
    var ref = this;
    
    const db = f.firestore();
    console.log('im in');
    let citiesRef = db.collection('departmentName');

    let allCities = citiesRef.get()
      .then(snapshot => {

        this.setState({
          loading:false
        })

        var arr =this.state.data;
        snapshot.forEach(doc => {

          arr.push(doc.data().full_form);
          ref.arrayholder.push(doc.data().full_form);
          ref.setState({
            data: arr
          });
          console.log(ref.state.data)

        });
       
      })
      .catch(err => {
        this.setState({
          loading:false
        })
        console.log('Error getting documents', err);
      });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };


  searchFilterFunction = text => {

    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Departments.."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  department = (deptName) => {
    this.props.navigation.navigate('Students', { data: deptName });
    console.log(deptName);

    

 };

  

  render() {
    // if (this.state.loading) {
    //   return (
    //     <Spinner />
    //   );
    // }

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Spinner />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
           
            <ListItem
              onPress ={() => this.department(item)}
              // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={`${item}`}
              // subtitle={item.email}
            />

          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    top: 50,
    color: '#9900ff',
    backgroundColor: '#9900ff',
    fontSize: 50,
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 6

    //right: '50%',

  }
});

export default Sample;


// import React, { Component } from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';

// export default class Sample extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={[
//             {key: 'Devin'},
            
//           ]}
//           renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
//         />
//         <FlatList
//           data={[
//             {key: 'Devin'},
            
//           ]}
//           renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
//         />
//         <FlatList
//         data={[
//           {key: 'Devin'},
          
//         ]}
//         renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
//       />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
 
// })

