import React, { Component } from 'react';
import {
  Content,
  Icon,
  Item,
  Input,
  Label,
  Container,
  Textarea,
  Button,
  Text,
  CheckBox,
  ListItem,
  Body,
  Toast
} from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Dimensions, View, Alert, StyleSheet } from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';

class UpdateEmail extends Component {
  state = {
    modalVisible: false,
    email: '',
    password: ''
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  reauthenticate = currentPassword => {
    const { firebase } = this.props;
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateAndRetrieveDataWithCredential(cred);
  };
  changeEmail = (currentPassword, newEmail) => {
    if (!this.state.email || !this.state.password) {
      this.setState({
        modalVisible: false
      });
      return Toast.show({
        text: 'Fill in Form',
        position: 'bottom',
        type: 'danger'
      });
    }
    const { firebase } = this.props;
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            Toast.show({
              text: 'Email Updated',
              position: 'bottom',
              duration: 3000
            });
            this.setState({
              modalVisible: false
            });
          })
          .catch(error => {
            this.setState({
              modalVisible: false
            });
            Toast.show({
              text: error.message,
              position: 'bottom',
              type: 'danger',
              duration: 3000
            });
          });
      })
      .catch(error => {
        this.setState({
          modalVisible: false
        });
        Toast.show({
          text: error.message,
          position: 'bottom',
          type: 'danger',
          duration: 3000
        });
      });
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.mainContent}>
            <View>
              <Text style={styles.name}>Update Email</Text>
              <Item floatingLabel>
                <Label style={styles.label}>Current Password</Label>
                <Input
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={text => this.setState({ password: text })}
                />
              </Item>
              <Item floatingLabel>
                <Label style={styles.label}>New Email Address</Label>
                <Input
                  style={styles.input}
                  onChangeText={text => this.setState({ email: text })}
                />
              </Item>
              <Button
                style={styles.buttonBlue}
                block
                light
                onPress={() => {
                  this.changeEmail(this.state.password, this.state.email);
                }}
              >
                <Text style={styles.labelUp}>Save New Email</Text>
              </Button>
              <Button
                style={styles.mainButton}
                block
                warning
                bordered
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Close </Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Button
          block
          light
          bordered
          style={styles.buttonUp}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.blueText}>Change Email</Text>
        </Button>
      </View>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonBlue: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    marginTop: 20,
    textAlign: 'left',
    backgroundColor: '#91D9D9',
    color: 'white'
  },
  labelUp: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },

  buttontext: {
    color: 'white',
    fontSize: 16
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  name: {
    fontSize: 24,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  label: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  icon: {
    fontSize: 14,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    color: 'white'
  },
  buttonUp: {
    fontSize: 16,
    borderColor: '#91D9D9',
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  blueText: {
    color: '#91D9D9',
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mainButton: {
    fontSize: 16,
    marginTop: 20,
    width: screenWidth,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  admin: state.poems.activateDelete
});

export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(UpdateEmail);
