import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class GetTemas extends Component {
  componentDidMount() {
    this.initalFirebaseLoad();
  }
  initalFirebaseLoad = async () => {
    await this.setState({
      isFetching: true,
      poems: []
    });
    const { firestore } = this.props;
    await firestore
      .get({
        collection: 'tema'
        // orderBy: 'desc'
      })
      .then(res => {
        // this.setState({
        //   poems: this.props.poems,
        //   isFetching: false,
        //   loading: false
        // });
      });
  };
  render() {
    console.log(this.props.tema);

    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect(state => ({
    tema: state.firestore.ordered.tema,
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    addedPoem: state.poems.addedPoem,
    theme: state.theme.isThemeDark,
    swipeMode: state.theme.toggleSwipeMode
  }))
)(GetTemas);
