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

class LoginScreen extends Component {
  signIn = () => {
    const { firebase } = this.props;
    const { username, password } = this.state;
    firebase
      .login({
        email: username,
        password: password
      })
      .then(res => AsyncStorage.setItem('userToken', res.user.user.uid))
      .then(res => this.props.navigation.navigate('Home'))
      .catch(err => console.log(err.message))
      .catch(err => this.setState({ loading: false }));
  };
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email Address</Label>
              <Input onChangeText={text => this.setState({ username: text })} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
            <Button block light onPress={this.signIn}>
              <Text>Sign In</Text>
            </Button>
          </Form>
          <Button
            block
            light
            onPress={() => this.props.navigation.navigate('SignupScreen')}
          >
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default compose(firestoreConnect())(LoginScreen);
