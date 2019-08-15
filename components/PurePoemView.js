import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import { BlurView } from 'expo';
import {
  CNRichTextView,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
import {
  StyledText,
  PoemName,
  StaticPills,
  StaticPillsText,
  InstagramText
} from './Styles';
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

export default class PurePoemView extends Component {
  render() {
    return (
      <StyledText>
        <React.Fragment>
          <Row>
            <Col>
              {this.props.poem.name.replace(/\s/g, '') ? (
                <PoemName>{this.props.poem.name}</PoemName>
              ) : null}
              {this.props.poem.handle ? (
                <InstagramText> {this.props.poem.handle}</InstagramText>
              ) : (
                <InstagramText>- ANON</InstagramText>
              )}

              <View>
                <CNRichTextView
                  text={this.props.poem.body}
                  styleList={customStyles}
                  foreColor={'#474554'}
                  color={'#000'}
                />
              </View>
            </Col>
          </Row>
          <Row style={{ marginTop: 40 }}>
            <React.Fragment>
              <Col>
                <StaticPills>
                  <StaticPillsText>
                    {moment.unix(this.props.poem.date).fromNow()}
                  </StaticPillsText>
                </StaticPills>
              </Col>
            </React.Fragment>
          </Row>
        </React.Fragment>
      </StyledText>
    );
  }
}
