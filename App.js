import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import store from './store';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    mountyLoad: true
  };
  async componentDidMount() {
    await Font.loadAsync({
      'playfair-display-bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
      'playfair-display-black': require('./assets/fonts/PlayfairDisplay-Black.ttf'),
      'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'raleway-extralight': require('./assets/fonts/Raleway-ExtraLight.ttf'),
      'proxima-alt': require('./assets/fonts/Proxima-Nova-Alt-Regular-webfont.ttf')
    });
    await this.setState({ mountyLoad: false });
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
        />
      );
    } else {
      return (
        <Provider store={store}>
          <Root>
            <View style={styles.container}>
              {/* <Text> Mainer</Text> */}
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </Root>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
      })
    ]);
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
