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
  render() {
    const { loading, poems } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator color={'#3b5998'} />
        ) : (
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
        )}
      </SafeAreaView>
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
