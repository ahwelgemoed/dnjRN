import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class FooterTabs extends Component {
  render() {
    return (
      <View style={{ height: '10%' }}>
        <Text> Home </Text>
        <Text> Profile</Text>
      </View>
    );
  }
}
