import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import AddInstagramModal from '../components/AddInstagramModal';
import PostPoemReplyModal from '../components/PostPoemReplyModal';
import PurePoemView from '../components/PurePoemView';
import { successfullyAddedPoem } from '../actions/poemsActions';
import {
  PostPoemBackGround,
  JustColorBack,
  InstagramText,
  PoemName
} from '../components/Styles';
import {
  HideWithKeyboard,
  ShowWithKeyboard
} from 'react-native-hide-with-keyboard';
import {
  StyleSheet,
  Dimensions,
  AsyncStorage,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import FirstPostModal from '../components/FirstPostModal';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Container,
  Right,
  Left,
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
import CNRichTextEditor, {
  CNToolbar,
  getInitialObject,
  convertToHtmlString,
  getDefaultStyles,
  convertToObject
} from 'react-native-cn-richtext-editor';

const defaultStyles = getDefaultStyles();
let customStyles = {
  ...defaultStyles,
  body: { fontSize: 16, fontFamily: 'raleway-medium' },
  bold: { fontSize: 16, fontFamily: 'raleway-bold' },
  heading: { fontSize: 18 },
  title: { fontSize: 20 },
  ol: { fontSize: 14 },
  ul: { fontSize: 12 }
};
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
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      body: [getInitialObject()],
      withInstagram: false,
      showAppologiesModal: false,
      instagram: false,
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

    this.editor = null;
  }
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
    const { navigation } = this.props;
    const poem = navigation.getParam('poem', 'noPoem');
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
        text: 'Please give Poem a Body',
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

      payLoad = {
        date,
        body: convertToHtmlString(body),
        nsfw,
        reported,
        bookmarkedCount,
        name,
        adminNotes,
        richText: true,
        handle: withInstagram ? this.props.profile.Instagram : '',
        uid: auth.uid
      };
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

      payLoad = {
        date: parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0)),
        body: convertToHtmlString(body),
        nsfw,
        name,
        adminNotes,
        bookmarkedCount,
        reported,
        handle: withInstagram ? this.props.profile.Instagram : '',
        richText: true,
        uid: auth.uid,
        canReply: true,
        repliedTo: poem.id ? poem.id : null,
        repliedToName: poem.id ? poem.name : null
      };
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
    if (body) {
      const convertBody = convertToObject(body);
      await this.setState({
        id,
        name,
        nsfw,
        body: convertBody,
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
  onStyleKeyPress = toolType => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = tag => {
    this.setState({
      selectedTag: tag
    });
  };

  onSelectedStyleChanged = styles => {
    this.setState({
      selectedStyles: styles
    });
  };

  onValueChanged = value => {
    this.setState({
      body: value
    });
  };

  viewReplyingPoem = () => {
    this.setState({
      viewReplyingPoem: !this.state.viewReplyingPoem
    });
  };

  render() {
    const { handle, body, firstPost } = this.state;
    const { theme } = this.props;
    const { navigation } = this.props;
    const poem = navigation.getParam('poem', 'noPoem');
    return (
      <PostPoemBackGround
        style={
          theme
            ? {
                flex: 1,
                paddingTop: 40,
                fontFamily: 'raleway-regular'
                // backgroundColor: '#232526'
              }
            : {
                flex: 1,
                paddingTop: 40,
                fontFamily: 'raleway-regular'
                // backgroundColor: '#EAEAEA'
              }
        }
      >
        <TopNav
          pageTitle={poem.id ? 'Replying to:' : 'Post a Poem'}
          navigation={this.props.navigation}
          leftComponent={this.setLeftHeader}
        />
        {poem.id ? (
          <InstagramText
            onPress={() =>
              this.setState({
                showAppologiesModal: !this.state.showAppologiesModal
              })
            }
          >
            {poem.name} by: {poem.handle ? poem.handle : '-ANON'}
          </InstagramText>
        ) : null}
        <PostPoemReplyModal
          poem={poem}
          navigation={this.props.navigation}
          showAppologiesModal={this.state.showAppologiesModal}
        >
          {/* <PurePoemView poem={poem} navigation={this.props.navigation} /> */}
        </PostPoemReplyModal>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={-50}
          style={{
            flex: 1,
            backgroundColor: '#eee',
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <PostPoemBackGround
              style={
                theme
                  ? {
                      flex: 1,
                      paddingLeft: 12,
                      paddingRight: 12,
                      alignItems: 'stretch',
                      flex: 1,
                      paddingTop: 20,
                      fontFamily: 'raleway-regular'
                      // backgroundColor: '#232526'
                    }
                  : {
                      flex: 1,
                      paddingLeft: 12,
                      paddingRight: 12,
                      alignItems: 'stretch',
                      flex: 1,
                      paddingTop: 20,
                      fontFamily: 'raleway-regular'
                      // backgroundColor: '#EAEAEA'
                    }
              }
            >
              <ShowWithKeyboard
                style={{ position: 'absolute', top: 0, right: 12 }}
              >
                <Button
                  rounded
                  small
                  onPress={Keyboard.dismiss}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 12,
                    backgroundColor: '#91D9D9'
                  }}
                >
                  <Icon
                    type="FontAwesome"
                    name="chevron-down"
                    style={{ fontSize: 12 }}
                  />
                </Button>
              </ShowWithKeyboard>
              <ListItem>
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
                  placeholder="Poem Name"
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                />
              </ListItem>
              <HideWithKeyboard>
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
              </HideWithKeyboard>
              <CNRichTextEditor
                placeholder={'Poem...'}
                ref={input => (this.editor = input)}
                onSelectedTagChanged={this.onSelectedTagChanged}
                onSelectedStyleChanged={this.onSelectedStyleChanged}
                value={this.state.body}
                styleList={customStyles}
                foreColor={[theme ? '#EAEAEA' : '#232526']}
                style={[
                  {
                    marginTop: 10,
                    shadowOpacity: 0.35,
                    shadowRadius: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    shadowOffset: {
                      width: 5,
                      height: 0
                    }
                  },
                  theme
                    ? {
                        fontFamily: 'raleway-regular',
                        backgroundColor: '#121212',
                        shadowColor: '#404142',
                        color: '#EAEAEA'
                      }
                    : {
                        color: '#D8D9D9',
                        fontFamily: 'raleway-regular',
                        shadowColor: '#efefef',
                        backgroundColor: '#fff'
                      }
                ]}
                onValueChanged={this.onValueChanged}
              />
            </PostPoemBackGround>
          </TouchableWithoutFeedback>
          <JustColorBack
            style={
              theme
                ? {
                    minHeight: 14
                    // backgroundColor: '#232526'
                  }
                : {
                    minHeight: 14
                    // backgroundColor: '#EAEAEA'
                  }
            }
          >
            <CNToolbar
              size={20}
              bold={
                <Text
                  style={[
                    styles.toolbarButton,
                    styles.boldButton,
                    theme
                      ? {
                          color: '#D8D9D9'
                        }
                      : {
                          color: '#2C2D2D'
                        }
                  ]}
                >
                  B
                </Text>
              }
              italic={
                <Text
                  style={[
                    styles.toolbarButton,
                    styles.italicButton,
                    theme
                      ? {
                          color: '#D8D9D9'
                        }
                      : {
                          color: '#2C2D2D'
                        }
                  ]}
                >
                  I
                </Text>
              }
              underline={
                <Text
                  style={[
                    styles.toolbarButton,
                    styles.underlineButton,
                    theme
                      ? {
                          color: '#D8D9D9'
                        }
                      : {
                          color: '#2C2D2D'
                        }
                  ]}
                >
                  U
                </Text>
              }
              lineThrough={
                <Text
                  style={[
                    styles.toolbarButton,
                    styles.lineThroughButton,
                    theme
                      ? {
                          color: '#D8D9D9'
                        }
                      : {
                          color: '#2C2D2D'
                        }
                  ]}
                >
                  S
                </Text>
              }
              title={
                <Text
                  style={
                    theme
                      ? {
                          padding: 5,
                          fontSize: 20,
                          textAlign: 'left',
                          fontFamily: 'raleway-regular',
                          color: '#D8D9D9'
                        }
                      : {
                          padding: 5,
                          fontSize: 20,
                          textAlign: 'left',
                          fontFamily: 'raleway-regular',
                          color: '#2C2D2D'
                        }
                  }
                >
                  Title
                </Text>
              }
              heading={
                <Text
                  style={
                    theme
                      ? {
                          padding: 5,
                          fontSize: 20,
                          textAlign: 'left',
                          fontFamily: 'raleway-regular',
                          color: '#D8D9D9'
                        }
                      : {
                          padding: 5,
                          fontSize: 20,
                          textAlign: 'left',
                          fontFamily: 'raleway-regular',
                          color: '#2C2D2D'
                        }
                  }
                >
                  Heading
                </Text>
              }
              body={
                <Text
                  style={
                    theme
                      ? {
                          padding: 5,
                          fontSize: 20,
                          textAlign: 'left',
                          fontFamily: 'raleway-regular',
                          color: '#D8D9D9'
                        }
                      : {
                          padding: 5,
                          fontSize: 20,
                          textAlign: 'left',
                          fontFamily: 'raleway-regular',
                          color: '#2C2D2D'
                        }
                  }
                >
                  Text
                </Text>
              }
              selectedTag={this.state.selectedTag}
              selectedStyles={this.state.selectedStyles}
              onStyleKeyPress={this.onStyleKeyPress}
              selectedBackgroundColor={[theme ? '#757575' : '#e7e9ec']}
              backgroundColor={[theme ? '#000' : '#F5F6F7']}
              color={[theme ? '#EAEAEA' : '#232526']}
              style={
                theme
                  ? {
                      fontFamily: 'raleway-regular',
                      color: '#D8D9D9',
                      backgroundColor: '#000',
                      borderWidth: 0
                    }
                  : {
                      fontFamily: 'raleway-regular',
                      color: '#2C2D2D',
                      backgroundColor: '#F5F6F7',
                      borderWidth: 0
                    }
              }
            />
          </JustColorBack>
          <JustColorBack
            style={
              theme
                ? {
                    height: 50,
                    flexDirection: 'row'
                    // backgroundColor: '#232526'
                  }
                : {
                    height: 50,
                    flexDirection: 'row'
                    // backgroundColor: '#EAEAEA'
                  }
            }
          >
            <Left>
              <Button
                style={styles.buttonItself}
                bordered
                small
                warning
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.button}>Back</Text>
              </Button>
            </Left>
            <Right>
              <Button
                small
                style={styles.buttonIn}
                light
                onPress={this.postToPoem}
              >
                {this.state.loading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : null}
                <Text style={styles.labelIn}>Post Poem</Text>
              </Button>
            </Right>

            <FirstPostModal openFirstModal={this.state.openFirstModal} />
          </JustColorBack>
        </KeyboardAvoidingView>
      </PostPoemBackGround>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 12,
    paddingRight: 12,
    alignItems: 'stretch'
  },
  toolbarButton: {
    fontSize: 20,
    padding: 5,

    fontFamily: 'raleway-regular',
    textAlign: 'center'
  },
  italicButton: {
    fontStyle: 'italic'
  },
  boldButton: {
    fontWeight: 'bold'
  },
  underlineButton: {
    textDecorationLine: 'underline'
  },
  lineThroughButton: {
    textDecorationLine: 'line-through'
  },
  container: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  labelIn: {
    color: '#fff',
    fontFamily: 'raleway-regular',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonIn: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#91D9D9',
    marginTop: 5,
    padding: 16,
    width: '90%',
    // width: screenWidth - 80,
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
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
    width: '90%',
    // width: screenWidth - 80,
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
