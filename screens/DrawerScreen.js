import React, { Component } from 'react';
import Constants from 'expo-constants';
import {
  Content,
  Container,
  ListItem,
  Icon,
  CheckBox,
  Right,
  Switch,
  Left
} from 'native-base';
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
import { WebBrowser } from 'expo';
import { activateDeleteAction } from '../actions/poemsActions';
import { changePoem } from '../actions/themeActions';
import OnlineUsers from '../components/OnlineUsers';
import { ScreenBackground } from '../components/Styles';
const { manifest } = Constants;
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
  toggleDarkMode = () => {
    this.props.changePoem(!this.props.theme);
  };

  signOut = () => {
    this.props.firebase.logout().then(res => {
      this.props.navigation.navigate('Auth'), AsyncStorage.clear();
    });
  };
  render() {
    const { profile, theme } = this.props;
    // const { theme } = this.props;
    return (
      <ScreenBackground style={styles.container}>
        {/* <Content> */}
        <ListItem>
          <Text style={styles.label}>
            <OnlineUsers />
          </Text>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Home')}>
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="home"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Home
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Post')}>
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="add"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Post
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Bookmark')}>
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="bookmarks"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Bookmarks
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'YourPoems')}>
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="person"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Your Poems
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>
        <ListItem
          onPress={() => WebBrowser.openBrowserAsync('https://klyntji.com/')}
        >
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="heart"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              KLYNTJI
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>

        <ListItem
          onPress={() =>
            WebBrowser.openBrowserAsync(`https://www.instagram.com/disnetjy`)
          }
        >
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="logo-instagram"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Follow DNJ
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Share')}>
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="share"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Share DNJ
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>
        <ListItem onPress={this.changeTab.bind(this, 'Account')}>
          <Left>
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="key"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Account Page
            </Text>
          </Left>
          <Right>
            <Icon
              name="arrow-forward"
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
            />
          </Right>
        </ListItem>
        {profile.auth ? (
          <View>
            <ListItem
              itemDivider
              style={[
                theme
                  ? { backgroundColor: '#2C2D2D' }
                  : { backgroundColor: '#D8D9D9' }
              ]}
            >
              <Text
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.label
                ]}
              >
                ADMIN ONLY
              </Text>
            </ListItem>

            <ListItem onPress={this.activateDeleteAction}>
              <Icon
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.icons
                ]}
                name="person"
              />
              {this.props.activateDelete ? (
                <Text
                  style={[
                    theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                    styles.label
                  ]}
                >
                  {' '}
                  Deactivate Admin Rights
                </Text>
              ) : (
                <Text
                  style={[
                    theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                    styles.label
                  ]}
                >
                  {' '}
                  Activate Admin Rights
                </Text>
              )}
            </ListItem>
          </View>
        ) : null}
        {/* </Content> */}
        <View style={styles.bottom}>
          <ListItem style={{ borderBottomWidth: 0, borderTopWidth: 0 }}>
            <Left>
              <Icon
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.icons
                ]}
                name="moon"
              />
              <Text
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.label
                ]}
              >
                {' '}
                Dark Mode
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{
                  true: '#000',
                  false: '#ddd'
                }}
                value={this.props.theme}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                onValueChange={this.toggleDarkMode}
              />
            </Right>
          </ListItem>
          <ListItem
            onPress={this.signOut}
            style={{ borderBottomWidth: 0, borderTopWidth: 0 }}
          >
            <Icon
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.icons
              ]}
              name="log-out"
            />
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.label
              ]}
            >
              {' '}
              Sign Out
            </Text>
          </ListItem>
          <ListItem style={{ borderBottomWidth: 0, borderTopWidth: 0 }}>
            <Text
              style={[
                theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                styles.labels
              ]}
            >
              Version {manifest.version}
            </Text>
          </ListItem>
        </View>
      </ScreenBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    textAlign: 'left'
    // backgroundColor: '#efefef'
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
  labels: {
    fontSize: 10,
    fontFamily: 'raleway-extralight',
    textAlign: 'left'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 26
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
      activateDelete: state.poems.activateDelete,
      theme: state.theme.isThemeDark
    }),
    { activateDeleteAction, changePoem }
  )
)(DrawerScreen);
