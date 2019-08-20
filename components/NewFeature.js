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
import {
  InstagramText,
  FeatName,
  PoemBodyText,
  ScreenBackground
} from './Styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import wiggly from './blobby.json';
import Lottie from 'lottie-react-native';
import { Icon, Button } from 'native-base';
import Modalize from 'react-native-modalize';
var { height, width } = Dimensions.get('window');

class NewFeature extends Component {
  state = {
    showAppologiesModal: false,
    animation: null
  };
  modal = React.createRef();

  async componentDidMount() {
    const MetApologieaan = await AsyncStorage.getItem('MetApologieaan');
    if (MetApologieaan != 'true') {
      AsyncStorage.setItem('MetApologieaan', 'true');
      setTimeout(() => {
        this.openModal();
        this._playAnimation();
      }, 2000);
    }
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
    const { theme } = this.props;
    return (
      <Modalize
        ref={this.modal}
        onClosed={this.onClosed}
        scrollViewProps={{
          showsVerticalScrollIndicator: false
        }}
        modalHeight={height / 2}
        modalStyle={{
          backgroundColor: theme ? '#000' : '#fff',
          margin: 20,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          shadowOpacity: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        openAnimationConfig={{
          timing: { duration: 400 },
          spring: { speed: 20, bounciness: 10 }
        }}
      >
        {/* <ScreenBackground> */}
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
        <FeatName>
          Hmmm... Seems you all like replying to each other's work... So Let's
          make it official
        </FeatName>
        {/* <FeatName>How It Works</FeatName> */}
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
          of "replies", from there into the past.
        </PoemBodyText>
        {/* </ScreenBackground> */}
      </Modalize>
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
)(NewFeature);
