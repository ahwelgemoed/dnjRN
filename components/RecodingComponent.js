import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon } from 'native-base';
import { Text, View, Dimensions, ActivityIndicator } from 'react-native';
import uuid from 'uuid';
import {
  Recorder,
  Player
} from 'react-native-audio-player-recorder-no-linking';
import { Audio } from 'expo-av';
import { Button, Toast } from 'native-base';
import { Slider } from 'react-native';
import * as firebase from 'firebase';
import {
  uploadVoiceRecording,
  changeAudioStatus
} from '../actions/poemsActions';
import { PoemName, MetaAppolo } from './styles';
var { height, width } = Dimensions.get('window');
class RecodingComponent extends Component {
  state = { uploading: false };
  componentWillMount() {
    this.props.changeAudioStatus('DONE');
  }
  recorderComplete = async options => {
    await this.props.changeAudioStatus('LOADING');
    // await this.setState({
    //   uploading: true
    // });
    if (options.uri) {
      await this.upLoad(options.uri)
        .then(res => console.log(res))
        .cath(err => this.props.changeAudioStatus('DONE'));
    } else {
      this.props.changeAudioStatus('DONE');
      Toast.show({
        text: 'No Recording To Upload',
        buttonText: 'Okay',
        position: 'top',
        type: 'danger'
      });
    }
  };

  upLoad = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    let ref = firebase
      .storage()
      .ref()
      .child('stem/' + uuid.v4());
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref
      .getDownloadURL()
      .then(res => this.updatePoem(res));
  };

  updatePoem = async url => {
    const { firestore, poem } = this.props;
    const instagram = {
      withInstagram: this.props.withInstagram,
      instagramHandle: this.props.profile.Instagram
    };

    await this.props.uploadVoiceRecording(
      firestore,
      poem,
      url,
      instagram,
      this.props.navigation
    );
  };
  componentWillReceiveProps(prevProps) {}
  componentWillUnmount() {
    console.log('DONE');
  }

  render() {
    const { uploading } = this.state;
    const { audio_Upload_Status } = this.props;
    return audio_Upload_Status === 'LOADING' ? (
      <View
        style={{
          width: width,
          paddingTop: 20,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator />
        <MetaAppolo>Uploading Please Wait </MetaAppolo>
        <MetaAppolo>We Will Redirect You</MetaAppolo>
      </View>
    ) : (
      <React.Fragment>
        <View
          style={{
            width: width,
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Recorder
            style={{ flex: 1, width: width }}
            onComplete={this.recorderComplete}
            maxDurationMillis={30000}
            showDebug={false}
            showBackButton={true}
            audioMode={{
              allowsRecordingIOS: true,
              interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
              playsInSilentModeIOS: true,
              playsInSilentLockedModeIOS: true,
              shouldDuckAndroid: true,
              staysActiveInBackground: true,
              interruptionModeAndroid:
                Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
              playThroughEarpieceAndroid: false
            }}
            resetButton={renderProps => {
              return (
                <Button
                  onPress={renderProps.onPress}
                  style={{
                    marginVertical: 5,
                    marginLeft: 10,
                    marginRight: 10,
                    width: width * 0.2,
                    paddingLeft: 10,
                    backgroundColor: '#DE875A',
                    color: 'white'
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    {' '}
                    <Icon
                      style={{ fontSize: 20 }}
                      type="FontAwesome"
                      name="times"
                    />{' '}
                    Reset
                  </Text>
                </Button>
              );
            }}
            recordingCompleteButton={renderProps => {
              return (
                <Button
                  onPress={renderProps.onPress}
                  style={{
                    marginVertical: 5,
                    width: width * 0.6,
                    // paddingRight: 10,
                    marginRight: 10,
                    marginLeft: 10,
                    paddingLeft: 10,
                    backgroundColor: '#3CADA0',
                    color: 'white'
                  }}
                >
                  <Text style={{ color: 'white' }}>
                    {' '}
                    <Icon
                      style={{ fontSize: 20 }}
                      type="FontAwesome"
                      name="upload"
                    />{' '}
                    Upload
                  </Text>
                </Button>
              );
            }}
            playbackSlider={renderProps => {
              // return (
              //   <Slider
              //     minimimValue={0}
              //     maximumValue={renderProps.maximumValue}
              //     onValueChange={renderProps.onSliderValueChange}
              //     value={renderProps.value}
              //     style={{
              //       width: '100%'
              //     }}
              //   />
              // );
            }}
          />
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.isThemeDark,
  audio_Upload_Status: state.poems.audio_Upload_Status,
  profile: state.firebase.profile
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { uploadVoiceRecording, changeAudioStatus }
  )
)(RecodingComponent);
