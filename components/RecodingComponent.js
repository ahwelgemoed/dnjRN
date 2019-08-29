import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Text, View, Dimensions, ActivityIndicator } from 'react-native';
import uuid from 'uuid';
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
  state = { uploading: false };
  recorderComplete = async options => {
    await this.setState({
      uploading: true
    });
    const storagePath = 'avatars';
    const dbPath = 'avatarFilesInfo';
    const fileMetadata = { contentType: 'audio/mp4' };
    await this.upLoad(options.uri)
      .then(res => console.log(res))
      .cath(err =>
        this.setState({
          uploading: false
        })
      );
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

  updatePoem = url => {
    const { firestore, poem } = this.props;
    let stemme = poem.stemme ? [...poem.stemme] : [];
    firestore
      .update(
        {
          collection: 'poems',
          doc: poem.id
        },
        { stemme: [...stemme, url] }
      )
      .then(() => {
        this.setState({
          uploading: false
        });
        // this.props.navigation.navigate('Home');
      });
  };
  render() {
    const { uploading } = this.state;
    return uploading ? (
      <ActivityIndicator />
    ) : (
      <React.Fragment>
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
                    width: width * 0.4,
                    paddingLeft: 10,
                    backgroundColor: '#474554',
                    color: 'white'
                  }}
                >
                  <Text style={{ color: 'white' }}>Reset</Text>
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
                    marginLeft: 10,
                    backgroundColor: '#474554',
                    color: 'white'
                  }}
                >
                  <Text style={{ color: 'white' }}>Upload</Text>
                </Button>
              );
            }}
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
      </React.Fragment>
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
