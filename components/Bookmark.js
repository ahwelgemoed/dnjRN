import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon, Toast } from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class Bookmark extends Component {
  state = { bookmarkedCount: this.props.bookmarkedCount };
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
          position: 'top'
        });
        this.props.toggleBookMark();
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
          position: 'top'
        });
        this.props.toggleBookMark();
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
    return (
      <Text syle={styles.elipse}>
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
      </Text>
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
    fontSize: 16,
    margin: 10,
    width: 10
  },
  elipse: {
    marginLeft: 20,
    minWidth: 20,
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
  profile: state.firebase.profile
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Bookmark);
