import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { AppLoading, Asset, Font, Icon } from 'expo';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
  }
  async componentDidMount() {
    await Font.loadAsync({
      'raleway-boldI': require('../assets/fonts/Raleway-BoldItalic.ttf'),
      'raleway-medium': require('../assets/fonts/Raleway-Medium.ttf'),
      'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf'),
      'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf'),
      'raleway-extralight': require('../assets/fonts/Raleway-ExtraLight.ttf'),
      ...Icon.Ionicons.font
    });
    await this._bootstrapAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // try {
    //   await GoogleSignIn.initAsync({
    //     clientId:
    //       'com.googleusercontent.apps.554939781321-dlf3glaq77s8menkgofqt12rsa77u1d8'
    //   });
    // } catch ({ message }) {
    //   alert('GoogleSignIn.initAsync(): ' + message);
    // }
    const userToken = await AsyncStorage.getItem('userToke');
    const firstVisit = await AsyncStorage.getItem('firstVisit');
    if (firstVisit !== 'Yes') {
      this.props.navigation.navigate('Welcome');
    }
  };

  render() {
    const { auth } = this.props;
    if (!isLoaded(auth)) {
      return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
    if (isEmpty(auth)) {
      return this.props.navigation.navigate('LoginScreen');
    }
    return this.props.navigation.navigate('App');
  }
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(AuthLoadingScreen);
