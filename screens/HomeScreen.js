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
  static navigationOptions = {
    title: 'Dis Net Jy',
    headerTitleStyle: {
      fontFamily: 'playfair-display-black',
      fontSize: 20
    }
  };

  state = {
    name: '',
    body: '',
    limit: 10,
    lastOne: '',
    loading: true,
    isFetching: false,
    poems: null
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
        limit: 20,
        orderBy: ['date', 'desc'],
        startAfter: this.props.poems[lastOne].date
      })
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            poems: [...this.state.poems, doc.data()],
            isFetching: false
          });
        });
      });
  };
  onRefresh = async () => {
    await this.setState({ isFetching: true });
    await this.sendTofireBase();
  };
  initalFirebaseLoad = async () => {
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
  };
  async componentDidMount() {
    this.initalFirebaseLoad();
  }
  componentWillUnmount() {
    console.log('unMounted');
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.addedPoem);
    if (prevProps.addedPoem === false && this.props.addedPoem === true) {
      this.initalFirebaseLoad();
    }
  }

  render() {
    const { loading, poems } = this.state;
    return (
      <View style={styles.container}>
        {poems ? (
          <FlatList
            onEndReached={this.onRefresh}
            onEndReachedThreshold={0.5}
            // onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <ActivityIndicator />}
            // initialNumToRender={10}
            // maxToRenderPerBatch={10}
            data={poems}
            ref="full"
            renderItem={({ item, i }) => <CardPoem poem={item} key={i} />}
            keyExtractor={item => item.id}
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
    poems: state.firestore.ordered.poems,
    addedPoem: state.poems.addedPoem
  }))
)(HomeScreen);

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    width: screenWidth
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  }
});
