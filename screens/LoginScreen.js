import React, { Component } from 'react';
import { Font } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Fumi } from 'react-native-textinput-effects';
import moment from 'moment';
import { Button, Text, Toast } from 'native-base';
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
import { ScrollView } from 'react-native-gesture-handler';
const background = require('../assets/images/background.png');
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
      <ScrollView style={styles.mainContent}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 40,
            marginTop: 20,
            textAlign: 'center'
          }}
          source={require('../assets/images/DNJ.png')}
        />
        <Fumi
          label={'Email'}
          iconClass={FontAwesome}
          iconName={'envelope'}
          iconColor={'#91D9D9'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.input}
          onChangeText={text => this.setState({ username: text })}
        />
        <Fumi
          label={'Password'}
          iconClass={FontAwesome}
          iconName={'lock'}
          iconColor={'#91D9D9'}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />

        <Button block light onPress={this.signIn} style={styles.buttonIn}>
          {this.state.loading ? <ActivityIndicator color={'#fff'} /> : null}
          <Text style={styles.labelIn}>Sign In</Text>
        </Button>

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
        <FacebookLogin navigation={this.props.navigation} />
        <ForgotPassword />
        {/* <GoolgeLogin /> */}
      </ScrollView>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  mainContent: {
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
    width: screenWidth,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
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
