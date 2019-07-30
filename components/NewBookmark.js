import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Vibration
} from 'react-native';
import { Icon, Toast } from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class NewBookmark extends Component {
  state = { bookmarkedCount: this.props.bookmarkedCount, loading: false };
  addToBookmarks = async bookmark => {
    const { firestore } = this.props;
    await this.setState({
      loading: true
    });
    Vibration.vibrate(500);
    const payLoad = {
      bookmarks: [...this.props.profile.bookmarks, bookmark]
    };
    await firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {
        Toast.show({
          text: 'Added Bookmark',
          buttonText: 'Okay',
          position: 'bottom'
        });
        this.props.toggleBookMark();
        this.setState({
          loading: false
        });
        firestore
          .update(
            { collection: 'poems', doc: this.props.poemId },
            { bookmarkedCount: this.state.bookmarkedCount + 1 }
          )
          .then(() => {
            this.setState({
              bookmarkedCount: this.state.bookmarkedCount + 1
            });
          });
      });
  };
  removeBookmark = async bookmark => {
    const { firestore } = this.props;
    await this.setState({
      loading: true
    });
    Vibration.vibrate(500);
    const array = this.props.profile.bookmarks;
    let index = array.indexOf(bookmark);
    if (index !== -1) array.splice(index, 1);

    const payLoad = {
      bookmarks: array
    };
    await firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {
        Toast.show({
          text: 'Removed Bookmark',
          buttonText: 'Okay',
          position: 'bottom'
        });
        this.props.toggleBookMark();
        this.setState({
          loading: false
        });
        firestore
          .update(
            { collection: 'poems', doc: this.props.poemId },
            { bookmarkedCount: this.state.bookmarkedCount - 1 }
          )
          .then(() => {
            this.setState({
              bookmarkedCount: this.state.bookmarkedCount - 1
            });
          });
      });
  };

  render() {
    const { theme } = this.props;
    return this.props.bookmarked ? (
      <Icon
        onPress={this.removeBookmark.bind(this, this.props.poemId)}
        style={{
          position: 'absolute',
          color: '#474554',
          top: 8,
          right: -25,
          transform: [{ rotate: '90deg' }]
        }}
        type="FontAwesome"
        name="bookmark"
      />
    ) : (
      <Icon
        onPress={this.addToBookmarks.bind(this, this.props.poemId)}
        style={{
          position: 'absolute',
          color: '#c2c2c2',
          top: 8,
          right: -25,
          transform: [{ rotate: '90deg' }]
        }}
        type="FontAwesome"
        name="bookmark"
      />
    );
  }
}
const styles = StyleSheet.create({
  selected: {
    color: '#91D9D9',
    fontSize: 16,
    margin: 10,
    width: 10
  },
  notSelected: {
    color: '#9D9E9E',
    fontSize: 18,
    margin: 10,
    width: 10
  },
  elipse: {
    // marginLeft: 20,
    // minWidth: 20,
    borderRadius: 15,
    alignItems: 'center',
    paddingBottom: 10,
    justifyContent: 'center'
  },
  elipseIcon: {
    // color: '#ddd',
    fontSize: 16,
    margin: 10,
    width: 10
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  theme: state.theme.isThemeDark
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(NewBookmark);
