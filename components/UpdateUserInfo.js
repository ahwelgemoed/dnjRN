import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class UpdateUserInfo extends Component {
  componentDidMount() {
    const { firebase, profile, firestore } = this.props;
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        if ((!profile.user && user.uid) || user.uid !== profile.user) {
          firestore
            .update({ collection: 'users', doc: user.uid }, { user: user.uid })
            .then(res => {});
        }
        if (user != null && user.providerData[0].providerId == 'facebook.com') {
          let payLoad = {};
          const now = this.props.auth.lastLoginAt - this.props.auth.createdAt;
          if (now <= 10000) {
            payLoad = {
              user: user.uid,
              auth: false,
              username: user.displayName,
              seensfw: true,
              bookmarks: [],
              Instagram: '',
              email: user.email
            };
          } else {
            payLoad = {
              user: user.uid,
              username: user.displayName,
              email: user.email
            };
          }

          firebase
            .updateProfile(payLoad)
            .then(res => {
              console.log('Updated');
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    });
  }
  render() {
    return <View />;
  }
}
export default compose(
  firestoreConnect(),
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem
    }),
    {}
  )
)(UpdateUserInfo);
