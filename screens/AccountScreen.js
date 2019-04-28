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
  state = { loaded: false };
  static getDerivedStateFromProps(props, state) {
    if (props.profile.isLoaded && !props.profile.isEmpty && !state.loaded) {
      return {
        email: props.profile.email,
        Instagram: props.profile.Instagram,
        auth: props.profile.auth,
        username: props.profile.username,
        seensfw: props.profile.seensfw,
        token: props.profile.token,
        loaded: true
      };
    }
    return null;
  }
  updateProfile = () => {
    const { email, Instagram, auth, username, seensfw, token } = this.state;
    const payLoad = {
      email: this.props.auth.email,
      Instagram,
      auth,
      username,
      seensfw,
      token
    };
    const { firebase } = this.props;
    firebase
      .updateProfile(payLoad)
      .then(res => {
        Toast.show({
          text: 'Profile Updated',
          position: 'bottom',
          type: 'warning'
        });
      })
      .catch(err => {
        Toast.show({
          text: err.message,
          position: 'bottom',
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
          position: 'bottom',
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
          position: 'bottom',
          type: 'danger'
        });
      });
  };

  render() {
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
              style={styles.button}
              block
              light
              onPress={() => this.updateProfile()}
            >
              <Text style={styles.label}>Save Changes to Profile</Text>
            </Button>
            <UpdateEmail />

            <Button
              style={styles.buttonBlue}
              block
              onPress={() => {
                this.resetPassword();
              }}
            >
              <Text>Reset Password</Text>
            </Button>
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
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  buttonBlue: {
    fontSize: 16,
    fontFamily: 'proxima-alt',
    marginTop: 20,
    textAlign: 'left',
    backgroundColor: '#91D9D9',
    color: 'white'
  },
  input: {
    fontSize: 16,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  button: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  buttonRed: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'proxima-alt',
    textAlign: 'left',
    backgroundColor: '#FF5C5C'
  },
  check: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  icon: {
    fontSize: 14,
    fontFamily: 'proxima-alt',
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
