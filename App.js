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
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </Root>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    Promise.all([
      await Font.loadAsync({
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        'raleway-boldI': require('./assets/fonts/Raleway-BoldItalic.ttf'),
        'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
        'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
        'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
        'raleway-extralight': require('./assets/fonts/Raleway-ExtraLight.ttf'),
        ...Icon.Ionicons.font
      })
    ]);
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
