import React, { Component } from 'react';
import { Text, View, CameraRoll, PixelRatio } from 'react-native';
import { WebBrowser, Permissions } from 'expo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import {
  StyledText,
  PoemName,
  PoemBodyText,
  Pills,
  PillsText,
  StaticPills,
  StaticPillsText,
  InstagramText,
  OptionsListText
} from './Styles';
import { Col, Row, Grid } from 'react-native-easy-grid';
import OptionsComponents from './OptionsComponents';
import moment from 'moment';
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
  ul: { fontSize: 12 }
};
class NewPoem extends Component {
  state = {
    open: false,
    userEdit: false,
    bookmarked: false,
    reportDialog: false,
    modalVisible: false
  };
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
  }
  toggleBookMark = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };
  snapshot = async id => {
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
          Toast.show({
            text: 'Saved!',
            buttonText: 'Okay',
            position: 'top'
          });
        });
        this.setState({ cameraRollUri: saveResult });
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
          this.setState({ modalVisible: !this.state.modalVisible });
          Toast.show({
            text: 'Saved!',
            buttonText: 'Okay',
            position: 'top'
          });
        }
      );
      this.setState({ cameraRollUri: saveResult });
    }
  };
  render() {
    console.log(this.props.theme);

    return (
      <React.Fragment>
        <StyledText
          ref={ref => {
            this[`${this.props.poem.id}`] = ref;
          }}
        >
          <Row>
            <Col>
              <NewBookmark
                poemId={this.props.poem.id}
                bookmarkedCount={this.props.poem.bookmarkedCount}
                bookmarked={this.state.bookmarked}
                toggleBookMark={this.toggleBookMark}
              />

              <PoemName>{this.props.poem.name}</PoemName>
              {this.props.poem.handle ? (
                <InstagramText
                  onPress={() =>
                    WebBrowser.openBrowserAsync(
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
                    color={'#474554'}
                  />
                </View>
              ) : (
                <PoemBodyText>{this.props.poem.body}</PoemBodyText>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: 40 }}>
            <Col>
              <StaticPills>
                <StaticPillsText>
                  {moment.unix(this.props.poem.date).fromNow()}
                </StaticPillsText>
              </StaticPills>
            </Col>
            <Col>
              <Pills
                onPress={() =>
                  this.setState({
                    open: !this.state.open
                  })
                }
              >
                <PillsText
                  onPress={() =>
                    this.setState({
                      open: !this.state.open
                    })
                  }
                >
                  Options
                </PillsText>
              </Pills>
            </Col>
          </Row>
          <OptionsComponents open={this.state.open} poem={this.props.poem}>
            <OptionsListText
              onPress={() => this.snapshot(`${this.props.poem.id}`)}
            >
              Save as Image
            </OptionsListText>
          </OptionsComponents>
        </StyledText>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.poems.activateDelete
  // theme: state.theme.isThemeDark
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(NewPoem);
