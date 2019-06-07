import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { darkTheme, lightTheme } from '../assets/theme';
const theme = {
  fg: 'palevioletred',
  bg: 'white'
};
class Index extends Component {
  render() {
    const { theme } = this.props;
    return (
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}
export default compose(
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark
    }),
    {}
  )
)(Index);
