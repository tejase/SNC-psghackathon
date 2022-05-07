import React, { Component } from 'react';
import { View, 
    StyleSheet,
    FlatList, 
    ActivityIndicator,
    TouchableOpacity   } from 'react-native';





class Students extends Component {

  constructor(props) {
    super(props);
  }

  



  componentDidMount() {
    console.log(this.props.navigation.state.params.data);
  }


  render() {
    return (

        <View style={{ flex: 1 }}>
      </View>
  
    )
  }
}

const styles = StyleSheet.create({
 
});

export default Students;

