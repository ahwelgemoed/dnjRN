import React, { Component } from 'react';
import { Permissions, Audio } from 'expo';
import { StyleSheet, Dimensions, View, Text } from 'react-native';

export default class ViewPoem extends Component {
  async componentDidMount() {
    await Permissions.askAsync(Permissions.AUDIO_RECORDING);
  }
  recordingCallback = () => ({
    durationMillis,
    isRecording,
    isDoneRecording
  }) => ({ durationMillis, isRecording, isDoneRecording });
  setAudioMode = async ({ allowsRecordingIOS }) => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    });
  };
  start = async recording => {
    try {
      await this.setAudioMode({ allowsRecordingIOS: true });
      const recording = new Audio.Recording();
      recording.setOnRecordingStatusUpdate(props.recordingCallback);
      recording.setProgressUpdateInterval(200);
      this.setState({ fileUrl: null });
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      this.setState({ recording });
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
  };
  onEndRecording = async recording => {
    try {
      await recording.stopAndUnloadAsync();
      await this.setAudioMode({ allowsRecordingIOS: false });
    } catch (error) {
      console.log(error); // eslint-disable-line
    }
    if (recording) {
      const fileUrl = recording.getURI();
      recording.setOnRecordingStatusUpdate(null);
      this.setState({ recording: null, fileUrl });
    }
  };
  render() {
    console.log(this.state);
    const recording = new Audio.Recording();
    return (
      <View style={styles.container}>
        <Text onPress={this.start.bind(this, recording)}> Record Audio </Text>
        <Text onPress={this.onEndRecording.bind(this, recording)}>
          {' '}
          Stop Audio{' '}
        </Text>
        <Text onPress={this.play}> Play Audio </Text>
      </View>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    width: screenWidth
  }
});
