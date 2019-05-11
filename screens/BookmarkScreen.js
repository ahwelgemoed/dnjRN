import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import CardPoem from '../components/CardPoem';
import { Button, Icon } from 'native-base';

class BookmarkScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Bookmarks',
    headerLeft: null,
    headerRight: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" style={{ color: '#999' }} />
      </Button>
    ),
    headerTitleStyle: {
      fontFamily: 'raleway-boldI',
      fontSize: 20
    }
  });
  state = {
    loading: true,
    poems: ''
  };
  getBookMarkedPoems = async () => {
    const { firestore } = this.props;
    await this.props.profile.bookmarks.map(bookmark => {
      firestore.get({ collection: 'poems', doc: bookmark }).then(doc => {
        this.setState({
          poems: [...this.state.poems, doc.data()]
        });
      });
    });
  };
  async componentDidMount() {
    await this.getBookMarkedPoems();
  }
  async componentDidUpdate() {
    if (
      this.state.loading &&
      this.state.poems.length === this.props.profile.bookmarks.length
    ) {
      this.setState({ loading: false });
    }
    if (
      !this.state.loading &&
      this.state.poems.length !== this.props.profile.bookmarks.length
    ) {
      await this.setState({ loading: true, poems: '' });
      await this.getBookMarkedPoems();
    }
  }
  render() {
    const { loading, poems } = this.state;
    if (this.props.profile.bookmarks.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.name}>You don't have any bookmarks</Text>
          <Text style={styles.names}>#SAD</Text>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          {loading ? (
            <ActivityIndicator color={'#91D9D9'} />
          ) : (
            <React.Fragment>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
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
            </React.Fragment>
          )}
        </SafeAreaView>
      );
    }
  }
}
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    width: screenWidth
  },
  name: {
    fontSize: 22,
    paddingTop: 10,
    fontFamily: 'raleway-bold',
    textAlign: 'left'
  },
  names: {
    fontSize: 14,
    paddingTop: 10,
    color: '#999',
    fontFamily: 'raleway-bold',
    textAlign: 'center'
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
