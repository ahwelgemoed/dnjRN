import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { successfullyAddedPoem } from '../actions/poemsActions';
import {
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert,
  View,
  Image
} from 'react-native';
import UpdateEmail from '../components/UpdateEmail';
import DelelteAccount from '../components/DelelteAccount';
import { Button, Text, Icon } from 'native-base';
const qr = require('../assets/images/DNJQR.png');

class ShareScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Share DNJ',
    headerLeft: null,
    headerRight: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" style={{ color: '#999' }} />
      </Button>
    ),
    headerTitleStyle: {
      fontFamily: 'raleway-boldI',
      fontSize: 20
    }
  });

  render() {
    return (
      <View style={styles.mainContent}>
        <Text style={styles.label}> Show this to a Camera </Text>
        <Image source={qr} style={styles.image} />
      </View>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 18,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});
const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(ShareScreen);
