import React, { Component } from 'react';
import { Text, ScrollView, ActivityIndicator } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { InstagramText, PodList } from '../styles';
import { compareValues } from '../../helperFuctions';
import { ListItem, Icon, Right, Left, Toast } from 'native-base';
import HeartIcon from './HeartIcon';

class VoteItems extends Component {
  state = { _playAnimation: false };

  vote = (t, i) => {
    const { firestore } = this.props;

    firestore
      .update({ collection: 'userTemas', doc: t.id }, { votes: t.votes + 1 })
      .then(docRef => {
        this.setState({
          _playAnimation: !this.state._playAnimation
        });
        this.props.initalFirebaseLoad();
      })
      .catch(err =>
        this.setState({
          loading: false
        })
      );
  };
  render() {
    const { userTemas, theme, t } = this.props;
    return (
      <ListItem onPress={this.vote.bind(this, t)}>
        <Left>
          <React.Fragment>
            <PodList> {t.title}</PodList>
          </React.Fragment>
        </Left>
        <Right style={{ textAlign: 'center', alignSelf: 'center' }}>
          <HeartIcon t={t} play={this.state._playAnimation} />
        </Right>
      </ListItem>
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
)(VoteItems);
