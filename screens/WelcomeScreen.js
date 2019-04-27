import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import TandC from '../components/TandC';
const slides = [
  {
    key: 'somethun',
    title: 'Welcome To',
    subsubtitle: 'DIS NET JY',
    subTitle: 'KLYNTJI',
    text: 'Here you can post and consume poetry by other poetry lovers',
    backgroundColor: '#59b2ab'
  },
  {
    key: 'somethun-dos',
    title: 'Be Truthfull',
    text:
      'You can post with or with out the ability to be contacted by other users via Instagram',
    backgroundColor: '#febe29'
  },
  {
    key: 'somethun1',
    title: 'Play Nice with the\nother kids on the Bus',
    text:
      "By continuing and creating an account you agree to our T&C's and that you are older that 17 Years old",
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
  _renderItem = item => {
    return (
      <View style={styles.slide}>
        <Text style={styles.subtitle}>{item.title}</Text>
        <Text style={styles.title}>{item.subsubtitle}</Text>
        <Text style={styles.subtitle}>{item.subTitle}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.button ? <TandC /> : null}
      </View>
    );
  };
  _onDone = async () => {
    await AsyncStorage.setItem('firstVisit', 'Yes');
    await this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        slides={slides}
        onDone={this._onDone}
        bottomButton
      />
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100
  },
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: 'black',
    marginTop: 200,
    fontFamily: 'proxima-alt',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    fontSize: 16
  },
  title: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'playfair-display-black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'proxima-alt',
    fontStyle: 'italic',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16
  }
});
