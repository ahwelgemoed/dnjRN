import React, { Component } from 'react';
import { Text, ScrollView, Slider } from 'react-native';
import {
  Recorder,
  Player
} from 'react-native-audio-player-recorder-no-linking';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { PoemName, InstagramText } from './Styles';

export default class ListAllAudioComponent extends Component {
  render() {
    console.log(this.props.poem.stemme);
    const { poem } = this.props;
    return (
      <ScrollView>
        <Grid>
          <Row>
            <PoemName>
              There are {poem.stemme.length} recordings for {poem.name}
            </PoemName>
          </Row>
          {poem.stemme.map((stem, i) => (
            <React.Fragment key={i}>
              <Row>
                <Col>
                  <Player
                    timeStampStyle={{
                      fontFamily: 'PTSansCaptionRegular',
                      fontSize: 14,
                      textAlign: 'left',
                      marginBottom: 5
                    }}
                    uri={stem.url}
                    showBackButton={false}
                    playbackSlider={renderProps => {}}
                  />
                </Col>
                <Col>
                  <InstagramText>
                    Posted{moment.unix(stem.date).fromNow()}
                  </InstagramText>
                </Col>
              </Row>
            </React.Fragment>
          ))}
        </Grid>
      </ScrollView>
    );
  }
}
