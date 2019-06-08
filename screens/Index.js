import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { darkTheme, lightTheme } from '../components/theme';
import { changePoem } from '../actions/themeActions';

class Index extends Component {
  async componentDidMount() {
    const theme = JSON.parse(await AsyncStorage.getItem('theme'));
    await this.props.changePoem(theme);
  }
  render() {
    const { theme } = this.props;
    return (
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <React.Fragment>
          {theme ? (
            <StatusBar translucent barStyle="light-content" />
          ) : (
            <StatusBar translucent barStyle="dark-content" />
          )}

          <AppNavigator />
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 24 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    // height: STATUSBAR_HEIGHT
  },
  appBar: {
    backgroundColor: '#79B45D'
    // height: APPBAR_HEIGHT
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B'
  }
});
export default compose(
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark
    }),
    { changePoem }
  )
)(Index);
