import React, { Component } from 'react';

import {
  Content,
  Form,
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
import {
  Modal,
  Dimensions,
  View,
  Alert,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';

class DelelteAccount extends Component {
  state = {
    modalVisible: false,
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
  changeEmail = currentPassword => {
    // if (!this.state.password) {
    //   this.setState({
    //     modalVisible: false
    //   });
    //   return Toast.show({
    //     text: 'Fill in Form',
    //     position: 'bottom',
    //     type: 'danger'
    //   });
    // }
    const { firebase } = this.props;
    this.reauthenticate(currentPassword)
      .then(() => {
        var user = firebase.auth().currentUser;
        user
          .delete()
          .then(() => {
            Toast.show({
              text: 'Account deleted',
              position: 'bottom',
              duration: 3000
            });
            this.props.firebase.logout().then(res => {
              this.props.navigation.navigate('Auth'), AsyncStorage.clear();
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
    console.log(this.state.password);

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
              <Text style={styles.name}>Delete Account</Text>
              <Item floatingLabel>
                <Label style={styles.label}>Current Password</Label>
                <Input
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={text => this.setState({ password: text })}
                />
              </Item>
              <Button
                style={styles.buttonRed}
                block
                light
                onPress={() => {
                  this.changeEmail(this.state.password);
                }}
              >
                <Text style={styles.button}>Delete Account</Text>
              </Button>
              <Button
                style={styles.mainButton}
                block
                warning
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
          style={styles.buttonRed}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.button}>Delete Account</Text>
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
    textAlign: 'left',
    color: 'white'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  input: {
    fontFamily: 'raleway-regular'
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
    textAlign: 'left'
  },
  mainButton: {
    fontSize: 16,
    marginTop: 20,
    width: screenWidth,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonRed: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    backgroundColor: '#FF5C5C'
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
)(DelelteAccount);
