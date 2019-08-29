import React, { Component } from 'react';
import { Text, View, Slider } from 'react-native';
import {
  Recorder,
  Player
} from 'react-native-audio-player-recorder-no-linking';
import moment from 'moment';

export default class ListAllAudioComponent extends Component {
  render() {
    console.log(this.props.poem.stemme);

    const { poem } = this.props;
    return (
      <View>
        {poem.stemme.map((stem, i) => (
          <React.Fragment>
            <Text> {moment.unix(stem.date).fromNow()}</Text>
            <Text> 🔥🔥🔥</Text>
            <Player
              key={i}
              // style={{ flex: 1 }}
              //  onComplete={}
              // completeButtonText={'Return Home'}
              uri={stem.url}
              // showDebug={true}
              showBackButton={false}
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
          </React.Fragment>
        ))}
      </View>
    );
  }
}
