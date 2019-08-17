import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { InstagramText, FeatName, PoemBodyText } from './Styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import wiggly from './blobby.json';
import Lottie from 'lottie-react-native';
import { Icon, Button } from 'native-base';
import Modalize from 'react-native-modalize';
var { height, width } = Dimensions.get('window');

export default class NewFeature extends Component {
  state = {
    showAppologiesModal: false,
    animation: null
  };
  modal = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      this.openModal();
      this._playAnimation();
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
    this.setState({ animation: wiggly }, this._playAnimation);
  };
  render() {
    return (
      <Modalize
        ref={this.modal}
        onClosed={this.onClosed}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          stickyHeaderIndices: [0]
        }}
        modalHeight={height / 2}
        modalStyle={s.modal}
        openAnimationConfig={{
          timing: { duration: 400 },
          spring: { speed: 20, bounciness: 10 }
        }}
      >
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center'
            }}
            source={this.state.animation}
            speed={this.state.speed}
            loop={true}
          />
        )}
        <FeatName>How It Works</FeatName>
        <PoemBodyText>
          If You see this{' '}
          <Icon
            style={{
              position: 'absolute',
              color: '#c2c2c2',
              transform: [{ rotate: '0deg' }],
              fontSize: 20,
              right: 30,
              top: 10
            }}
            type="FontAwesome"
            name="reply"
          />{' '}
          Icon that means you can "reply" to that poem with a poem.
        </PoemBodyText>
        <PoemBodyText>
          If a poem title starts with
          <InstagramText> MET APOLOGIE AAN</InstagramText> that means that poem
          is a reply to some other poem. Pressing that text will open the thread
          of "replies".
        </PoemBodyText>
      </Modalize>
    );
  }
}

const s = StyleSheet.create({
  modal: {
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    shadowOpacity: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
