import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { Icon, Button, Row, Col, Badge, Toast, Text } from 'native-base';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import AdminModal from './AdminModal';
import styled from 'styled-components/native';
import Dialog, {
  SlideAnimation,
  DialogContent
} from 'react-native-popup-dialog';
import { WebBrowser } from 'expo';
const StyledText = styled.View`
  shadow-opacity: 0.35;
  shadow-radius: 10px;
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 1px 1px;
  background: white;
  margin: 10px;
  /* width: 100%; */
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
                this.setState({ reportDialog: false });
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
          !this.props.profile.seensfw && this.props.poem.nsfw
            ? { display: 'none', width: screenWidth }
            : { width: screenWidth }
        }
      >
        <Row>
          <Col>
            <Text style={styles.name}>{this.props.poem.name}</Text>
            <Text
              style={styles.elipse}
              onPress={() => {
                this.setState({ reportDialog: true });
              }}
            >
              {' '}
              <Icon
                style={styles.elipseIcon}
                type="FontAwesome"
                color="#ddd"
                name="ellipsis-v"
              />
            </Text>
            <Dialog
              visible={this.state.reportDialog}
              onTouchOutside={() => {
                this.setState({ reportDialog: false });
              }}
              dialogAnimation={
                new SlideAnimation({
                  slideFrom: 'bottom'
                })
              }
            >
              <DialogContent style={styles.mainContent}>
                <Text style={styles.nameDialog}> Options </Text>
                <Text style={styles.dates} onPress={() => this.reportPoem()}>
                  REPORT AS INAPPROPRIATE
                </Text>
              </DialogContent>
            </Dialog>
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
              <Text style={styles.date}>
                {moment(this.props.poem.date).fromNow()}
              </Text>
              {this.props.poem.nsfw ? (
                <Badge style={styles.IconBadge}>
                  <Text style={styles.nsfw}>NSFW</Text>
                </Badge>
              ) : null}
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.userEdit ? (
              <Button
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
            {this.props.admin && this.props.poem.reported ? (
              <Badge style={styles.IconBadgeReported}>
                <Text style={styles.nsfw}>Reported</Text>
              </Badge>
            ) : null}
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

let screenWidth = Dimensions.get('window').width - 60;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainContent: {
    width: screenWidth,
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12
  },
  elipse: {
    position: 'absolute',
    top: 1,
    right: 1,
    minWidth: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  elipseIcon: {
    color: '#ddd',
    fontSize: 14
  },
  IconBadge: {
    position: 'absolute',
    backgroundColor: '#FF5C5C',
    opacity: 0.3,
    bottom: 1,
    right: 1,
    // minWidth: 20,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  IconBadgeReported: {
    marginTop: 10,
    display: 'flex',
    backgroundColor: '#FF5C5C',
    bottom: 1,
    right: 1,
    minWidth: 20,
    width: '100%',
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 24,
    fontFamily: 'raleway-bold',
    textAlign: 'left'
  },
  nameDialog: {
    fontSize: 22,
    fontFamily: 'raleway-bold',
    textAlign: 'left',
    paddingBottom: 10
  },
  handle: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'proxima-alt'
  },
  nsfw: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'proxima-alt'
  },
  body: {
    // width: screenWidth,
    fontFamily: 'raleway-regular',
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
    fontFamily: 'raleway-regular',
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
    color: '#999',
    textAlign: 'right'
  }
});
