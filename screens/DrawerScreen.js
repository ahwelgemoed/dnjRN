import React, { Component } from 'react';
import { Content, Container, ListItem, Icon } from 'native-base';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
// import { DrawerActions, DrawerItems, SafeAreaView } from 'react-navigation';
// import styles from '../../styles/index';

class DrawerScreen extends Component {
  changeTab = name => {
    this.props.navigation.navigate(name);
  };
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <ListItem onPress={this.changeTab.bind(this, 'Home')}>
            <Icon style={styles.icons} name="home" />
            <Text> Home</Text>
          </ListItem>
          <ListItem onPress={this.changeTab.bind(this, 'Post')}>
            <Icon style={styles.icons} name="clipboard" />
            <Text> Post</Text>
          </ListItem>
          <ListItem onPress={this.changeTab.bind(this, 'Account Settings')}>
            <Icon style={styles.icons} name="key" />
            <Text> Account Page</Text>
          </ListItem>
          <ListItem onPress={() => this.props.firebase.logout()}>
            <Icon style={styles.icons} name="log-out" />
            <Text> Sign Out</Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  icons: {
    fontSize: 14
  }
});

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(DrawerScreen);
