import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Icon, Button, Row, Col, Badge } from 'native-base';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import AdminModal from './AdminModal';
import styled from 'styled-components/native';
import { WebBrowser } from 'expo';
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
  /* display: none; */
`;

class CardPoem extends Component {
  state = {
    userEdit: false
  };
  reportPoem = () => {
    const { firestore } = this.props;
    Alert.alert(
      'Are You Sure?',
      'If you accept you will report this poem for being inappropriate or against the T&C`s  ',
      [
        {
          text: 'Report',
          onPress: () =>
            firestore
              .update(
                { collection: 'poems', doc: this.props.poem.id },
                { reported: true }
              )
              .then(res => {
                Toast.show({
                  text: 'Poem Reported to Admin',
                  buttonText: 'Okay',
                  position: 'bottom',
                  type: 'danger'
                });
              })
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
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
      <StyledText
        style={
          this.props.admin && this.props.poem.reported
            ? { backgroundColor: '#F1E6CD' }
            : null
        }
        style={
          !this.props.profile.seensfw && this.props.poem.nsfw
            ? { display: 'none' }
            : null
        }
      >
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
                  WebBrowser.openBrowserAsync(
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
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.dates} onLongPress={() => this.reportPoem()}>
                REPORT
              </Text>
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
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.poems.activateDelete
});
export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CardPoem);

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
  dates: {
    fontSize: 12,
    fontFamily: 'raleway-extralight',
    textAlign: 'left',
    color: '#FF5C5C'
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
