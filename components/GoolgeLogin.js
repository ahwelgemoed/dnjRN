import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Button, Text, Spinner } from 'native-base';
import { GoogleSignIn } from 'expo';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
class GoolgeLogin extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    try {
      GoogleSignIn.initAsync({
        clientId:
          '554939781321-dlf3glaq77s8menkgofqt12rsa77u1d8.apps.googleusercontent.com'
      });
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
  }
  googleSignIn = () => {
    this.setState({
      loading: true
    });
    try {
      GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = GoogleSignIn.signInAsync();
      if (type === 'success') {
        alert('Success');
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  // try {
  //   const responce = await Expo.AppAuth.authAsync({
  //     issuer: 'https://accounts.google.com',
  //     scopes: ['profile'],
  //     clientId:
  //       '554939781321-4vgln8p20a8n1n57cs8tiqmj25rsvn07.apps.googleusercontent.com'
  //   });
  //   console.log(responce);
  // } catch ({ message }) {
  //   alert(`login: ${message}`);
  // }
  // const { type, accessToken, user } = await Google.logInAsync({ clientId });
  // if (type == 'success') {
  //   // const { firebase } = this.props;
  //   const credential = firebase.auth.GoogleAuthProvider.credential(
  //     accessToken
  //   );
  //   firebase
  //     .auth()
  //     .signInWithCredential(credential)
  //     .catch(error => {
  //       this.setState({
  //         loading: true
  //       });
  //       console.log(error);
  //     });
  // } else {
  //   await this.setState({
  //     loading: true
  //   });
  // }

  render() {
    return (
      <Button
        block
        bordered
        light
        style={styles.buttonUp}
        onPress={() => this.googleSignIn()}
      >
        {this.state.loading ? <ActivityIndicator color={'#3b5998'} /> : null}
        <Text style={styles.buttonText}>Sign In with Goolge</Text>
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
export default compose()(GoolgeLogin);
