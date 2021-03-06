import React from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
  ActivityIndicator,
  AsyncStorage,
  Text,
  Platform
} from 'react-native';
import { Notifications } from 'expo';
import GetPodcasts from '../components/Podcast/GetPodcasts';
import { HZScroll } from 'horizontaltextscroll';
import * as Permissions from 'expo-permissions';
import { successfullyAddedPoem } from '../actions/poemsActions';
import ActiveTemaCard from '../components/Tema/ActiveTemaCard';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import RefreshButton from '../components/RefreshButton';
import NewPoem from '../components/NewPoem';
import TandC from '../components/TandC';
import Loading from '../components/Loading';
import NewFeature from '../components/NewFeature';
import ListAllAudioComponent from '../components/ListAllAudioComponent';
import { Icon, Button } from 'native-base';
import UpdateUserInfo from '../components/UpdateUserInfo';
import { ScreenBackground } from '../components/styles';
import TopNav from '../components/TopNav';
import MorningModal from '../components/MorningModal';
import SwipeLottie from '../components/SwipeLottie';
import Constants from 'expo-constants';
const { manifest } = Constants;

class HomeScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTitle: (
      <TopNav
        pageTitle={'DNJ'}
        navigation={navigation}
        leftComponent={this.setLeftHeader}
      />
    )
    // headerTransparent: true,
  });

  state = {
    scrollPosition: '',
    name: '',
    swipeForPoem: '',
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
      isFetching: true,
      poems: []
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
    // await AsyncStorage.removeItem('swipeForPoem');
    const swipeForPoem = JSON.parse(await AsyncStorage.getItem('swipeForPoem'));
    await this.setState({
      swipeForPoem
    });

    await this.initalFirebaseLoad();
    await this.getGrantedToken();
    await setTimeout(() => {
      this.registerForPushNotificationsAsync();
    }, 2000);
    await this.updateNewProfile();
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
    // if (prevProps.swipeMode !== this.props.swipeMode) {
    //   const swipeForPoem = JSON.parse(
    //     await AsyncStorage.getItem('swipeForPoem')
    //   );
    //   await this.setState({
    //     swipeForPoem
    //   });
    // }
    if (prevProps.addedPoem === false && this.props.addedPoem === true) {
      await this.initalFirebaseLoad();
      await this.props.successfullyAddedPoem(false);
    }
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
      .then(res => {})
      .catch(err => {});
  };
  updateNewProfile = async () => {
    const { visits } = this.props.profile;
    const hand = this.props.profile.Instagram;
    const res = hand.replace('@', '');
    const payLoad = {
      lastLogin: Date.now(),
      Instagram: res,
      Platform: Platform.OS,
      V: manifest.version,
      visits: visits ? visits + 1 : 1
    };
    const { firestore } = this.props;
    await firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {})
      .catch(err => {});
  };

  getGrantedToken = () => {
    const { firestore } = this.props;
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(status => {
      Notifications.getExpoPushTokenAsync()
        .then(token => {
          const payLoad = {
            token
          };
          if (token) {
            firestore
              .update(
                { collection: 'users', doc: this.props.auth.uid },
                payLoad
              )
              .then(res => {})
              .catch(err => {});
          }
        })
        .catch(err => {});
    });
  };
  clickedRefreshButton = () => {
    this.initalFirebaseLoad();
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  scrollDown = () => {
    if (!this.props.swipeMode) {
      this.flatListRef.scrollToOffset({
        animated: true,
        offset: this.state.scrollPosition + 100
      });
    }
  };

  render() {
    const { loading, poems } = this.state;
    const { theme, swipeMode } = this.props;

    return (
      <ScreenBackground style={styles.container}>
        <GetPodcasts navigation={this.props.navigation} />
        <TopNav
          pageTitle={'DNJ'}
          navigation={this.props.navigation}
          leftComponent={
            <Button transparent onPress={() => this._reload()}>
              {this.state.random ? (
                <Icon
                  name="refresh"
                  style={{ color: '#999', paddingBottom: 40 }}
                />
              ) : (
                <Icon
                  name="shuffle"
                  style={{ color: '#999', paddingBottom: 40 }}
                />
              )}
            </Button>
          }
        />
        <MorningModal navigation={this.props.navigation} />
        {/* <NewFeature
          ref={el => {
            modal = el;
          }}
        /> */}
        <UpdateUserInfo />
        {poems ? (
          <React.Fragment>
            {/* <RefreshButton
              scroll={this.state.scrollPosition}
              clickedRefreshButton={this.clickedRefreshButton}
            /> */}
            {swipeMode ? (
              <React.Fragment>
                <View
                  style={{
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                  }}
                >
                  <HZScroll
                    style={{ height: height }}
                    scrollEventThrottle={160}
                    keyExtractor={(item, index) => index.toString()}
                    onScroll={this.handleScroll}
                    onEndReached={this.onRefresh}
                    onEndReachedThreshold={0.5}
                    onRefresh={this.initalFirebaseLoad}
                    refreshing={this.state.isFetching}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={() => (
                      <ScreenBackground
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          width: width,
                          height: height
                        }}
                      >
                        <ActivityIndicator
                          style={{
                            flex: 1,
                            height: height
                          }}
                          color={theme ? '#D8D9D9' : '#2C2D2D'}
                        />
                      </ScreenBackground>
                    )}
                    // ListHeaderComponent={this._renderHeader}
                    ref={ref => {
                      this.flatListRef = ref;
                    }}
                    data={poems}
                    components={item => (
                      <NewPoem
                        scrollDown={this.scrollDown}
                        poem={item}
                        auth={this.props.auth}
                        navigation={this.props.navigation}
                      />
                      // <CardPoem
                      //   poem={item}
                      //   auth={this.props.auth}
                      //   navigation={this.props.navigation}
                      // />
                    )}
                  />
                </View>
              </React.Fragment>
            ) : (
              <View
                style={{
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1
                }}
              >
                <FlatList
                  contentContainerStyle={{
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  scrollEventThrottle={160}
                  onScroll={this.handleScroll}
                  onEndReached={this.onRefresh}
                  onEndReachedThreshold={0.5}
                  onRefresh={this.initalFirebaseLoad}
                  refreshing={this.state.isFetching}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={() => (
                    <ActiveTemaCard navigation={this.props.navigation} />
                  )}
                  ListFooterComponent={() => (
                    <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
                  )}
                  data={poems}
                  ref={ref => {
                    this.flatListRef = ref;
                  }}
                  renderItem={({ item, i }) => (
                    <React.Fragment>
                      <NewPoem
                        scrollDown={this.scrollDown}
                        poem={item}
                        auth={this.props.auth}
                        navigation={this.props.navigation}
                      />
                    </React.Fragment>
                  )}
                />
              </View>
            )}
          </React.Fragment>
        ) : (
          <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
        )}
      </ScreenBackground>
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
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark,
      swipeMode: state.theme.toggleSwipeMode
    }),
    { successfullyAddedPoem }
  )
)(HomeScreen);

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    width: width
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  }
});
