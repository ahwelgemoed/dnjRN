import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ScreenBackground } from './styles';
import { Button } from 'native-base';
import wiggly from './swipe.json';
import Lottie from 'lottie-react-native';
const { manifest } = Constants;

class SwipeLottie extends React.PureComponent {
  state = {
    show: true,
    overide: false,
    animation: null,
    v: false
  };
  async componentDidMount() {
    await this.setState({
      show: false
    });
    await this._playAnimation();
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

  render() {
    return (
      <ScreenBackground style={styles.mainContent}>
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 250,
              height: 250
            }}
            source={this.state.animation}
            speed={this.state.speed}
            loop={true}
          />
        )}
        <Text
          style={{
            fontSize: 20,
            width: '90%',
            fontFamily: 'raleway-bold',
            textAlign: 'center',
            color: '#000'
          }}
        >
          Swipe for Poems
        </Text>
      </ScreenBackground>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect(
    state => ({
      appStatus: state.firestore.ordered.appStatus
    }),
    { successfullyAddedPoem }
  )
)(SwipeLottie);

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  buttonItself: {
    width: '90%',
    color: '#EAEAEA',
    fontFamily: 'raleway-regular',
    alignSelf: 'center',
    textAlign: 'center'
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  }
});
