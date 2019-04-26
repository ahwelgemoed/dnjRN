import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToke');
    const firstVisit = await AsyncStorage.getItem('firstVisit');
    if (firstVisit !== 'Yes') {
      this.props.navigation.navigate('Welcome', this.props.navigation);
    } else {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
