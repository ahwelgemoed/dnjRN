import React from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  AsyncStorage,
  Text
} from 'react-native';
import { Permissions, Notifications } from 'expo';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RefreshButton from '../components/RefreshButton';
import { firestoreConnect } from 'react-redux-firebase';
// import { MonoText } from '../components/StyledText';
import CardPoem from '../components/CardPoem';
import HorisontalPoems from '../components/HorisontalPoems';
import TandC from '../components/TandC';
import Loading from '../components/Loading';
import { Icon, Button } from 'native-base';
class HomeScreen extends React.PureComponent {
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
    isFetching: true,
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
      limit: this.state.limit,
      lastOne: lastOne
    });
    const { loading, poems } = this.state;
    await firestore
      .get({
        collection: 'poems',
        limit: 10,
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
    await this.setState({
      isFetching: true
    });
    const { firestore } = this.props;
    await firestore
      .get({
        collection: 'poems',
        limit: this.state.limit,
        orderBy: [this.state.orderBy, this.state.ordered]
      })
      .then(() => {
        this.setState({
          poems: this.props.poems,
          isFetching: false,
          loading: false
        });
      });
  };
  async componentDidMount() {
    // AsyncStorage.removeItem('firstPost');
    await this.setLeftHeader();
    await this.initalFirebaseLoad();
    await setTimeout(() => {
      this.registerForPushNotificationsAsync();
    }, 2000);
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
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.addedPoem === false && this.props.addedPoem === true) {
      this.initalFirebaseLoad();
      this.props.successfullyAddedPoem(false);
    }
    await this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { firestore, profile } = this.props;

        if ((!profile.user && user.uid) || user.uid !== profile.user) {
          firestore
            .update({ collection: 'users', doc: user.uid }, { user: user.uid })
            .then(res => {
              console.log('Updated');
            });
        }
      }
    });
  }
  handleScroll = async event => {
    const scroll = event.nativeEvent.contentOffset.y;
    await this.setState({
      scrollPosition: scroll
    });
  };
  registerForPushNotificationsAsync = async () => {
    const { firestore } = this.props;
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
    let token = await Notifications.getExpoPushTokenAsync();

    const payLoad = {
      token
    };
    await firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  _keyExtractor = (item, index) => index;

  clickedRefreshButton = () => {
    this.onRefresh();
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  render() {
    const { loading, poems } = this.state;
    return (
      <View style={styles.container}>
        {/* <TandC /> */}
        {poems ? (
          <React.Fragment>
            {/* <Text>{poems.length}</Text> */}
            <RefreshButton
              scroll={this.state.scrollPosition}
              clickedRefreshButton={this.clickedRefreshButton}
            />
            <FlatList
              scrollEventThrottle={160}
              onScroll={this.handleScroll}
              onEndReached={this.onRefresh}
              onEndReachedThreshold={0.5}
              onRefresh={this.initalFirebaseLoad}
              refreshing={this.state.isFetching}
              showsVerticalScrollIndicator={false}
              keyExtractor={this._keyExtractor}
              ListFooterComponent={() => (
                <ActivityIndicator color={'#91D9D9'} />
              )}
              data={poems}
              ref={ref => {
                this.flatListRef = ref;
              }}
              renderItem={({ item, i }) => (
                <CardPoem
                  poem={item}
                  poems={poems}
                  auth={this.props.auth}
                  navigation={this.props.navigation}
                />
              )}
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
