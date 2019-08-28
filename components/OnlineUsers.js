import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import posed from 'react-native-pose';
class OnlineUsers extends Component {
  state = {
    isVisible: true
  };
  render() {
    return (
      <React.Fragment>
        {this.props.presence ? Object.keys(this.props.presence).length : null}{' '}
        Online
      </React.Fragment>
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
)(OnlineUsers);
