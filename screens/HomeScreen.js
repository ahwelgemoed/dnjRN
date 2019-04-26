import React from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator
} from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
// import { MonoText } from '../components/StyledText';
import CardPoem from '../components/CardPoem';
import { Icon, Button } from 'native-base';
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Dis Net Jy',
    headerRight: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" style={{ color: '#999' }} />
      </Button>
    ),
    headerLeft: navigation.state.params && navigation.state.params.headerLeft,
    headerTitleStyle: {
      fontFamily: 'playfair-display-black',
      fontSize: 20
    }
  });

  state = {
    name: '',
    body: '',
    limit: 10,
    lastOne: '',
    loading: true,
    isFetching: false,
    orderBy: 'date',
    ordered: 'desc',
    poems: null
  };
  async _reload() {
    const options = ['body', 'date', 'id', 'name'];
    const orders = ['asc', 'desc'];

    const rand = options[Math.floor(Math.random() * options.length)];
    const randorders = orders[Math.floor(Math.random() * orders.length)];

    await this.setState({
      isFetching: true,
      orderBy: rand,
      limit: 10,
      poems: null,
      ordered: randorders
    });
    await this.initalFirebaseLoad();
  }

  sendTofireBase = async () => {
    const { firestore } = this.props;
    const lastOne = this.props.poems.length - 1;
    console.log(lastOne);

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
        orderBy: [this.state.orderBy, this.state.ordered],
        startAfter: this.props.poems[lastOne][this.state.orderBy]
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
      orderBy: [this.state.orderBy, this.state.ordered]
    });
    await this.setState({
      loading: false,
      poems: this.props.poems,
      isFetching: false
    });
  };
  async componentDidMount() {
    this.initalFirebaseLoad();
    this.props.navigation.setParams({
      headerLeft: (
        <Button transparent onPress={() => this._reload()}>
          <Icon name="shuffle" style={{ color: '#999' }} />
        </Button>
      )
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addedPoem === false && this.props.addedPoem === true) {
      this.initalFirebaseLoad();
      this.props.successfullyAddedPoem(false);
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
            data={poems}
            ref="full"
            renderItem={({ item, i }) => (
              <CardPoem
                poem={item}
                key={i}
                auth={this.props.auth}
                navigation={this.props.navigation}
              />
            )}
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
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem
    }),
    { successfullyAddedPoem }
  )
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
