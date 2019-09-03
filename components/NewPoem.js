import React, { Component } from 'react';
import {
  Text,
  View,
  CameraRoll,
  PixelRatio,
  Vibration,
  Image,
  Linking,
  StyleSheet,
  Platform,
  Share
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Permissions from 'expo-permissions';
import ListAllAudioComponent from './ListAllAudioComponent';
import { Icon } from 'native-base';
import { compose } from 'redux';
import AdminModal from './AdminModal';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import AppologiesModal from './AppologiesModal';
import ListOfPoemReplys from './ListOfPoemReplys';
import { successfullyAddedPoem } from '../actions/poemsActions';
import ListAllAudioModal from './ListAllAudioModal';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import {
  StyledText,
  MetaAppolo,
  PoemName,
  ScreenShotMode,
  PoemBodyText,
  Pills,
  PillsText,
  StaticPills,
  StaticPillsText,
  InstagramText,
  OptionsListText,
  NSFWPills,
  NSFWPillsText
} from './Styles';
import { Col, Row, Grid } from 'react-native-easy-grid';
import OptionsComponents from './OptionsComponents';
import moment from 'moment';
import { BlurView } from 'expo';
import {
  CNRichTextView,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
import NewBookmark from './NewBookmark';
const defaultStyles = getDefaultStyles();
let customStyles = {
  ...defaultStyles,
  body: { fontSize: 16, fontFamily: 'raleway-regular' },
  heading: { fontSize: 18 },
  title: { fontSize: 20 },
  ol: { fontSize: 14 },
  bold: { fontSize: 16, fontFamily: 'raleway-bold' },
  ul: { fontSize: 12 }
};
class NewPoem extends Component {
  state = {
    open: false,
    openReplyModal: false,
    showAppologiesModal: false,
    userEdit: false,
    bookmarked: false,
    reportDialog: false,
    modalVisible: false,
    elem: false,
    hideOptions: false
  };
  componentDidMount() {
    getParentRef = () => {
      this.setState({
        elem: this.props.getParentElem()
      });
    };
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
  }
  toggleBookMark = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };
  canIEdit = () => {
    const now = moment();
    const posted = moment.unix(this.props.poem.date);
    const differ = now.diff(posted, 'minutes');
    if (this.props.profile.user === this.props.poem.uid && differ < 5) {
      return (
        <Pills>
          <PillsText
            onPress={() => {
              this.props.navigation.navigate('Post', this.props.poem);
            }}
          >
            Edit Poem
          </PillsText>
        </Pills>
      );
    }
  };
  shareToInstagram = async id => {
    // await this.snapshot(id);
    await this.setState({
      open: false,
      hideOptions: true
    });
    const targetPixelCount = 1080;
    const pixelRatio = PixelRatio.get();
    const pixels = targetPixelCount / pixelRatio;
    let result = await takeSnapshotAsync(this[id], {
      format: 'png',
      width: pixels,
      height: '100%',
      quality: 1,
      result: 'tmpfile',
      snapshotContentContainer: false
    });
    const instagramURL = await `instagram://library?AssetPath=${result}`;
    return await Linking.openURL(instagramURL)
      .then(url => {
        this.setState({ hideOptions: false });
      })
      .catch(err => this.setState({ hideOptions: false }));
  };

  share = async id => {
    await this.setState({
      open: false,
      hideOptions: true
    });
    const targetPixelCount = 1080;
    const pixelRatio = PixelRatio.get();
    const pixels = targetPixelCount / pixelRatio;
    setTimeout(async () => {
      let result = await takeSnapshotAsync(this[id], {
        format: 'png',
        width: pixels,
        height: '100%',
        quality: 1,
        result: 'tmpfile',
        snapshotContentContainer: false
      });
      await Share.share(
        {
          message: `${this.props.poem.name} - Dis Net Jy`,
          title: `${this.props.poem.name} - Dis Net Jy`,
          url: result
        },
        {
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToWeibo',
            'com.apple.UIKit.activity.Print',
            'com.apple.UIKit.activity.CopyToPasteboard',
            'com.apple.UIKit.activity.AssignToContact',
            'com.apple.UIKit.activity.SaveToCameraRoll',
            'com.apple.UIKit.activity.AddToReadingList',
            'com.apple.UIKit.activity.PostToFlickr',
            'com.apple.UIKit.activity.PostToVimeo',
            'com.apple.UIKit.activity.PostToTencentWeibo',
            'com.apple.UIKit.activity.AirDrop',
            'com.apple.UIKit.activity.OpenInIBooks',
            'com.apple.UIKit.activity.MarkupAsPDF',
            'com.apple.reminders.RemindersEditorExtension',
            'com.apple.mobilenotes.SharingExtension',
            'com.apple.mobileslideshow.StreamShareService',
            'com.linkedin.LinkedIn.ShareExtension',
            'pinterest.ShareExtension',
            'com.google.GooglePlus.ShareExtension',
            'com.tumblr.tumblr.Share-With-Tumblr',
            'net.whatsapp.WhatsApp.ShareExtension' //WhatsApp
          ]
        }
      ).then(({ action, activityType }) => {
        if (action === Share.dismissedAction)
          this.setState({ hideOptions: false });
        else this.setState({ hideOptions: false });
      });
    }, 500);
  };
  toggleReplyHistory = () => {
    this.setState({
      openReplyModal: !this.state.openReplyModal
    });
  };

  snapshot = async id => {
    await this.setState({
      open: false,
      hideOptions: true
    });
    const targetPixelCount = 1080;
    const pixelRatio = PixelRatio.get();
    const pixels = targetPixelCount / pixelRatio;
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === 'granted') {
        let result = await takeSnapshotAsync(this[id], {
          format: 'png',
          width: pixels,
          height: '100%',
          quality: 1,
          result: 'tmpfile',
          snapshotContentContainer: false
        });
        let saveResult = await CameraRoll.saveToCameraRoll(
          result,
          'photo'
        ).then(() => {
          Vibration.vibrate(500);
          this.setState({ cameraRollUri: saveResult, hideOptions: false });
        });
      }
    } else {
      let result = await takeSnapshotAsync(this[id], {
        format: 'png',
        width: pixels,
        height: '100%',
        quality: 1,
        result: 'tmpfile',
        snapshotContentContainer: false
      });
      let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo').then(
        () => {
          this.setState({ hideOptions: false });
          Vibration.vibrate(500);
        }
      );
      this.setState({ cameraRollUri: saveResult, hideOptions: false });
    }
  };
  changeTab = name => {
    this.props.navigation.navigate(name, { poem: this.props.poem });
  };
  // <ScreenShotMode>
  render() {
    const { hideOptions, elem } = this.state;
    const { theme, swipeMode } = this.props;
    return (
      <React.Fragment>
        {/* <AppologiesModal showAppologiesModal={this.state.showAppologiesModal}> */}
        <StyledText
          style={swipeMode ? { marginLeft: 20 } : null}
          ref={ref => {
            this[`${this.props.poem.id}`] = ref;
          }}
        >
          {hideOptions ? (
            <React.Fragment>
              <ScreenShotMode>
                <Row>
                  <Col>
                    {hideOptions ? null : this.props.poem.nsfw ? (
                      <NSFWPills>
                        <NSFWPillsText>NSFW</NSFWPillsText>
                      </NSFWPills>
                    ) : null}
                    {hideOptions ? null : (
                      <NewBookmark
                        poemId={this.props.poem.id}
                        bookmarkedCount={this.props.poem.bookmarkedCount}
                        bookmarked={this.state.bookmarked}
                        toggleBookMark={this.toggleBookMark}
                      />
                    )}
                    {this.props.poem.repliedTo ? (
                      <MetaAppolo onPress={this.toggleReplyHistory}>
                        MET APOLOGIE AAN {this.props.poem.repliedToName}
                      </MetaAppolo>
                    ) : null}
                    {this.props.poem.name.replace(/\s/g, '') ? (
                      <PoemName>{this.props.poem.name}</PoemName>
                    ) : null}
                    {this.props.poem.handle ? (
                      <InstagramText
                        onPress={async () =>
                          await WebBrowser.openBrowserAsync(
                            `https://www.instagram.com/${this.props.poem.handle}`
                          )
                        }
                      >
                        - {this.props.poem.handle}
                      </InstagramText>
                    ) : (
                      <InstagramText>- ANON</InstagramText>
                    )}
                    {this.props.poem.richText ? (
                      <View
                        style={{
                          flex: 1
                        }}
                      >
                        <CNRichTextView
                          text={this.props.poem.body}
                          styleList={customStyles}
                          foreColor={'#474554'}
                          color={theme ? '#fff' : '#474554'}
                        />
                      </View>
                    ) : (
                      <PoemBodyText>{this.props.poem.body}</PoemBodyText>
                    )}
                  </Col>
                </Row>
                <Row style={{ marginTop: 40 }}>
                  {hideOptions ? (
                    <React.Fragment>
                      <Col>
                        <StaticPills>
                          <StaticPillsText>
                            {moment
                              .unix(this.props.poem.date)
                              .format('MMM `YY')}
                          </StaticPillsText>
                          <StaticPillsText>DisNetJy.com</StaticPillsText>
                        </StaticPills>
                      </Col>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Col>
                        <StaticPills>
                          <StaticPillsText>
                            {moment.unix(this.props.poem.date).fromNow()}
                          </StaticPillsText>
                        </StaticPills>
                      </Col>
                      {this.canIEdit()}
                      <Col>
                        <Pills
                          onPress={() =>
                            this.setState({
                              open: !this.state.open
                            })
                          }
                        >
                          <PillsText
                            onPress={() => {
                              this.props.scrollDown();
                              this.setState({
                                open: !this.state.open
                              });
                            }}
                          >
                            Options
                          </PillsText>
                        </Pills>
                      </Col>
                    </React.Fragment>
                  )}
                </Row>
              </ScreenShotMode>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid>
                <Row>
                  <AppologiesModal
                    showAppologiesModal={this.state.openReplyModal}
                  >
                    <ListOfPoemReplys poem={this.props.poem} />
                  </AppologiesModal>

                  {this.props.poem.repliedTo ? (
                    <MetaAppolo onPress={this.toggleReplyHistory}>
                      MET APOLOGIE AAN{' '}
                      {this.props.poem.repliedToName
                        ? `- ${this.props.poem.repliedToName}`
                        : null}
                    </MetaAppolo>
                  ) : null}
                </Row>
                <Row>
                  <Col style={{ width: '90%' }}>
                    {this.props.poem.name.replace(/\s/g, '') ? (
                      <PoemName>{this.props.poem.name}</PoemName>
                    ) : null}
                  </Col>
                  <Col style={{ width: '10%' }}>
                    {this.props.poem.stemme ? (
                      <ListAllAudioModal
                        ListAllAudioModal={this.ListAllAudioModal}
                      >
                        <ListAllAudioComponent poem={this.props.poem} />
                      </ListAllAudioModal>
                    ) : null}
                    {hideOptions ? null : this.props.poem.canReply ? (
                      <Icon
                        onPress={this.changeTab.bind(this, 'Post')}
                        style={{
                          position: 'absolute',
                          color: '#c2c2c2',
                          transform: [{ rotate: '0deg' }],
                          fontSize: 20,
                          right: 30,
                          top: 10
                        }}
                        type="FontAwesome"
                        name="reply"
                      />
                    ) : null}
                    <Icon
                      onPress={this.changeTab.bind(this, 'RecordPoem')}
                      style={{
                        position: 'absolute',
                        color: '#c2c2c2',
                        transform: [{ rotate: '0deg' }],
                        fontSize: 20,
                        right: 60,
                        top: 10
                      }}
                      type="FontAwesome"
                      name="microphone"
                    />

                    {hideOptions ? null : (
                      <NewBookmark
                        poemId={this.props.poem.id}
                        bookmarkedCount={this.props.poem.bookmarkedCount}
                        bookmarked={this.state.bookmarked}
                        toggleBookMark={this.toggleBookMark}
                      />
                    )}
                  </Col>
                </Row>
                {this.props.poem.handle ? (
                  <InstagramText
                    onPress={async () =>
                      await WebBrowser.openBrowserAsync(
                        `https://www.instagram.com/${this.props.poem.handle}`
                      )
                    }
                  >
                    - {this.props.poem.handle}
                  </InstagramText>
                ) : (
                  <InstagramText>- ANON</InstagramText>
                )}
                {this.props.poem.richText ? (
                  <View>
                    <CNRichTextView
                      text={this.props.poem.body}
                      styleList={customStyles}
                      foreColor={'#474554'}
                      color={theme ? '#fff' : '#474554'}
                    />
                  </View>
                ) : (
                  <PoemBodyText>{this.props.poem.body}</PoemBodyText>
                )}
                {hideOptions ? null : this.props.poem.nsfw ? (
                  <NSFWPills>
                    <NSFWPillsText>NSFW</NSFWPillsText>
                  </NSFWPills>
                ) : null}

                <Row style={{ marginTop: 40 }}>
                  {hideOptions ? (
                    <React.Fragment>
                      <Col>
                        <StaticPills>
                          <StaticPillsText>DisNetJy.com</StaticPillsText>
                        </StaticPills>
                      </Col>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Col>
                        <StaticPills>
                          <StaticPillsText>
                            {moment.unix(this.props.poem.date).fromNow()}
                          </StaticPillsText>
                        </StaticPills>
                      </Col>
                      {this.canIEdit()}
                      <Col>
                        <Pills
                          onPress={() =>
                            this.setState({
                              open: !this.state.open
                            })
                          }
                        >
                          <PillsText
                            onPress={() => {
                              // this.props.scrollDown();
                              this.setState({
                                open: !this.state.open
                              });
                            }}
                          >
                            Options
                          </PillsText>
                        </Pills>
                      </Col>
                    </React.Fragment>
                  )}
                </Row>
              </Grid>
            </React.Fragment>
          )}
        </StyledText>

        <OptionsComponents open={this.state.open} poem={this.props.poem}>
          <AdminModal poem={this.props.poem} />
          {Platform.OS !== 'android' ? (
            <React.Fragment>
              <OptionsListText
                onPress={() => this.share(`${this.props.poem.id}`)}
              >
                Share
              </OptionsListText>
              {/* <OptionsListText
                onPress={() => this.shareToInstagram(`${this.props.poem.id}`)}
              >
                Share To Instagram
              </OptionsListText> */}
            </React.Fragment>
          ) : null}
          <OptionsListText
            onPress={() => this.snapshot(`${this.props.poem.id}`)}
          >
            Save as Image
          </OptionsListText>
        </OptionsComponents>
        {/* </AppologiesModal> */}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.poems.activateDelete,
  theme: state.theme.isThemeDark,
  swipeMode: state.theme.toggleSwipeMode
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(NewPoem);
