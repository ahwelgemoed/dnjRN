import React, { Component } from 'react';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
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
  Dimensions,
  View,
  ActivityIndicator,
  ImageBackground,
  Image
} from 'react-native';
import { GoogleSignIn } from 'expo';
import FacebookLogin from '../components/FacebookLogin';
import ForgotPassword from '../components/ForgotPassword';
import GoolgeLogin from '../components/GoolgeLogin';
const background = require('../assets/images/background.png');
class LoginScreen extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      let payLoad = {};
      console.log(user.providerData[0].providerId);

      if (user != null && user.providerData[0].providerId == 'facebook.com') {
        const now = this.props.auth.lastLoginAt - this.props.auth.createdAt;
        if (now <= 10000) {
          payLoad = {
            user: user.uid,
            auth: false,
            username: user.displayName,
            seensfw: true,
            bookmarks: [],
            email: user.email
          };
        } else {
          payLoad = {
            user: user.uid,
            auth: false,
            username: user.displayName,
            seensfw: true,
            email: user.email
          };
        }

        const { firebase } = this.props;
        firebase
          .updateProfile(payLoad)
          .then(res => {
            this.props.navigation.navigate('Home');
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
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
        position: 'top',
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
          position: 'top',
          type: 'danger'
        });
      });
  };
  render() {
    return (
      <Container>
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
                <Label style={styles.label}>Email Address</Label>
                <Input
                  style={styles.input}
                  onChangeText={text => this.setState({ username: text })}
                />
              </Item>
              <Item floatingLabel last>
                <Label style={styles.label}>Password</Label>
                <Input
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={text => this.setState({ password: text })}
                />
              </Item>
              <Button block light onPress={this.signIn} style={styles.buttonIn}>
                {this.state.loading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : null}
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
            <Text style={styles.name}>- or use Facebook -</Text>
            <FacebookLogin />
            <ForgotPassword />
            {/* <GoolgeLogin /> */}
          </View>
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
  input: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    backgroundColor: 'rgba(255, 255, 255, .2)'
  },
  name: {
    fontSize: 12,
    marginTop: 20,
    color: '#ddd',
    fontFamily: 'raleway-regular',
    textAlign: 'center'
  },
  names: {
    fontSize: 14,
    marginTop: 20,
    color: '#999',
    fontFamily: 'raleway-regular',
    textAlign: 'center'
  },
  labelSignUp: {
    color: '#91D9D9',
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    backgroundColor: '#fff'
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
    backgroundColor: '#fff',
    textAlign: 'left'
  }
});
const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(LoginScreen);
