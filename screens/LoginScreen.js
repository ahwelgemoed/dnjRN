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
import { AsyncStorage, StyleSheet, Dimensions, View } from 'react-native';
import { GoogleSignIn } from 'expo';
class LoginScreen extends Component {
  state = {
    loading: false
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign In',
    headerLeft: null,
    headerTitleStyle: {
      fontFamily: 'raleway-boldI',
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
        position: 'bottom',
        type: 'danger'
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
          position: 'bottom',
          type: 'danger'
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
      <Container>
        <Content>
          <View style={styles.mainContent}>
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
              <Button block light onPress={this.signIn} style={styles.buttonIn}>
                {this.state.loading ? <Spinner color={'#fff'} /> : null}
                <Text style={styles.labelIn}>Sign In</Text>
              </Button>
            </Form>
            <Button
              style={styles.buttonUp}
              block
              bordered
              light
              onPress={() => this.props.navigation.navigate('SignupScreen')}
            >
              <Text style={styles.labelSignUp}>Sign Up</Text>
            </Button>
          </View>

          <Button
            style={styles.button}
            block
            light
            onPress={() => this._googleSingIn()}
          >
            <Text style={styles.label}>Facebook Sign In</Text>
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
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  labelSignUp: {
    color: '#91D9D9',
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  labelIn: {
    color: '#fff',
    fontFamily: 'raleway-regular',
    fontSize: 16
  },
  icon: {
    fontSize: 14,
    color: '#91D9D9',
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
  buttonIn: {
    fontSize: 16,
    backgroundColor: '#91D9D9',
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonUp: {
    fontSize: 16,
    borderColor: '#91D9D9',
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  }
});
export default compose(firestoreConnect())(LoginScreen);
