import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import CardPoem from '../components/CardPoem';

class BookmarkScreen extends Component {
  state = {
    loading: true,
    poems: ''
  };
  async componentDidMount() {
    const { firestore } = this.props;
    await this.props.profile.bookmarks.map(bookmark => {
      firestore.get({ collection: 'poems', doc: bookmark }).then(doc => {
        this.setState({
          poems: [...this.state.poems, doc.data()]
        });
      });
    });
    await this.setState({ loading: false });
  }
  _keyExtractor = (item, index) => index;
  render() {
    const { loading, poems } = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <Text> Loading </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
            data={poems}
            ref={ref => {
              this.flatListRef = ref;
            }}
            renderItem={({ item, i }) => (
              <CardPoem
                poem={item}
                auth={this.props.auth}
                navigation={this.props.navigation}
              />
            )}
          />
        )}
      </View>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    width: screenWidth
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  poems: state.firestore.ordered.poems
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(BookmarkScreen);
