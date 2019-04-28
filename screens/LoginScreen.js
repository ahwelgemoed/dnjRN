import React, { Component } from 'react';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Container,
  Button,
  Text,
  Icon,
  Toast,
  Spinner
} from 'native-base';
import { AsyncStorage, StyleSheet, Dimensions } from 'react-native';
import { GoogleSignIn } from 'expo';
class LoginScreen extends Component {
  state = {
    loading: false
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign In',
    headerTitleStyle: {
      fontFamily: 'playfair-display-black',
      fontSize: 20
    }
  });
  signIn = async () => {
    await this.setState({ loading: true });
    const { firebase } = this.props;
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ loading: false });

      return Toast.show({
        text: 'Please Fill In all the details',
        buttonText: 'Okay',
        position: 'top'
      });
    }
    await firebase
      .login({
        email: username,
        password: password
      })
      .then(res => AsyncStorage.setItem('firstVisit', 'Yes'))
      .then(res => this.props.navigation.navigate('Home'))
      .catch(err => {
        this.setState({ loading: false });
        Toast.show({
          text: err.message,
          buttonText: 'Okay',
          position: 'top'
        });
      });
  };
  _googleSingIn = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this.props.navigation.navigate('Home');
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };
  render() {
    return (
      <Container style={styles.mainContent}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={styles.label}>Email Address</Label>
              <Input
                style={styles.label}
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={styles.label}>Password</Label>
              <Input
                style={styles.label}
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
            <Button block light onPress={this.signIn} style={styles.button}>
              {this.state.loading ? (
                <Spinner color={'#ddd'} />
              ) : (
                <Icon name="person" style={styles.icon} />
              )}
              <Text style={styles.label}>Sign In</Text>
            </Button>
          </Form>
          <Button
            style={styles.button}
            block
            light
            onPress={() => this.props.navigation.navigate('SignupScreen')}
          >
            <Icon name="person-add" style={styles.icon} />
            <Text style={styles.label}>Sign Up</Text>
          </Button>
          <Button
            style={styles.button}
            block
            light
            onPress={() => this._googleSingIn()}
          >
            <Icon name="person-add" style={styles.icon} />
            <Text style={styles.label}>Google Sign In</Text>
          </Button>
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
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'space-around'
  },
  label: {
    fontSize: 16,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  icon: {
    fontSize: 14,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  button: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  }
});
export default compose(firestoreConnect())(LoginScreen);
