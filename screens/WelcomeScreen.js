import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  ImageBackground
} from 'react-native';
import { AppLoading, Asset } from 'expo';
import * as Font from 'expo-font';
import AppIntroSlider from 'react-native-app-intro-slider';
import TandC from '../components/TandC';
const background = require('../assets/images/background.png');
const slides = [
  {
    key: 'somethun',
    title: 'Welcome',
    text: 'Here you can post and consume poetry by other poetry lovers',
    backgroundColor: '#000',
    image: require('../assets/images/DNJ.png')
  },
  {
    key: 'somethun-dos',
    title: 'Quick Overview',
    text: 'You get 5 min to review your post and then it is locked for ever.',
    backgroundColor: '#59b2ab',
    image: require('../assets/images/DNJ.png')
  },
  {
    key: 'somethun-doss',
    title: 'What?',

    text: 'You Can Save Poems as Bookmarks or as Images for easy sharing',
    backgroundColor: '#59b2ab',
    image: require('../assets/images/DNJ.png')
  },
  {
    key: 'somethun1',
    title: 'Play Nice with the other kids on the bus',
    text:
      "By continuing and creating an account you agree to our T&C's and that you are older than 17 Years old",
    backgroundColor: '#22bcb5',
    button: true
  }
];
export default class WelcomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    gesturesEnabled: false,
    swipeEnabled: false,
    disableOpenGesture: true,
    navigationOptions: {
      drawerLockMode: 'locked-closed'
    }
  });
  state = {
    showRealApp: false
  };
  componentWillMount() {
    Font.loadAsync({
      'raleway-boldI': require('../assets/fonts/Raleway-BoldItalic.ttf')
    });
  }
  _renderItem = item => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.title}>{item.subsubtitle}</Text> */}
        {item.image ? <Image source={item.image} style={styles.image} /> : null}
        <Text style={styles.subtitle}>{item.subTitle}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.button ? <TandC /> : null}
      </View>
    );
  };
  _onDone = async () => {
    await AsyncStorage.setItem('firstVisit', 'Yes');
    await this.props.navigation.navigate('LoginScreen');
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonBlueDone} block onPress={this._onDone}>
        <Text style={styles.buttonBlueTextDone}>Agree and Done</Text>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={styles.buttonBlue} block bordered>
        <Text style={styles.buttonBlueText}>Next</Text>
      </View>
    );
  };
  render() {
    return (
      <AppIntroSlider
        renderNextButton={this._renderNextButton}
        renderDoneButton={this._renderDoneButton}
        showNextButton={true}
        renderItem={this._renderItem}
        slides={slides}
        dotStyle={{ backgroundColor: '#ddd' }}
        activeDotStyle={{ backgroundColor: '#91D9D9' }}
        onDone={this._onDone}
        bottomButton
      />
    );
  }
}
const styles = StyleSheet.create({
  buttonBlue: {
    flex: 1,
    // width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'raleway-regular',
    backgroundColor: '#121212',
    color: 'white'
  },
  buttonBlueDone: {
    height: 40,
    fontSize: 16,
    borderRadius: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    borderColor: '#121212',
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: 'white'
  },
  buttonCircle: {
    flex: 1,
    // width: 40,
    height: 40,
    backgroundColor: '#91D9D9',
    color: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 100
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  text: {
    color: '#fff',
    marginTop: 200,
    fontFamily: 'PTSansCaptionBold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: 16
  },
  buttonBlueText: {
    color: '#91D9D9',
    fontFamily: 'PTSansCaptionBold',
    fontSize: 16
  },
  buttonBlueTextDone: {
    color: '#fff',
    fontFamily: 'PTSansCaptionBold',
    fontSize: 16
  },
  title: {
    fontSize: 26,
    color: '#91D9D9',
    fontFamily: 'PTSansCaptionRegular',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 20,
    color: '#999',
    fontFamily: 'raleway-regular',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16
  }
});
