import React, { Component } from 'react';
import { Content, Container, ListItem, Icon } from 'native-base';
import {
  AsyncStorage,
  Text,
  View,
  StyleSheet,
  Linking,
  Platform
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { activateDeleteAction } from '../actions/poemsActions';
import { Constants, WebBrowser } from 'expo';
import OnlineUsers from '../components/OnlineUsers';
// import { DrawerActions, DrawerItems, SafeAreaView } from 'react-navigation';
// import styles from '../../styles/index';

class DrawerScreen extends Component {
  state = {
    activateDeleteAction: false
  };
  componentDidMount() {
    this.props.activateDeleteAction(this.state.activateDeleteAction);
  }
  changeTab = name => {
    this.props.navigation.navigate(name);
  };
  activateDeleteAction = async () => {
    await this.setState({
      activateDeleteAction: !this.state.activateDeleteAction
    });
    await this.props.activateDeleteAction(this.state.activateDeleteAction);
  };

  signOut = () => {
    this.props.firebase.logout().then(res => {
      this.props.navigation.navigate('Auth'), AsyncStorage.clear();
    });
  };
  render() {
    const { profile } = this.props;
    return (
      <View style={styles.container}>
        {/* <Content> */}
        <ListItem>
          <Text style={styles.label}>
            <OnlineUsers />
          </Text>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Home')}>
          <Icon style={styles.icons} name="home" />
          <Text style={styles.label}> Home</Text>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Post')}>
          <Icon style={styles.icons} name="clipboard" />
          <Text style={styles.label}> Post</Text>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Bookmark')}>
          <Icon style={styles.icons} name="bookmarks" />
          <Text style={styles.label}> Bookmarks</Text>
        </ListItem>

        <ListItem
          onPress={() => WebBrowser.openBrowserAsync('https://klyntji.com/')}
        >
          <Icon style={styles.icons} name="heart" />
          <Text style={styles.label}> KLYNTJI</Text>
        </ListItem>

        <ListItem
          onPress={() =>
            WebBrowser.openBrowserAsync(`https://www.instagram.com/disnetjy`)
          }
        >
          <Icon style={styles.icons} name="logo-instagram" />
          <Text style={styles.label}> Follow DNJ</Text>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Share')}>
          <Icon style={styles.icons} name="share" />
          <Text style={styles.label}> Share DNJ</Text>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Account')}>
          <Icon style={styles.icons} name="key" />
          <Text style={styles.label}> Account Page</Text>
        </ListItem>
        {profile.auth ? (
          <View>
            <ListItem itemDivider>
              <Text>ADMIN ONLY</Text>
            </ListItem>
            <ListItem onPress={this.changeTab.bind(this, 'YourPoems')}>
              <Icon style={styles.icons} name="person" />
              <Text style={styles.label}> Your Poems</Text>
            </ListItem>
            <ListItem onPress={this.activateDeleteAction}>
              <Icon style={styles.icons} name="person" />
              {this.props.activateDelete ? (
                <Text style={styles.label}> Deactivate Admin Rights</Text>
              ) : (
                <Text style={styles.label}> Activate Admin Rights</Text>
              )}
            </ListItem>
          </View>
        ) : null}
        {/* </Content> */}
        <View style={styles.bottom}>
          <ListItem
            onPress={this.signOut}
            style={{ borderBottomWidth: 0, borderTopWidth: 0 }}
          >
            <Icon style={styles.icons} name="log-out" />
            <Text style={styles.label}> Sign Out</Text>
          </ListItem>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#efefef'
  },
  icons: {
    fontSize: 12,
    paddingRight: 10
  },
  label: {
    fontSize: 14,
    fontFamily: 'raleway-extralight',
    textAlign: 'left'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
});

export default compose(
  withFirebase,
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      addedPoem: state.poems.addedPoem,
      activateDelete: state.poems.activateDelete
    }),
    { activateDeleteAction }
  )
)(DrawerScreen);
