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

class AddInstagramModal extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  saveInstagramHandle = () => {
    const { firestore } = this.props;
    const payLoad = {
      Instagram: this.state.Instagram
    };
    firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {
        Toast.show({
          text: 'Instagram Handle Added!',
          buttonText: 'Okay',
          position: 'top'
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
              <Form>
                <Item floatingLabel>
                  <Label style={styles.label}>Instagram Handle</Label>
                  <Input
                    style={styles.label}
                    onChangeText={text => this.setState({ Instagram: text })}
                  />
                </Item>
              </Form>

              <Button
                style={styles.mainButton}
                block
                light
                onPress={this.saveInstagramHandle}
              >
                <Text>Add Instagram Handle</Text>
              </Button>
              <Button
                style={styles.mainButton}
                block
                light
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
          transparent
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.button}>Add Instagram Handle</Text>
        </Button>
      </View>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  label: {
    fontSize: 16,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  icon: {
    fontSize: 14,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  mainButton: {
    fontSize: 16,
    marginTop: 20,
    width: screenWidth,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(AddInstagramModal);
