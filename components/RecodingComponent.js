import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { Recorder } from 'react-native-audio-player-recorder-no-linking';
import { Audio } from 'expo-av';
import { Button, Icon } from 'native-base';
import { Slider } from 'react-native';
var { height, width } = Dimensions.get('window');

export default class RecodingComponent extends Component {
  recorderComplete = options => {
    console.log(options.size);
    this.setState({
      recordingToUpload: options.uri
    });
  };
  render() {
    return (
      <View style={{ width: width, flexDirection: 'row' }}>
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
                style={{ marginVertical: 5 }}
              >
                <Text>Reset</Text>
              </Button>
            );
          }}
          recordingCompleteButton={renderProps => {
            return (
              <Button
                block
                onPress={renderProps.onPress}
                style={{ marginVertical: 5 }}
              >
                <Text>Finish</Text>
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
      </View>
    );
  }
}
