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
  }
  componentDidMount() {
    // this._bootstrapAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToke');
    const firstVisit = await AsyncStorage.getItem('firstVisit');
    // if (firstVisit !== 'Yes') {
    //   this.props.navigation.navigate('Welcome');
    // }
  };

  render() {
    const { auth } = this.props;
    if (!isLoaded(auth)) {
      return (
        <View>
          <StatusBar barStyle="default" />
          <ActivityIndicator />
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
