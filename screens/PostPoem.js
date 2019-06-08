import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import AddInstagramModal from '../components/AddInstagramModal';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { ScreenBackground } from '../components/Styles';
import {
  StyleSheet,
  Dimensions,
  AsyncStorage,
  ScrollView,
  View,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import FirstPostModal from '../components/FirstPostModal';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Container,
  Textarea,
  Button,
  Text,
  CheckBox,
  ListItem,
  Toast,
  Body,
  Icon
} from 'native-base';
import TopNav from '../components/TopNav';

class PostPoem extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTitle: (
      <TopNav
        pageTitle={'Post a Poem'}
        navigation={navigation}
        leftComponent={this.setLeftHeader}
      />
    )
  });

  // static navigationOptions = ({ navigation }) => ({
  //   title: 'Post a Poem',
  //   headerLeft: null,
  //   headerRight: (
  //     <Button transparent onPress={() => navigation.toggleDrawer()}>
  //       <Icon name="menu" style={{ color: '#999' }} />
  //     </Button>
  //   ),
  //   headerTitleStyle: {
  //     fontFamily: 'raleway-boldI',
  //     fontSize: 20
  //   }
  // });
  state = {
    withInstagram: false,
    instagram: false,
    body: '',
    openFirstModal: false,
    name: '',
    update: false,
    bookmarkedCount: 0,
    handle: '',
    nsfw: false,
    adminNotes: 'None',
    reported: false,
    loading: false
  };

  withInstagram = () => {
    this.setState({
      withInstagram: !this.state.withInstagram
    });
  };
  nsfw = () => {
    this.setState({
      nsfw: !this.state.nsfw
    });
  };
  upDateSave = async () => {};
  postToPoem = async () => {
    if (!this.state.name) {
      return Toast.show({
        text: 'Please give Poem a Title',
        position: 'top',
        type: 'danger',
        duration: 3000
      });
    }
    if (!this.state.body) {
      return Toast.show({
        text: 'Please give Poem a body',
        position: 'top',
        type: 'danger',
        duration: 3000
      });
    }
    if (this.state.firstPost != 'true') {
      return this.setState({
        openFirstModal: true
      });
    }
    this.setState({
      loading: true
    });
    if (this.state.update) {
      const { firestore, auth, firebase } = this.props;
      var db = firebase.firestore();
      const {
        id,
        date,
        bookmarkedCount,
        body,
        name,
        handle,
        nsfw,
        withInstagram,
        adminNotes,
        reported
      } = this.state;
      let payLoad;
      if (withInstagram) {
        payLoad = {
          date,
          body,
          nsfw,
          reported,
          bookmarkedCount,
          name,
          adminNotes,
          handle: this.props.profile.Instagram,
          uid: auth.uid
        };
      } else {
        payLoad = {
          date,
          body,
          adminNotes,
          nsfw,
          bookmarkedCount,
          name,
          reported,
          handle: '',
          uid: auth.uid
        };
      }
      await firestore
        .update(
          {
            collection: 'poems',
            doc: id
          },
          payLoad
        )
        .then(docRef => {
          this.props.navigation.navigate('Home');
          this.props.successfullyAddedPoem(true);
        })

        .catch(err =>
          this.setState({
            loading: false
          })
        );
    } else {
      const { firestore, auth } = this.props;
      const {
        date,
        body,
        reported,
        name,
        handle,
        bookmarkedCount,
        withInstagram,
        nsfw,
        adminNotes
      } = this.state;
      let payLoad;
      if (withInstagram) {
        payLoad = {
          date: parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0)),
          body,
          nsfw,
          name,
          adminNotes,
          bookmarkedCount,
          reported,
          handle: this.props.profile.Instagram,
          uid: auth.uid
        };
      } else {
        payLoad = {
          date: parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0)),
          nsfw,
          body,
          name,
          bookmarkedCount,
          reported,
          adminNotes,
          handle: '',
          uid: auth.uid
        };
      }
      await firestore
        .add(
          {
            collection: 'poems'
          },
          payLoad
        )
        .then(docRef =>
          firestore
            .update(
              {
                collection: 'poems',
                doc: docRef.id
              },
              { id: docRef.id }
            )
            .then(() => {
              console.log('2');
              this.props.navigation.navigate('Home');
              this.props.successfullyAddedPoem(true);
            })
        )
        .catch(err =>
          this.setState({
            loading: false
          })
        );
    }
  };
  async componentDidUpdate(prevProps, prevState) {
    const firstPost = await AsyncStorage.getItem('firstPost');
    if (this.state.openFirstModal === true && firstPost == 'true') {
      await this.setState({
        openFirstModal: false,
        firstPost
      });
      await this.postToPoem();
    }
  }
  async componentDidMount() {
    const firstPost = await AsyncStorage.getItem('firstPost');
    this.setState({
      firstPost
    });
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const name = navigation.getParam('name');
    const handle = navigation.getParam('handle');
    const bookmarkedCount = navigation.getParam('bookmarkedCount');
    const body = navigation.getParam('body');
    const nsfw = navigation.getParam('nsfw');
    const date = navigation.getParam('date');
    if (name) {
      await this.setState({
        id,
        name,
        nsfw,
        body,
        date,
        bookmarkedCount,
        update: true
      });
      if (handle) {
        await this.setState({
          withInstagram: true
        });
      }
    }
  }
  render() {
    const { handle, body, firstPost } = this.state;
    const { theme } = this.props;
    return (
      <ScreenBackground style={styles.container}>
        <TopNav
          pageTitle={'Post a Poem'}
          navigation={this.props.navigation}
          leftComponent={this.setLeftHeader}
        />
        <ScrollView>
          <Form>
            <Item>
              <Input
                style={
                  theme
                    ? {
                        color: '#D8D9D9',
                        fontSize: 16,
                        fontFamily: 'raleway-regular',
                        textAlign: 'left'
                      }
                    : {
                        color: '#2C2D2D',
                        fontSize: 16,
                        fontFamily: 'raleway-regular',
                        textAlign: 'left'
                      }
                }
                placeholder="Poem Title"
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />
            </Item>
            <Item>
              <Textarea
                style={
                  theme
                    ? {
                        color: '#D8D9D9',
                        fontSize: 16,
                        width: screenWidth - 20,
                        fontFamily: 'raleway-regular',
                        textAlign: 'left'
                      }
                    : {
                        color: '#2C2D2D',
                        fontSize: 16,
                        width: screenWidth - 20,
                        fontFamily: 'raleway-regular',
                        textAlign: 'left'
                      }
                }
                rowSpan={5}
                placeholder="Poem"
                value={this.state.body}
                onChangeText={text => this.setState({ body: text })}
              />
            </Item>
            {this.props.profile.isLoaded && this.props.profile.Instagram ? (
              <ListItem>
                <CheckBox
                  color={'#000'}
                  checked={this.state.withInstagram}
                  onPress={this.withInstagram}
                />
                <Body>
                  <Text style={styles.check}>
                    Post as {this.props.profile.Instagram}
                  </Text>
                </Body>
              </ListItem>
            ) : (
              <React.Fragment>
                <AddInstagramModal />
              </React.Fragment>
            )}
            <ListItem>
              <CheckBox
                color={'#000'}
                checked={this.state.nsfw}
                onPress={this.nsfw}
              />
              <Body>
                <Text style={styles.check}>NSFW</Text>
              </Body>
            </ListItem>
            <Button
              style={styles.buttonIn}
              block
              light
              onPress={this.postToPoem}
            >
              {this.state.loading ? <ActivityIndicator color={'#fff'} /> : null}
              <Text style={styles.labelIn}>Post Poem</Text>
            </Button>
            <Button
              block
              style={styles.buttonItself}
              bordered
              warning
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.button}>Cancel</Text>
            </Button>
          </Form>
          <FirstPostModal openFirstModal={this.state.openFirstModal} />
        </ScrollView>
      </ScreenBackground>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  labelIn: {
    color: '#fff',
    fontFamily: 'raleway-regular',
    fontSize: 16
  },
  buttonIn: {
    fontSize: 16,
    backgroundColor: '#91D9D9',
    marginTop: 20,
    width: screenWidth - 80,
    fontFamily: 'raleway-regular',
    alignSelf: 'center',
    textAlign: 'center'
  },
  button: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'center'
  },
  check: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonItself: {
    fontSize: 16,
    marginTop: 20,
    width: screenWidth - 80,
    fontFamily: 'raleway-regular',
    alignSelf: 'center',
    textAlign: 'center'
  }
});
const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  theme: state.theme.isThemeDark
});

export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(PostPoem);
