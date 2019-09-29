import React, { Component } from 'react';
import { Text, ScrollView, ActivityIndicator } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { InstagramText, PodList } from '../styles';
import { compareValues } from '../../helperFuctions';
import VoteItems from './VoteItems';

class AllUserSujestions extends Component {
  componentDidMount() {
    this.initalFirebaseLoad();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.reftesh && prevProps.reftesh) {
      this.initalFirebaseLoad();
    }
  }
  initalFirebaseLoad = async () => {
    await this.setState({
      isFetching: true,
      poems: []
    });
    const { firestore } = this.props;
    await firestore
      .get({
        collection: 'userTemas',
        orderBy: ['votes', 'desc']
      })
      .then(res => {});
  };
  render() {
    const { userTemas, theme } = this.props;
    return (
      <ScrollView style={{ backgroundColor: theme ? '#2b2b2b' : '#efefef' }}>
        {userTemas ? (
          userTemas.map((t, i) => {
            if (!t.wasUsed) {
              return (
                <VoteItems
                  key={i}
                  t={t}
                  initalFirebaseLoad={this.initalFirebaseLoad}
                />
              );
            }
          })
        ) : (
          <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
        )}
      </ScrollView>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect(state => ({
    userTemas: state.firestore.ordered.userTemas,
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    addedPoem: state.poems.addedPoem,
    theme: state.theme.isThemeDark,
    swipeMode: state.theme.toggleSwipeMode
  }))
)(AllUserSujestions);
