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
import {
  AsyncStorage,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Image
} from 'react-native';
import FacebookLogin from '../components/FacebookLogin';
class SignupScreen extends Component {
  state = {
    loading: false,
    username: '',
    Instagram: '',
    seensfw: true,
    token: false
  };
  static navigationOptions = ({ navigation }) => ({
    title: 'Create an Account',
    headerTitleStyle: {
      fontFamily: 'raleway-boldI',
      fontSize: 20
    }
  });
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    await this.setState({ loading: true });
    const { username, password, email, Instagram, token } = this.state;
    if (!email || !password) {
      this.setState({ loading: false });
      return Toast.show({
        text: 'Please Fill In all the details',
        buttonText: 'Okay',
        position: 'top',
        type: 'danger'
      });
    }
    try {
      const { firebase } = this.props;
      await firebase
        .createUser(
          { email, password },
          { username, email, Instagram, auth: false, seensfw: true, token }
        )
        .then(res => {
          this.props.navigation.navigate('Home');
          AsyncStorage.setItem('firstVisit', 'Yes');
          Toast.show({
            text: 'Account Created',
            buttonText: 'Okay',
            position: 'top'
          });
        });
    } catch (err) {
      this.setState({ loading: false });
      return Toast.show({
        text: err.message,
        buttonText: 'Okay',
        position: 'top',
        type: 'danger'
      });
    }
  };
  render() {
    const background = require('../assets/images/background.png');
    return (
      <Container>
        <ImageBackground
          source={background}
          style={{ width: '100%', height: '100%' }}
        >
          <Content>
            <View style={styles.mainContent}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 40,
                  marginTop: 20
                }}
                source={require('../assets/images/DNJ.png')}
              />
              <Form>
                <Item floatingLabel>
                  <Label style={styles.label}>Name</Label>
                  <Input
                    style={styles.label}
                    onChangeText={val => this.onChangeText('username', val)}
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
                  <Label style={styles.label}>Password</Label>
                  <Input
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={val => this.onChangeText('password', val)}
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={styles.label}>Instagram Handle</Label>
                  <Input
                    style={styles.input}
                    onChangeText={val => this.onChangeText('Instagram', val)}
                  />
                </Item>
                <Button
                  block
                  light
                  onPress={this.signUp}
                  style={styles.buttonIn}
                >
                  {this.state.loading ? (
                    <ActivityIndicator color={'#fff'} />
                  ) : null}
                  <Text style={styles.labelIn}>Sign Up</Text>
                </Button>
                <FacebookLogin />
              </Form>
            </View>
          </Content>
        </ImageBackground>
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
  input: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    backgroundColor: 'rgba(255, 255, 255, .2)'
  },
  label: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  icon: {
    fontSize: 14,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  labelIn: {
    color: '#fff',
    fontFamily: 'raleway-regular',
    fontSize: 16
  },
  button: {
    fontSize: 16,
    marginTop: 20,
    width: screenWidth,
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
  }
});
export default compose(firestoreConnect())(SignupScreen);
