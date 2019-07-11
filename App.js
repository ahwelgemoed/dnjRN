import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import Index from './screens/Index';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import store from './store';
import Sentry from 'sentry-expo';
import Maintanince from './screens/Maintanince';
import Version from './screens/Version';

Sentry.config(
  'https://36083bf90a3448a3ba1fe017613bf988@sentry.io/1457296'
).install();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    mountyLoad: true
  };
  async componentDidMount() {
    await this._loadResourcesAsync();
  }

  render() {
    if (
      !this.state.isLoadingComplete &&
      !this.props.skipLoadingScreen &&
      this.state.mountyLoad
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
          // autoHideSplash={false}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <Root>
            <View style={styles.container}>
              {/* <Version> */}
              <Maintanince>
                <Index />
              </Maintanince>
              {/* </Version> */}
            </View>
          </Root>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      'raleway-boldI': require('./assets/fonts/Raleway-BoldItalic.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
      'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'raleway-extralight': require('./assets/fonts/Raleway-ExtraLight.ttf'),
      ...Ionicons.font
    });

    await this.setState({ mountyLoad: false });
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
