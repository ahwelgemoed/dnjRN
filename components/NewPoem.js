import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon, Button } from 'native-base';
import { StyledText, PoemName, PoemBodyText } from './Styles';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  CNRichTextView,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
const defaultStyles = getDefaultStyles();
let customStyles = {
  ...defaultStyles,
  body: { fontSize: 16, fontFamily: 'raleway-regular' },
  heading: { fontSize: 18 },
  title: { fontSize: 20 },
  ol: { fontSize: 14 },
  ul: { fontSize: 12 }
};
export default class NewPoem extends Component {
  state = { open: false };
  render() {
    return (
      <StyledText
        ref={ref => {
          this[`${this.props.poem.id}`] = ref;
        }}
      >
        <Row>
          <Col>
            {/* TO:DO MOVE CODE TO BOOKMARK COMPONENT */}
            <Icon
              style={{
                position: 'absolute',
                color: '#474554',
                top: 8,
                right: -25,
                transform: [{ rotate: '90deg' }]
              }}
              type="FontAwesome"
              name="bookmark"
            />
            <PoemName>{this.props.poem.name}</PoemName>
            {this.props.poem.richText ? (
              <View
                style={{
                  flex: 1
                }}
              >
                <CNRichTextView
                  text={this.props.poem.body}
                  styleList={customStyles}
                  foreColor={'#474554'}
                  color={'#474554'}
                />
              </View>
            ) : (
              <PoemBodyText>{this.props.poem.body}</PoemBodyText>
            )}
          </Col>
        </Row>
        {/* <Button
          onPress={() =>
            this.setState({
              open: !this.state.open
            })
          }
        >
          <Text>Open</Text>
        </Button> */}
        <Row style={!this.state.open ? { display: 'none' } : {}}>
          <Col>
            <PoemName>Options</PoemName>
            <Text>Bookmark</Text>
            <Text>Report</Text>
          </Col>
        </Row>
      </StyledText>
    );
  }
}
