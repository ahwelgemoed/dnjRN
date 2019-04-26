import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Button, Row, Col, Toast } from 'native-base';
import moment from 'moment';
import styled from 'styled-components/native';
const StyledText = styled.View`
  shadow-opacity: 0.35;
  shadow-radius: 10px;
  border-radius: 10px;
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
  state = {
    userEdit: false
  };
  componentDidMount() {
    const now = moment();
    const posted = moment(this.props.poem.date);
    const differ = now.diff(posted, 'minutes');

    if (this.props.auth.uid === this.props.poem.uid && differ < 2) {
      console.log('Mount');
      this.setState({
        userEdit: true
      });
      let time = setInterval(() => {
        const now = moment();
        const posted = moment(this.props.poem.date);
        const differ = now.diff(posted, 'minutes');
        console.log(differ);
        if (differ < 2) {
          this.setState({
            userEdit: true
          });
        } else {
          if (this.state.userEdit) {
            this.setState({
              userEdit: false
            });
          }
          clearInterval(time);
        }
      }, 30000);
    }
  }
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
                <Icon style={styles.handle} name="logo-instagram" />{' '}
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
        <Row>
          <Col>
            {this.state.userEdit ? (
              <Button
                block
                transparent
                onPress={() => {
                  this.props.navigation.navigate('Post', this.props.poem);
                }}
              >
                <Text style={styles.button}>Edit Poem</Text>
              </Button>
            ) : null}
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
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  handle: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'proxima-alt'
  },
  body: {
    fontFamily: 'proxima-alt',
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
