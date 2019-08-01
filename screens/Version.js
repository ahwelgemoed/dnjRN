import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScreenBackground, PoemName } from '../components/Styles';
import { firestoreConnect } from 'react-redux-firebase';
import Lottie from 'lottie-react-native';
import { Button } from 'native-base';
import wiggly from './error.json';

const { manifest } = Constants;

class Version extends React.PureComponent {
  state = {
    show: true,
    overide: false,
    animation: null,
    v: false
  };
  componentDidMount() {
    const { firestore } = this.props;
    firestore.get({
      collection: 'appStatus'
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.appStatus !== prevProps.appStatus) {
      if (this.props.appStatus[0].v !== manifest.version) {
        await this.setState({
          show: false
        });
        await this._playAnimation();
      }
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

  render() {
    if (this.state.show) {
      return this.props.children;
    } else if (this.state.overide) {
      return this.props.children;
    } else {
      return (
        <View style={styles.mainContent}>
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
            Your App Is out of date. You are on V:{manifest.version} - Update To
            V: {this.props.appStatus[0].v}
          </Text>
          <Button
            block
            style={styles.buttonItself}
            warning
            onPress={() => this.setState({ overide: true })}
          >
            <Text style={styles.button}>Dismiss</Text>
          </Button>
        </View>
      );
    }
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
)(Version);

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#EAEAEA',
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
