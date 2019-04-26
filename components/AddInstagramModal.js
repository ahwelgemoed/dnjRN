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
import {
  Modal,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet
} from 'react-native';

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
          <View style={{ marginTop: 40 }}>
            <View>
              <Form>
                <Item floatingLabel>
                  <Label>Instagram Handle</Label>
                  <Input
                    onChangeText={text => this.setState({ Instagram: text })}
                  />
                </Item>
              </Form>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
              <Button block light onPress={this.saveInstagramHandle}>
                <Text>Add Instagram Handle Poem</Text>
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
const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    color: '#999',
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
