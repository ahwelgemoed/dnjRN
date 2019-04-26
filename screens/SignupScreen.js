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
  Toast
} from 'native-base';
import { AsyncStorage, StyleSheet } from 'react-native';

class SignupScreen extends Component {
  state = { loading: false, username: '', Instagram: '' };
  static navigationOptions = ({ navigation }) => ({
    title: 'Create an Account',
    headerTitleStyle: {
      fontFamily: 'playfair-display-black',
      fontSize: 20
    }
  });
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    await this.setState({ loading: true });
    const { username, password, email, Instagram } = this.state;
    if (!email || !password) {
      this.setState({ loading: false });
      return Toast.show({
        text: 'Please Fill In all the details',
        buttonText: 'Okay',
        position: 'top'
      });
    }
    try {
      const { firebase } = this.props;
      await firebase
        .createUser({ email, password }, { username, email, Instagram })
        .then(res => this.props.navigation.navigate('Home'));
      console.log('user successfully signed up!: ', success);
    } catch (err) {
      return Toast.show({
        text: err.message,
        buttonText: 'Okay',
        position: 'top'
      });
    }
  };
  render() {
    return (
      <Container style={styles.mainContent}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label style={styles.label}>Name</Label>
              <Input
                style={styles.label}
                onChangeText={val => this.onChangeText('username', val)}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.label}>Password</Label>
              <Input
                style={styles.label}
                secureTextEntry={true}
                onChangeText={val => this.onChangeText('password', val)}
              />
            </Item>
            <Item floatingLabel style={styles.label}>
              <Label style={styles.label}>Email Address</Label>
              <Input
                style={styles.label}
                onChangeText={val => this.onChangeText('email', val)}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.label}>Instagram Handle</Label>
              <Input
                style={styles.label}
                onChangeText={val => this.onChangeText('Instagram', val)}
              />
            </Item>

            <Button style={styles.button} block light onPress={this.signUp}>
              <Text style={styles.label}>
                {' '}
                <Icon name="person-add" style={styles.icon} /> Sign Up
              </Text>
            </Button>
          </Form>
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
export default compose(firestoreConnect())(SignupScreen);
