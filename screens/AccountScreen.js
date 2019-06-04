import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { StyleSheet, Dimensions, AsyncStorage, Alert } from 'react-native';
import UpdateEmail from '../components/UpdateEmail';
import DelelteAccount from '../components/DelelteAccount';
import {
  Content,
  Toast,
  Form,
  Switch,
  Item,
  Input,
  Label,
  Container,
  Textarea,
  Button,
  Text,
  CheckBox,
  ListItem,
  Body,
  Icon
} from 'native-base';

class AccountScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Your Account',
    headerLeft: null,
    headerRight: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" style={{ color: '#999' }} />
      </Button>
    ),
    headerTitleStyle: {
      fontFamily: 'raleway-boldI',
      fontSize: 20
    }
  });
  state = { loaded: false, facebook: false };
  static getDerivedStateFromProps(props, state) {
    if (
      props.profile.isLoaded &&
      !props.profile.isEmpty &&
      !state.loaded &&
      props.auth.providerData[0].providerId == 'facebook.com' &&
      state.facebook === false
    ) {
      return {
        email: props.profile.email,
        Instagram: props.profile.Instagram,
        auth: props.profile.auth,
        username: props.profile.username,
        seensfw: props.profile.seensfw,
        token: props.profile.token,
        bookmarks: props.profile.bookmarks,
        loaded: true,
        facebook: true
      };
    }
    if (props.profile.isLoaded && !props.profile.isEmpty && !state.loaded) {
      return {
        email: props.profile.email,
        Instagram: props.profile.Instagram,
        auth: props.profile.auth,
        username: props.profile.username,
        bookmarks: props.profile.bookmarks,
        seensfw: props.profile.seensfw,
        token: props.profile.token,
        loaded: true
      };
    }
    return null;
  }
  updateProfile = () => {
    const {
      email,
      Instagram,
      auth,
      username,
      seensfw,
      token,
      bookmarks
    } = this.state;
    let payLoad = {};
    if (Instagram) {
      payLoad = {
        email: this.props.auth.email,
        Instagram,
        auth,
        bookmarks,
        username,
        seensfw,
        token
      };
    } else {
      payLoad = {
        email: this.props.auth.email,
        Instagram,
        auth,
        bookmarks,
        username,
        seensfw,
        token
      };
    }
    const { firebase } = this.props;
    firebase
      .updateProfile(payLoad)
      .then(res => {
        Toast.show({
          text: 'Profile Updated',
          position: 'top'
        });
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        Toast.show({
          text: err.message,
          position: 'top',
          type: 'warning'
        });
      });
  };
  filterNsfw = () => {
    this.setState({
      seensfw: !this.state.seensfw
    });
  };
  resetPassword = async () => {
    const { firebase } = this.props;
    await firebase
      .auth()
      .sendPasswordResetEmail(this.props.auth.email)
      .then(res => {
        Toast.show({
          text: 'Reset Email Sent, Logging You Out Now',
          position: 'top',
          type: 'warning'
        });
      })
      .then(res => {
        this.props.firebase.logout().then(res => {
          this.props.navigation.navigate('Auth');
        });
      })
      .catch(err => {
        Toast.show({
          text: err.message,
          position: 'top',
          type: 'danger'
        });
      });
  };

  render() {
    const { facebook } = this.state;
    return (
      <Container style={styles.mainContent}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={styles.label}>Name</Label>
              <Input
                style={styles.input}
                value={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.label}>Instagram</Label>
              <Input
                style={styles.input}
                value={this.state.Instagram}
                onChangeText={text => this.setState({ Instagram: text })}
              />
            </Item>
            <ListItem>
              <Switch
                trackColor={{
                  true: '#000',
                  false: '#ddd'
                }}
                value={this.state.seensfw}
                onValueChange={this.filterNsfw}
              />
              <Body>
                <Text style={styles.check}>Show NSFW</Text>
              </Body>
            </ListItem>
            <Button
              style={styles.buttonBlue}
              block
              light
              onPress={() => this.updateProfile()}
            >
              <Text style={styles.labelUp}>Save Changes to Profile</Text>
            </Button>
            {facebook ? null : (
              <React.Fragment>
                <UpdateEmail />

                <Button
                  style={styles.buttonUp}
                  block
                  bordered
                  onPress={() => {
                    this.resetPassword();
                  }}
                >
                  <Text style={styles.blueText}>Reset Password</Text>
                </Button>
              </React.Fragment>
            )}
            <DelelteAccount navigation={this.props.navigation} />
          </Form>
        </Content>
      </Container>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  label: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonBlue: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    marginTop: 20,
    textAlign: 'left',
    backgroundColor: '#91D9D9',
    color: 'white'
  },
  blueText: {
    color: '#91D9D9',
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  input: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonUp: {
    fontSize: 16,
    borderColor: '#91D9D9',
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  labelUp: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  button: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonRed: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    backgroundColor: '#FF5C5C'
  },
  check: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  icon: {
    fontSize: 14,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  }
});
const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(AccountScreen);
