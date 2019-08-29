import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Text, View, Dimensions } from 'react-native';
import {
  Recorder,
  Player
} from 'react-native-audio-player-recorder-no-linking';
import { Audio } from 'expo-av';
import { Button, Icon } from 'native-base';
import { Slider } from 'react-native';
import * as firebase from 'firebase';
var { height, width } = Dimensions.get('window');
class RecodingComponent extends Component {
  recorderComplete = async options => {
    const storagePath = 'avatars';
    const dbPath = 'avatarFilesInfo';
    const fileMetadata = { contentType: 'audio/mp4' };
    await this.upLoad(options.uri)
      .then(res => console.log(res))
      .cath(err => console.log(err));

    // await this.props.firebase
    //   .uploadFile(storagePath, options.uri, dbPath, { metadata: fileMetadata })
    //   .then(snap => console.log('upload successful', snap))
    //   .catch(err => console.error('error uploading file', err));
  };
  uploadAudioAsync = async uri => {
    console.log('Uploading ' + uri);
    return true;
    // let apiUrl = 'http://YOUR_SERVER_HERE/upload';
    // let uriParts = uri.split('.');
    // let fileType = uriParts[uriParts.length - 1];

    // let formData = new FormData();
    // formData.append('file', {
    //   uri,
    //   name: `recording.${fileType}`,
    //   type: `audio/x-${fileType}`,
    // });

    // let options = {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    // };

    // console.log("POSTing " + uri + " to " + apiUrl);
    // return fetch(apiUrl, options);
  };

  upLoad = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    var metadata = {
      contentType: 'audio/m4a'
    };
    console.log(blob);

    var ref = firebase
      .storage()
      .ref()
      .child('stem/' + 'akkies');
    const snapshot = await ref.put(blob);
    blob.close();
    console.log(snapshot.ref.getDownloadURL());
    return await snapshot.ref.getDownloadURL();
  };
  render() {
    return (
      <View
        style={{ width: width, flexDirection: 'row', alignItems: 'center' }}
      >
        <Recorder
          style={{ flex: 1, width: width }}
          onComplete={this.recorderComplete}
          maxDurationMillis={150000}
          showDebug={false}
          showBackButton={true}
          audioMode={{
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playsInSilentLockedModeIOS: true,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
          }}
          resetButton={renderProps => {
            return (
              <Button
                onPress={renderProps.onPress}
                style={{
                  marginVertical: 5,
                  marginLeft: 10,
                  width: width * 0.4,
                  paddingLeft: 10,
                  backgroundColor: '#474554'
                }}
              >
                <Text>Reset</Text>
              </Button>
            );
          }}
          recordingCompleteButton={renderProps => {
            return (
              <Button
                onPress={renderProps.onPress}
                style={{
                  marginVertical: 5,
                  width: width * 0.4,
                  // paddingRight: 10,
                  marginRight: 10,
                  backgroundColor: '#474554'
                }}
              >
                <Text>Upload</Text>
              </Button>
            );
          }}
          playbackSlider={renderProps => {
            console.log({ 'maximumValue: ': renderProps.maximumValue });
            return (
              <Slider
                minimimValue={0}
                maximumValue={renderProps.maximumValue}
                onValueChange={renderProps.onSliderValueChange}
                value={renderProps.value}
                style={{
                  width: '100%'
                }}
              />
            );
          }}
        />

        <Player
          style={{ flex: 1 }}
          // onComplete={this.playerComplete.bind(this)}
          completeButtonText={'Return Home'}
          uri={
            'https://firebasestorage.googleapis.com/v0/b/disnetonsbackup.appspot.com/o/stem%2Fakkies?alt=media&token=598bb123-6fbc-4860-a7d6-1de205dad39e'
          }
          showDebug={true}
          showBackButton={true}
          playbackSlider={renderProps => {
            return (
              <Slider
                minimimValue={0}
                maximumValue={renderProps.maximumValue}
                onValueChange={renderProps.onSliderValueChange}
                value={renderProps.value}
                style={{
                  width: '100%'
                }}
              />
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.isThemeDark
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    {}
  )
)(RecodingComponent);
