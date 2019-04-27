import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Button, Row, Col, Badge } from 'native-base';
import moment from 'moment';
import AdminModal from './AdminModal';
import styled from 'styled-components/native';
import Pulse from 'react-native-pulse';
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

    if (this.props.auth.uid === this.props.poem.uid && differ < 5) {
      this.setState({
        userEdit: true
      });
      let time = setInterval(() => {
        const now = moment();
        const posted = moment(this.props.poem.date);
        const differ = now.diff(posted, 'minutes');

        if (differ < 5) {
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
            {this.props.poem.nsfw ? (
              <Badge style={styles.IconBadge}>
                <Text style={styles.nsfw}>NSFW</Text>
              </Badge>
            ) : null}
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
                style={styles.button}
                transparent
                block
                small
                onPress={() => {
                  this.props.navigation.navigate('Post', this.props.poem);
                }}
              >
                <Text style={styles.buttonText}>Edit Poem</Text>
              </Button>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <AdminModal poem={this.props.poem} />
          </Col>
        </Row>
      </StyledText>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  IconBadge: {
    position: 'absolute',
    backgroundColor: '#ddd',
    top: 1,
    right: 1,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  nsfw: {
    fontSize: 12,
    textAlign: 'left',
    color: 'white',
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
    color: '#ddd'
  },
  button: {
    fontSize: 12,
    fontFamily: 'raleway-extralight',
    textAlign: 'right',
    backgroundColor: '#ddd',
    color: 'white',

    marginLeft: 10
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'raleway-extralight',
    textAlign: 'right'
  }
});
