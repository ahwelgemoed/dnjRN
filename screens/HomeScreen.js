import React from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
// import { MonoText } from '../components/StyledText';
import CardPoem from '../components/CardPoem';

class HomeScreen extends React.Component {
  state = {
    name: '',
    body: '',
    limit: 10,
    lastOne: '',
    loading: true,
    isFetching: false,
    poems: null
  };
  static navigationOptions = {
    header: null
  };
  sendTofireBase = async () => {
    const { firestore } = this.props;
    const lastOne = this.props.poems.length - 1;

    await this.setState({
      isFetching: true,
      limit: this.state.limit + 10,
      lastOne: lastOne
    });
    const { loading, poems } = this.state;

    await firestore
      .get({
        collection: 'poems',
        limit: 10,
        orderBy: ['date', 'desc'],
        startAfter: this.props.poems[lastOne].date
      })
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            poems: [...this.state.poems, doc.data()]
          });
        });
      })
      .then(querySnapshot => {
        this.setState({ isFetching: false });
      });
  };
  onRefresh() {
    this.setState({ isFetching: true }, function() {
      this.sendTofireBase();
    });
  }
  async componentDidMount() {
    const { firestore } = this.props;
    await firestore.get({
      collection: 'poems',
      limit: this.state.limit,
      orderBy: ['date', 'desc']
    });
    await this.setState({
      loading: false,
      poems: this.props.poems,
      isFetching: false
    });
  }

  render() {
    const { loading, poems } = this.state;
    return (
      <View style={styles.container}>
        {poems ? (
          <FlatList
            onEndReached={() => this.onRefresh()}
            onEndReachedThreshold={0}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            showsVerticalScrollIndicator={false}
            // initialNumToRender={10}
            // maxToRenderPerBatch={10}
            data={poems}
            ref="full"
            renderItem={({ item, i }) => <CardPoem poem={item} />}
            keyExtractor={item => item._id}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}
export default compose(
  firestoreConnect(),
  connect(state => ({
    poems: state.firestore.ordered.poems
  }))
)(HomeScreen);

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: screenWidth
  }
});
