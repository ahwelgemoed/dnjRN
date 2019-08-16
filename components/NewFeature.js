import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { InstagramText, FeatName, PoemBodyText } from './Styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import wiggly from './blobby.json';
import Lottie from 'lottie-react-native';
import { Icon, Button } from 'native-base';
var { height, width } = Dimensions.get('window');

class NewFeature extends Component {
  state = {
    showAppologiesModal: false,
    animation: null
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showAppologiesModal: true
      });
      this._playAnimation();
    }, 5000);
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.props.showAppologiesModal !== prevProps.showAppologiesModal &&
  //     !this.state.showAppologiesModal
  //   ) {
  //     this.setState({
  //       showAppologiesModal: true
  //     });
  //   }
  // }
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

  toggleModal = () => {
    this.setState({ showAppologiesModal: !this.state.showAppologiesModal });
  };

  render() {
    const { theme } = this.props;
    return (
      <View onPress={this.toggleModal}>
        <Modal
          style={{ borderRadius: height * 0.03 }}
          isVisible={this.state.showAppologiesModal}
          onBackdropPress={() => this.setState({ showAppologiesModal: false })}
        >
          <View
            style={{
              paddingTop: 8,
              backgroundColor: theme ? '#191919' : '#fff',
              width: width * 0.95,
              height: height * 0.8,
              alignSelf: 'center',
              top: height * 0.1,
              borderRadius: height * 0.03,
              alignItems: 'center'
            }}
          >
            <FeatName> NEW FEATURE </FeatName>
            <InstagramText> MET APOLOGIE AAN </InstagramText>
            {this.state.animation && (
              <Lottie
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 200,
                  height: 200
                }}
                source={this.state.animation}
                speed={this.state.speed}
                loop={true}
              />
            )}
            <ScrollView style={{ paddingRight: 10, paddingLeft: 10 }}>
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
                <InstagramText> MET APOLOGIE AAN</InstagramText> that means that
                poem is a reply to some other poem. Pressing that text will open
                the thread of "replies".
              </PoemBodyText>
              <Button
                style={{
                  fontSize: 16,
                  backgroundColor: theme ? '#2f2f2f' : '#e5e5e5',
                  marginTop: 20,
                  marginRight: 5,
                  fontFamily: 'raleway-regular',
                  textAlign: 'center'
                }}
                block
                warning
                onPress={() => this.setState({ showAppologiesModal: false })}
              >
                <PoemBodyText>Close</PoemBodyText>
              </Button>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.theme.isThemeDark
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    {}
  )
)(NewFeature);
