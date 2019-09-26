import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import {
  ScreenBackground,
  StyledText,
  PoemName,
  StaticPills,
  StaticPillsText,
  RecordScrollView,
  InstagramText
} from '../components/styles';
import {
  CNRichTextView,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
import { CheckBox, ListItem, Body } from 'native-base';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon, Button } from 'native-base';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import TopNav from '../components/TopNav';
import RecodingComponent from '../components/RecodingComponent';
import PurePoemView from '../components/PurePoemView';
import { ScrollView } from 'react-native-gesture-handler';
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

var { height, width } = Dimensions.get('window');

class RecordScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null
  });
  state = { withInstagram: false };

  withInstagram = () => {
    this.setState({
      withInstagram: !this.state.withInstagram
    });
  };

  render() {
    const { navigation, theme, audio_Upload_Status } = this.props;

    const poem = navigation.getParam('poem', 'noPoem');
    return (
      <ScreenBackground>
        <TopNav pageTitle={'DNJ'} navigation={navigation} />
        <View
          style={{
            height: height * 0.5,
            alignSelf: 'center',
            alignItems: 'center'
          }}
        >
          <ScrollView
            style={{
              width: width
            }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {poem ? <PurePoemView poem={poem} /> : null}
          </ScrollView>
        </View>

        <RecordScrollView contentContainerStyle={{}}>
          <RecodingComponent
            poem={poem}
            navigation={navigation}
            withInstagram={this.state.withInstagram}
          />
          {audio_Upload_Status === 'LOADING' ? null : (
            <React.Fragment>
              {this.props.profile.isLoaded && this.props.profile.Instagram ? (
                <ListItem>
                  <CheckBox
                    color={'#3CADA0'}
                    checked={this.state.withInstagram}
                    onPress={this.withInstagram}
                  />
                  <Body>
                    <InstagramText>
                      {' '}
                      Post as {this.props.profile.Instagram}
                    </InstagramText>
                  </Body>
                </ListItem>
              ) : (
                <React.Fragment>{/* <AddInstagramModal /> */}</React.Fragment>
              )}
            </React.Fragment>
          )}
        </RecordScrollView>
      </ScreenBackground>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.isThemeDark,
  profile: state.firebase.profile,
  audio_Upload_Status: state.poems.audio_Upload_Status
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    {}
  )
)(RecordScreen);
