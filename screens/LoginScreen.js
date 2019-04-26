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
  Icon
} from 'native-base';
import { AsyncStorage, StyleSheet } from 'react-native';

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign In',
    headerTitleStyle: {
      fontFamily: 'playfair-display-black',
      fontSize: 20
    }
  });
  signIn = () => {
    const { firebase } = this.props;
    const { username, password } = this.state;
    firebase
      .login({
        email: username,
        password: password
      })
      .then(res => AsyncStorage.setItem('serToken', res.user.user.uid))
      .then(res => this.props.navigation.navigate('Home'))
      .catch(err => console.log(err.message))
      .catch(err => this.setState({ loading: false }));
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
              <Text style={styles.label}>
                <Icon name="person" style={styles.icon} /> Sign In
              </Text>
            </Button>
          </Form>
          <Button
            style={styles.button}
            block
            light
            onPress={() => this.props.navigation.navigate('SignupScreen')}
          >
            <Text style={styles.label}>
              {' '}
              <Icon name="person-add" style={styles.icon} /> Sign Up
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    margin: 20
    // alignItems: 'center',
    // justifyContent: 'space-around'
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
    marginTop: 20,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  }
});
export default compose(firestoreConnect())(LoginScreen);
