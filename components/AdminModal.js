import React, { Component } from 'react';
import {
  Content,
  Form,
  Body,
  CheckBox,
  ListItem,
  Button,
  Text,
  Toast,
  Switch
} from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Dimensions, View, Alert, StyleSheet } from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';

class AdminModal extends Component {
  state = {
    modalVisible: false,
    nsfw: false
  };
  componentDidMount() {
    this.setState({
      nsfw: this.props.poem.nsfw,
      reported: this.props.poem.reported
    });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  addNSFW = () => {
    const { firestore } = this.props;
    const payLoad = {
      nsfw: this.state.nsfw,
      reported: this.state.reported
    };
    firestore
      .update({ collection: 'poems', doc: this.props.poem.id }, payLoad)
      .then(res => {
        Toast.show({
          text: 'Marked as NSFW',
          buttonText: 'Okay',
          position: 'bottom',
          type: 'danger'
        });
        this.props.successfullyAddedPoem(true);
        this.setState({ modalVisible: false });
      });
  };
  deletePoem = () => {
    const { firestore } = this.props;
    Alert.alert(
      'Are You Sure?',
      'This will permanently Delete the Poem',
      [
        {
          text: 'Okay',
          onPress: () =>
            firestore
              .delete({ collection: 'poems', doc: this.props.poem.id })
              .then(res => {
                Toast.show({
                  text: 'Poem Deleted',
                  buttonText: 'Okay',
                  position: 'bottom',
                  type: 'danger'
                });
                this.props.successfullyAddedPoem(true);
                this.setState({ modalVisible: false });
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
  nsfw = () => {
    this.setState({
      nsfw: !this.state.nsfw
    });
  };
  reported = () => {
    this.setState({
      reported: !this.state.reported
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
              <Text style={styles.name}>
                {this.props.poem.name} - Admin Options
              </Text>
              <ListItem>
                <CheckBox
                  color={'#000'}
                  checked={this.state.nsfw}
                  onPress={this.nsfw}
                />
                <Body>
                  <Text style={styles.check}>NSFW</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox
                  color={'#000'}
                  checked={this.state.reported}
                  onPress={this.reported}
                />
                <Body>
                  <Text style={styles.check}>Inapropriate?</Text>
                </Body>
              </ListItem>

              <Button
                style={styles.mainButton}
                block
                light
                onPress={this.addNSFW}
              >
                <Text>Save Poem</Text>
              </Button>

              <Button
                style={styles.buttonRed}
                block
                danger
                onPress={this.deletePoem}
              >
                <Text>Delete Poem</Text>
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
        {this.props.admin ? (
          <Button
            block
            transparent
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            <Text style={styles.button}>Admin Panel</Text>
          </Button>
        ) : null}
      </View>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    color: 'red',
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
  buttonRed: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'proxima-alt',
    textAlign: 'left',
    backgroundColor: '#FF5C5C'
  },
  name: {
    fontSize: 24,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
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
  auth: state.firebase.auth,
  admin: state.poems.activateDelete
});

export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(AdminModal);
