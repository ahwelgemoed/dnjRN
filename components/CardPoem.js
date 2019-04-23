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
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 0px;
  background: white;
  margin-bottom: 40px;
  width: 95%;
  padding: 10px;
`;

export default class CardPoem extends Component {
  render() {
    return (
      <StyledText style={styles.container}>
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
    fontSize: 30,
    textAlign: 'left'
  },
  handle: {
    fontSize: 16,
    textAlign: 'left'
  },
  body: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10
  },
  icon: {
    fontSize: 14
  },
  date: {
    fontSize: 12,
    textAlign: 'right',
    color: '#DCDCDC'
  }
});
