import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import {
  Icon,
  Container,
  Title,
  Subtitle,
  Body,
  CardItem,
  Card,
  Row,
  Col,
  Toast
} from 'native-base';
import moment from 'moment';
import styled from 'styled-components/native';
const StyledText = styled.View`
  shadow-opacity: 0.35;
  shadow-radius: 20px;
  border-radius: 20px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 0px;
  background: white;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export default class CardPoem extends Component {
  render() {
    return (
      <StyledText>
        <Row>
          <Col>
            <Text style={styles.name}>{this.props.poem.name}</Text>
            {this.props.poem.handle ? (
              <Text
                onPress={() =>
                  Linking.openURL(
                    `https://www.instagram.com/${this.props.poem.handle}`
                  )
                }
                style={styles.handle}
              >
                {this.props.poem.handle}
              </Text>
            ) : null}
          </Col>
        </Row>
        <Text style={styles.body}>{this.props.poem.body}</Text>
        <Row>
          <Col>
            <View>
              <Text style={styles.date}>
                {moment(this.props.poem.date).fromNow()}
              </Text>
            </View>
          </Col>
        </Row>
      </StyledText>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontFamily: 'playfair-display-bold',
    textAlign: 'left'
  },
  handle: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'raleway-extralight'
  },
  body: {
    fontFamily: 'raleway-medium',
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 10
  },
  icon: {
    fontSize: 14
  },
  date: {
    fontSize: 12,
    fontFamily: 'raleway-extralight',
    textAlign: 'right',
    color: '#DCDCDC'
  }
});
