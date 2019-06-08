import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import posed from 'react-native-pose';
import { Icon, Button } from 'native-base';
const Box = posed.View({
  visible: {
    opacity: 1,
    transition: {
      opacity: { ease: 'easeOut', duration: 300 },
      default: { ease: 'linear', duration: 500 }
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      opacity: { ease: 'easeOut', duration: 300 },
      default: { ease: 'linear', duration: 500 }
    }
  }
});
class RefreshButton extends Component {
  state = {
    isVisible: false
  };
  componentDidUpdate(prevProps) {
    // if (this.props.scroll <= 20 && this.state.isVisible === true) {
    //   this.setState({
    //     isVisible: false
    //   });
    // }
    if (
      this.props.scroll >= 10 &&
      this.state.isVisible === true &&
      this.props.scroll > prevProps.scroll
    ) {
      this.setState({
        isVisible: false
      });
    }
    console.log(prevProps.scroll);
    console.log(this.props.scroll);

    if (
      prevProps.scroll - this.props.scroll > 10 &&
      this.state.isVisible === false
    ) {
      this.setState({
        isVisible: true
      });
    }
  }

  render() {
    return (
      <Box
        style={{
          position: 'absolute',
          top: 80,
          zIndex: 99,
          backgroundColor: '#D9D9D9',
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 7
        }}
        pose={this.state.isVisible ? 'visible' : 'hidden'}
      >
        {this.props.presence ? (
          <Text
            onPress={this.props.clickedRefreshButton}
            style={{
              fontSize: 12,
              color: '#999',
              paddingTop: 5,
              fontFamily: 'raleway-bold',
              textAlign: 'left',
              paddingBottom: 5
            }}
          >
            <Icon
              name="refresh"
              style={{ color: '#999', fontSize: 12, paddingRight: 10 }}
            />{' '}
            REFRESH
          </Text>
        ) : null}
      </Box>
    );
  }
}
export default compose(
  firebaseConnect([
    'presence' // { path: '/todos' } // object notation
  ]),
  connect(state => ({
    presence: state.firebase.data.presence
    // profile: state.firebase.profile // load profile
  }))
)(RefreshButton);
