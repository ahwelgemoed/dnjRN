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
  Text
} from 'native-base';
import { AsyncStorage } from 'react-native';

class SignupScreen extends Component {
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = () => {
    const { username, password, email, Instagram } = this.state;
    try {
      const { firebase } = this.props;
      firebase
        .createUser({ email, password }, { username, email, Instagram })
        .then(res => this.props.navigation.navigate('Home'));
      console.log('user successfully signed up!: ', success);
    } catch (err) {
      console.log('error signing up: ', err);
    }
  };
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={val => this.onChangeText('username', val)} />
            </Item>
            <Item floatingLabel>
              <Label>password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={val => this.onChangeText('password', val)}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email Address</Label>
              <Input onChangeText={val => this.onChangeText('email', val)} />
            </Item>
            <Item floatingLabel>
              <Label>Instagram Handle</Label>
              <Input
                onChangeText={val => this.onChangeText('Instagram', val)}
              />
            </Item>

            <Button block light onPress={this.signUp}>
              <Text>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
export default compose(firestoreConnect())(SignupScreen);
