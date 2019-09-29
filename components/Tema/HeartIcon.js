import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from 'react-native';
// import Modal from 'react-native-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import wiggly from './heart.json';
import Lottie from 'lottie-react-native';
import { InstagramText, PodList } from '../styles';
import { Icon, Button } from 'native-base';
var { height, width } = Dimensions.get('window');

class HeartIcon extends Component {
  state = {
    showAppologiesModal: false,
    animation: null
  };
  modal = React.createRef();
  componentDidUpdate(pP, pS) {
    if (pP.play != this.props.play) {
      this._playAnimation();
    }
  }
  async componentDidMount() {
    setTimeout(() => {
      this._loadAnimation();
      // this._playAnimation();
    }, 2000);
  }
  onClosed = () => {
    const { onClosed } = this.props;

    if (onClosed) {
      onClosed();
    }
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };
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
    this.setState({ animation: wiggly });
  };
  render() {
    const { theme, t } = this.props;
    return (
      <View>
        {/* <ScreenBackground> */}
        {this.state.animation && (
          <React.Fragment>
            <PodList
              style={{
                alignSelf: 'center'
              }}
            >
              {t.votes}
            </PodList>
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center'
              }}
              source={this.state.animation}
              speed={this.state.speed}
              loop={false}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
}

const s = StyleSheet.create({
  modal: {}
});

export default compose(
  withFirebase,
  connect(
    state => ({
      theme: state.theme.isThemeDark
    }),
    {}
  )
)(HeartIcon);
