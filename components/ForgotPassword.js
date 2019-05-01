import React, { Component } from 'react';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast
} from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Dimensions, View, Alert, StyleSheet } from 'react-native';
import firebase from 'firebase';

class ForgotPassword extends Component {
  state = {
    modalVisible: false,
    email: ''
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  saveInstagramHandle = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(res => {
        Toast.show({
          text: 'Reset Email Sent',
          buttonText: 'Okay',
          position: 'bottom'
        });
        this.setState({ modalVisible: false });
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
              <Text style={styles.name}>Reset Password</Text>
              <Form>
                <Item floatingLabel>
                  <Label style={styles.label}>Email Address</Label>
                  <Input
                    style={styles.label}
                    onChangeText={text => this.setState({ email: text })}
                  />
                </Item>
              </Form>

              <Button
                style={styles.buttonIn}
                block
                light
                onPress={this.saveInstagramHandle}
              >
                <Text style={styles.labelIn}>Reset Password</Text>
              </Button>
              <Button
                block
                style={styles.buttonItself}
                bordered
                warning
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={styles.button}>Close </Text>
              </Button>
            </View>
          </View>
        </Modal>
        <Button
          block
          transparent
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.mainButton}>Frogot Password?</Text>
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
  labelIn: {
    color: '#fff',
    fontFamily: 'raleway-regular',
    fontSize: 16
  },
  name: {
    fontSize: 24,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonIn: {
    fontSize: 16,
    backgroundColor: '#91D9D9',
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  buttonItself: {
    fontSize: 14,
    width: screenWidth,
    marginTop: 20,
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

    fontFamily: 'raleway-regular',
    color: '#91D9D9',
    textAlign: 'left'
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(ForgotPassword);
