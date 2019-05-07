import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Toast } from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Bookmark extends Component {
  addToBookmarks = bookmark => {
    const { firestore } = this.props;
    const payLoad = {
      bookmarks: [...this.props.profile.bookmarks, bookmark]
    };
    firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {
        Toast.show({
          text: 'Added Bookmark',
          buttonText: 'Okay',
          position: 'bottom'
        });
        this.props.toggleBookMark();
      });
  };
  removeBookmark = bookmark => {
    const { firestore } = this.props;
    const array = this.props.profile.bookmarks;
    let index = array.indexOf(bookmark);
    if (index !== -1) array.splice(index, 1);

    const payLoad = {
      bookmarks: array
    };
    firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {
        Toast.show({
          text: 'Removed Bookmark',
          buttonText: 'Okay',
          position: 'bottom'
        });
        this.props.toggleBookMark();
      });
  };
  render() {
    return (
      <View>
        {this.props.bookmarked ? (
          <Icon
            style={styles.selected}
            type="FontAwesome"
            name="bookmark"
            onPress={this.removeBookmark.bind(this, this.props.poemId)}
          />
        ) : (
          <Icon
            style={styles.notSelected}
            type="FontAwesome"
            name="bookmark"
            onPress={this.addToBookmarks.bind(this, this.props.poemId)}
          />
        )}
      </View>
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
    color: '#ddd',
    fontSize: 16,
    margin: 10,
    width: 10
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Bookmark);
