import React, { Component } from 'react';
import { Text, ScrollView, Dimensions } from 'react-native';
import {
  Recorder,
  Player
} from 'react-native-audio-player-recorder-no-linking';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { PoemName, PlayerScrollView, InstagramText } from './Styles';
var { height, width } = Dimensions.get('window');

export default class ListAllAudioComponent extends Component {
  render() {
    const { poem } = this.props;
    return (
      <ScrollView>
        <Grid>
          <Row>
            <PoemName>There are {poem.stemme.length} recording(s)</PoemName>
          </Row>
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToInterval={width * 0.25} //your element width
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
          >
            {poem.stemme.map((stem, i) => (
              <React.Fragment key={i}>
                <Row>
                  <PlayerScrollView>
                    <Col>
                      <Player
                        timeStampStyle={{
                          fontFamily: 'PTSansCaptionRegular',
                          fontSize: 14,
                          textAlign: 'left',
                          color: '#C2C2C2',
                          marginBottom: 5
                        }}
                        uri={stem.url}
                        showBackButton={false}
                        playbackSlider={renderProps => {}}
                      />
                    </Col>
                    <Col>
                      {poem.stemme.instagram ? (
                        <InstagramText>
                          Posted by :{poem.stemme.instagram}
                        </InstagramText>
                      ) : (
                        <InstagramText>Posted by : ANON</InstagramText>
                      )}
                      <InstagramText>
                        {moment.unix(stem.date).fromNow()}
                      </InstagramText>
                    </Col>
                  </PlayerScrollView>
                </Row>
              </React.Fragment>
            ))}
          </ScrollView>
        </Grid>
      </ScrollView>
    );
  }
}
