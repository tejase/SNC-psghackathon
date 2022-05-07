'use strict';
import React, { Component } from 'react';
import {
  Alert,
} from 'react-native';
import BarcodeScanner from 'react-native-barcode-scanners'

export default class barcodeScanner extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {}

  onReadBarCodeByGalleryFailure() {
    Alert.alert('Note', 'Not found barcode!');
  }
  onBarCodeRead(res) {

    this.props.navigation.navigate('Signup', { data: res.data });
  }
  render() {
    return (
      <BarcodeScanner
        onReadBarCodeByGalleryFailure={() => this.onReadBarCodeByGalleryFailure.call(this)}
        onBarCodeRead={(data) => this.onBarCodeRead.call(this, data)}
      />
    );
  }
}
