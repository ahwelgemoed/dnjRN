import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text } from 'native-base';
import { Facebook } from 'expo';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
class FacebookLogin extends Component {
  facebookSignin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      '433863794055791',
      { permissions: ['public_profile'] }
    );
    if (type == 'success') {
      // const { firebase } = this.props;
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <Button
        block
        bordered
        light
        style={styles.buttonUp}
        onPress={() => this.facebookSignin()}
      >
        <Text style={styles.buttonText}>Sign In with Facebook</Text>
      </Button>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  buttonUp: {
    fontSize: 16,
    borderColor: '#3b5998',
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonText: {
    fontSize: 16,
    color: '#3b5998',
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  }
});
export default compose()(FacebookLogin);
