import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  CameraRoll,
  PixelRatio,
  Linking
} from 'react-native';
import {
  Icon,
  Button,
  Row,
  Col,
  Badge,
  ListItem,
  Toast,
  Text,
  Left,
  Right
} from 'native-base';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import AdminModal from './AdminModal';
import { successfullyAddedPoem } from '../actions/poemsActions';
import Dialog, {
  SlideAnimation,
  DialogContent
} from 'react-native-popup-dialog';
import Bookmark from './Bookmark';
import { WebBrowser } from 'expo';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import * as Permissions from 'expo-permissions';
import { StyledText, PoemName, PoemBodyText, InstagramText } from './Styles';

class CardPoem extends Component {
  state = {
    userEdit: false,
    bookmarked: false,
    reportDialog: false
  };
  reportPoem = () => {
    const { firestore } = this.props;
    Alert.alert(
      'Are You Sure?',
      'If you accept you will report this poem for being inappropriate or against the T&C`s  ',
      [
        {
          text: 'Report',
          onPress: () =>
            firestore
              .update(
                { collection: 'poems', doc: this.props.poem.id },
                { reported: true }
              )
              .then(res => {
                this.setState({ reportDialog: false });
                Toast.show({
                  text: 'Poem Reported to Admin',
                  buttonText: 'Okay',
                  position: 'top',
                  type: 'danger'
                });
              })
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };
  addTimeOutToEdit = () => {
    const now = moment();
    const posted = moment.unix(this.props.poem.date);
    const differ = now.diff(posted, 'minutes');
    if (this.props.profile.user === this.props.poem.uid && differ < 5) {
      this.setState({
        userEdit: true
      });
      let time = setInterval(() => {
        const now = moment();
        const posted = moment(this.props.poem.date);
        const differ = now.diff(posted, 'minutes');

        if (differ < 5) {
          this.setState({
            userEdit: true
          });
        } else {
          if (this.state.userEdit) {
            this.setState({
              userEdit: false
            });
          }
          clearInterval(time);
        }
      }, 30000);
    }
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.addedPoem === false && this.props.addedPoem === true) {
      this.addTimeOutToEdit();
      this.props.successfullyAddedPoem(false);
    }
  }
  componentDidMount() {
    const { id } = this.props.poem;
    if (this.props.profile.bookmarks) {
      const found = this.props.profile.bookmarks.find(function(element) {
        return element === id;
      });
      if (found) {
        this.setState({
          bookmarked: true
        });
      }
    }

    this.addTimeOutToEdit();
  }
  toggleBookMark = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };
  snapshot = async id => {
    const targetPixelCount = 1080; // If you want full HD pictures
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
    const pixels = targetPixelCount / pixelRatio;
    // const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    // if (status === 'granted') {
    let result = await takeSnapshotAsync(this[id], {
      format: 'png',
      width: pixels,
      height: '100%',
      quality: 1,
      result: 'tmpfile',
      snapshotContentContainer: false
    });
    // const encodedURI = encodeURIComponent(result);
    // const instagramURL = `instagram://library?AssetPath=${encodedURI}`;
    // return Linking.openURL(instagramURL);
    let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo').then(
      () => {
        this.setState({ reportDialog: false });
        Toast.show({
          text: 'Saved!',
          buttonText: 'Okay',
          position: 'top'
        });
      }
    );
    this.setState({ cameraRollUri: saveResult });
    // } else {
    // }
  };

  render() {
    const { theme } = this.props;

    return (
      <StyledText
        ref={ref => {
          this[`${this.props.poem.id}`] = ref;
        }}
        style={
          !this.props.profile.seensfw && this.props.poem.nsfw
            ? { display: 'none', width: screenWidth }
            : { width: screenWidth }
        }
      >
        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 20,
            paddingRight: 20,
            width: '100%'
          }}
        >
          <Row>
            <Col>
              <PoemName style={styles.name}>{this.props.poem.name}</PoemName>

              <Dialog
                overlayOpacity={0.9}
                overlayBackgroundColor={!theme ? '#D8D9D9' : '#2C2D2D'}
                visible={this.state.reportDialog}
                onTouchOutside={() => {
                  this.setState({ reportDialog: false });
                }}
                dialogAnimation={
                  new SlideAnimation({
                    slideFrom: 'bottom'
                  })
                }
              >
                <DialogContent
                  style={[
                    styles.mainContent,
                    theme
                      ? {
                          backgroundColor: '#232526'
                        }
                      : {
                          backgroundColor: '#f9f9f9'
                        }
                  ]}
                >
                  <Text
                    style={[
                      styles.nameDialog,
                      theme
                        ? {
                            color: '#D8D9D9'
                          }
                        : {
                            color: '#2C2D2D'
                          }
                    ]}
                  >
                    {' '}
                    Options{' '}
                  </Text>
                  <ListItem
                    style={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                    onPress={() => this.snapshot(`${this.props.poem.id}`)}
                  >
                    <Text
                      style={[
                        styles.save,
                        theme
                          ? {
                              color: '#D8D9D9'
                            }
                          : {
                              color: '#2C2D2D'
                            }
                      ]}
                    >
                      Save To Gallery
                    </Text>
                  </ListItem>
                  <ListItem
                    style={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                    onPress={() => this.reportPoem()}
                  >
                    <Text style={styles.dates}>REPORT AS INAPPROPRIATE</Text>
                  </ListItem>
                </DialogContent>
              </Dialog>
              {this.props.poem.handle ? (
                <InstagramText
                  onPress={() =>
                    WebBrowser.openBrowserAsync(
                      `https://www.instagram.com/${this.props.poem.handle}`
                    )
                  }
                  style={styles.handle}
                >
                  <Icon
                    style={
                      theme
                        ? {
                            fontSize: 14,
                            textAlign: 'left',
                            fontFamily: 'raleway-regular',
                            color: '#D8D9D9'
                          }
                        : {
                            fontSize: 14,
                            textAlign: 'left',
                            fontFamily: 'raleway-regular',
                            color: '#2C2D2D'
                          }
                    }
                    name="logo-instagram"
                  />{' '}
                  {this.props.poem.handle}
                </InstagramText>
              ) : null}
            </Col>
          </Row>
          <PoemBodyText style={styles.body}>
            {this.props.poem.body}
          </PoemBodyText>
          {!this.state.reportDialog ? (
            <Row>
              <Col>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={styles.date}>
                    {moment.unix(this.props.poem.date).fromNow()}
                  </Text>
                  {this.props.poem.nsfw ? (
                    <Badge
                      style={
                        theme
                          ? {
                              position: 'absolute',
                              backgroundColor: '#D8D9D9',
                              opacity: 0.5,
                              bottom: 1,
                              right: 1,
                              // minWidth: 20,
                              height: 25,
                              borderRadius: 15,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }
                          : {
                              position: 'absolute',
                              backgroundColor: '#2C2D2D',
                              opacity: 0.5,
                              bottom: 1,
                              right: 1,
                              // minWidth: 20,
                              height: 25,
                              borderRadius: 15,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }
                      }
                    >
                      <Text style={styles.nsfw}>NSFW</Text>
                    </Badge>
                  ) : null}
                </View>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col>
              {this.state.userEdit ? (
                <Button
                  transparent
                  block
                  small
                  onPress={() => {
                    this.props.navigation.navigate('Post', this.props.poem);
                  }}
                >
                  <Text style={styles.buttonText}>Edit Poem</Text>
                </Button>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              {this.props.admin && this.props.poem.reported ? (
                <Badge style={styles.IconBadgeReported}>
                  <Text style={styles.nsfw}>Reported</Text>
                </Badge>
              ) : null}
              <AdminModal poem={this.props.poem} />
            </Col>
          </Row>
        </View>
        <Row
          style={
            theme
              ? {
                  width: '100%',
                  backgroundColor: '#404142',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  height: 20
                }
              : {
                  width: '100%',
                  backgroundColor: '#F5F6F7',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  height: 20
                }
          }
        >
          {!this.state.reportDialog ? (
            <React.Fragment>
              <Left>
                <Text
                  style={styles.elipse}
                  onPress={() => {
                    this.setState({ reportDialog: true });
                  }}
                >
                  <Icon
                    onPress={() => {
                      this.setState({ reportDialog: true });
                    }}
                    style={styles.elipseIcon}
                    type="FontAwesome"
                    color="#9D9E9E"
                    name="ellipsis-h"
                  />{' '}
                  Options
                </Text>
              </Left>
              <Right style={{ paddingRight: 20 }}>
                <Bookmark
                  poemId={this.props.poem.id}
                  bookmarkedCount={this.props.poem.bookmarkedCount}
                  bookmarked={this.state.bookmarked}
                  toggleBookMark={this.toggleBookMark}
                />
              </Right>
            </React.Fragment>
          ) : (
            <Left>
              <Text
                style={styles.elipse}
                onPress={() => {
                  this.setState({ reportDialog: true });
                }}
              >
                DisNetJy.com
              </Text>
            </Left>
          )}
        </Row>
      </StyledText>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.poems.activateDelete,
  theme: state.theme.isThemeDark
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(CardPoem);

let screenWidth = Dimensions.get('window').width - 60;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainContent: {
    width: screenWidth,
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12
  },
  elipse: {
    fontSize: 10,
    color: '#9D9E9E',
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    marginLeft: 10
  },
  elipseIcon: {
    color: '#9D9E9E',
    fontSize: 12,
    paddingRight: 20
    // margin: 10,
    // width: 10
  },
  IconBadgeReported: {
    marginTop: 10,
    display: 'flex',
    backgroundColor: '#FF5C5C',
    bottom: 1,
    right: 1,
    minWidth: 20,
    width: '100%',
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {},
  nameDialog: {
    fontSize: 22,
    fontFamily: 'raleway-bold',
    textAlign: 'left',
    paddingBottom: 10
  },
  handle: { fontSize: 14, textAlign: 'left', fontFamily: 'raleway-regular' },
  nsfw: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'raleway-regular'
  },
  body: {
    // width: screenWidth,
  },
  icon: {
    fontSize: 14
  },
  date: {
    fontSize: 12,
    fontFamily: 'raleway-extralight',
    textAlign: 'right',
    color: '#b1b1b1b1'
  },
  dates: {
    fontSize: 12,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    color: '#FF5C5C'
  },
  save: {
    fontSize: 12,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  button: {
    fontSize: 12,
    fontFamily: 'raleway-extralight',
    textAlign: 'right',
    backgroundColor: '#ddd',
    color: 'white',
    marginLeft: 10
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'raleway-extralight',
    color: '#999',
    textAlign: 'right'
  }
});

// snapshot = async id => {
//   let result = await takeSnapshotAsync(this[id], {
//     format: 'png',
//     quality: 1,
//     result: 'tmpfile',
//     snapshotContentContainer: false
//   });

//   let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
//   this.setState({ cameraRollUri: saveResult });
//   console.log(result);
// };
