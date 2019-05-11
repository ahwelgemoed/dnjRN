import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Image,
  StyleSheet,
  View
} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { AppLoading, Asset, Font, Icon } from 'expo';

class AuthLoadingScreen extends React.Component {
  state = { firstVisit: null };
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
    await this.setState({
      firstVisit
    });
  };

  render() {
    const { auth } = this.props;
    if (!isLoaded(auth)) {
      return (
        <View>
          <StatusBar barStyle="default" />
          <Image
            source={require('../assets/images/Loading.gif')}
            style={{
              width: 100,
              height: 100,
              flex: 1,
              alignItems: 'center',
              marginBottom: 20,
              paddingLeft: 30
            }}
          />
        </View>
      );
    }
    if (isEmpty(auth)) {
      if (this.state.firstVisit !== 'Yes') {
        return this.props.navigation.navigate('Welcome');
      } else {
        return this.props.navigation.navigate('LoginScreen');
      }
    }
    return this.props.navigation.navigate('App');
  }
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(AuthLoadingScreen);
