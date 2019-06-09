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
import { ScreenBackground } from './Styles';

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
    const { theme } = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ScreenBackground style={styles.mainContent}>
            <View>
              <Text
                style={
                  theme
                    ? {
                        color: '#D8D9D9',
                        fontSize: 24,
                        fontFamily: 'raleway-regular',
                        textAlign: 'left'
                      }
                    : {
                        color: '#2C2D2D',
                        fontSize: 24,
                        fontFamily: 'raleway-regular',
                        textAlign: 'left'
                      }
                }
              >
                Add your Instagram Handle
              </Text>
              <Form>
                <Item floatingLabel>
                  <Label style={styles.label}>Instagram Handle</Label>
                  <Input
                    style={
                      theme
                        ? {
                            color: '#D8D9D9',
                            fontSize: 16,
                            fontFamily: 'raleway-regular',
                            textAlign: 'left'
                          }
                        : {
                            color: '#2C2D2D',
                            fontSize: 16,
                            fontFamily: 'raleway-regular',
                            textAlign: 'left'
                          }
                    }
                    onChangeText={text => this.setState({ Instagram: text })}
                  />
                </Item>
              </Form>

              <Button
                style={styles.buttonIn}
                block
                light
                onPress={this.saveInstagramHandle}
              >
                <Text style={styles.labelIn}>Add Instagram Handle</Text>
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
          </ScreenBackground>
        </Modal>
        <Button
          block
          transparent
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.mainButton}>Add Instagram Handle</Text>
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
  auth: state.firebase.auth,
  theme: state.theme.isThemeDark
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(AddInstagramModal);
