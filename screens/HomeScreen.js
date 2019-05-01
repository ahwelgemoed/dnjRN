import React from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Permissions, Notifications } from 'expo';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import OnlineUsers from '../components/OnlineUsers';
import { firestoreConnect } from 'react-redux-firebase';
// import { MonoText } from '../components/StyledText';
import CardPoem from '../components/CardPoem';
import TandC from '../components/TandC';
import Loading from '../components/Loading';
import { Icon, Button } from 'native-base';
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'DIS NET JY',
    headerRight: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" style={{ color: '#999' }} />
      </Button>
    ),
    headerLeft: navigation.state.params && navigation.state.params.headerLeft,
    headerTitleStyle: {
      fontFamily: 'raleway-boldI',
      fontSize: 20
    }
  });

  state = {
    scrollPosition: '',
    name: '',
    body: '',
    limit: 10,
    random: false,
    lastOne: '',
    loading: true,
    isFetching: false,
    orderBy: 'date',
    ordered: 'desc',
    poems: null
  };
  async _reload() {
    await this.setState({
      random: !this.state.random
    });
    if (this.state.random) {
      this.setLeftHeader();
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
    } else {
      this.setLeftHeader();
      await this.setState({
        isFetching: true,
        orderBy: 'date',
        ordered: 'desc',
        limit: 10,
        poems: null
      });
      await this.initalFirebaseLoad();
    }
  }

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
      // where: ['nsfw', '==', true],
      orderBy: [this.state.orderBy, this.state.ordered]
    });
    await this.setState({
      loading: false,
      poems: this.props.poems,
      isFetching: false
    });
  };
  async componentDidMount() {
    // AsyncStorage.removeItem('firstPost');
    await this.setLeftHeader();
    await this.initalFirebaseLoad();
    await this.registerForPushNotificationsAsync();
  }
  setLeftHeader = () => {
    this.props.navigation.setParams({
      headerLeft: (
        <Button transparent onPress={() => this._reload()}>
          {this.state.random ? (
            <Icon name="refresh" style={{ color: '#999' }} />
          ) : (
            <Icon name="shuffle" style={{ color: '#999' }} />
          )}
        </Button>
      )
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addedPoem === false && this.props.addedPoem === true) {
      this.initalFirebaseLoad();
      this.props.successfullyAddedPoem(false);
    }
  }
  handleScroll = async event => {
    const scroll = event.nativeEvent.contentOffset.y;
    await this.setState({
      scrollPosition: scroll
    });
  };
  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return;
    }

    try {
      let token = await Notifications.getExpoPushTokenAsync();

      const { firestore } = this.props;
      const payLoad = {
        token
      };

      await firestore
        .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
        .then(res => {
          retrun(console.log(res));
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { loading, poems } = this.state;

    return (
      <View style={styles.container}>
        {/* <TandC /> */}
        {poems ? (
          <React.Fragment>
            <OnlineUsers scroll={this.state.scrollPosition} />
            <FlatList
              useNativeDriver={true}
              scrollEventThrottle={160}
              onScroll={this.handleScroll}
              onEndReached={this.onRefresh}
              onEndReachedThreshold={0.5}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => (
                <ActivityIndicator color={'#91D9D9'} />
              )}
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
          </React.Fragment>
        ) : (
          <ActivityIndicator color={'#91D9D9'} />
          // <Loading />
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
      profile: state.firebase.profile,
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
    backgroundColor: '#ffffff',
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
