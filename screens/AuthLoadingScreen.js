import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Image,
  StyleSheet,
  View
} from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { DangerZone } from 'expo';
import wiggly from '../components/data.json';
import { ScreenBackground, PoemName } from '../components/Styles';

class AuthLoadingScreen extends React.Component {
  state = { firstVisit: null, animation: null, speed: 1, modalVisible: false };

  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   // this._bootstrapAsync();
  // }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToke');
    const firstVisit = await AsyncStorage.getItem('firstVisit');
    await this.setState({
      firstVisit
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.modalVisible === true && prevState.modalVisible === false) {
      this._playAnimation();
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { auth } = this.props;
    if (!isLoaded(auth)) {
      return <ScreenBackground style={styles.mainContent} />;
    }
    if (isEmpty(auth)) {
      if (this.state.firstVisit !== 'Yes') {
        return this.props.navigation.navigate('Welcome');
      } else {
        return this.props.navigation.navigate('LoginScreen');
      }
    }
    return this.props.navigation.navigate('App');
  }
}
_changeSpeed = speed => {
  this.setState({ speed });
};

_playAnimation = () => {
  if (!this.state.animation) {
    this._loadAnimation();
  } else {
    this.animation.reset();
    this.animation.play();
  }
};

_stopAnimation = () => {
  this.animation.reset();
};

_loadAnimation = () => {
  this.setState({ animation: wiggly }, this._playAnimation);
};
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  }
});

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(AuthLoadingScreen);
