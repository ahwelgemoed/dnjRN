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
import TandC from './TandC';
import {
  Modal,
  Dimensions,
  View,
  Alert,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';

class FirstPostModal extends Component {
  state = {
    modalVisible: false
  };
  componentDidMount() {}

  async setModalVisible(visible) {
    await AsyncStorage.setItem('firstPost', 'true');
    await this.setState({ modalVisible: visible });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.openFirstModal === true &&
      prevProps.openFirstModal === false &&
      this.state.modalVisible === false
    ) {
      this.setState({ modalVisible: true });
    }
  }
  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.mainContent}>
            <View>
              <Text style={styles.name}>Yeah! Your First Post to</Text>
              <Text style={styles.nameTitle}>Dis Net Jy</Text>
              <Text style={styles.bodyHeading}>
                We've noticed this is your first post. Here is just a small
                reminder
              </Text>
              <Text style={styles.body}>
                You get 5min after the post to edit/fix some mistakes
              </Text>
              <Text style={styles.body}>
                You can choose to add your instagram handle with the post or not
              </Text>
              <Text style={styles.body}>
                You can add a "NSFW" Tag should you think it fits the post
              </Text>
              <Text style={styles.body}>
                Admin's will review all post and change/mark poems accordingly
              </Text>
              <Text style={styles.body}>By posting you agree to our T&C's</Text>
              <TandC />
              <Button
                style={styles.buttonIn}
                block
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={styles.labelIn}>Okay</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    color: 'red',
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
  buttonRed: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    backgroundColor: '#FF5C5C'
  },
  labelIn: {
    color: '#fff',
    fontFamily: 'raleway-regular',
    fontSize: 16
  },
  buttonIn: {
    fontSize: 16,
    backgroundColor: '#3CADA0',
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  name: {
    fontSize: 24,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  body: {
    fontSize: 14,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    paddingBottom: 10
  },
  bodyHeading: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    paddingBottom: 12
  },
  nameTitle: {
    fontSize: 24,
    fontFamily: 'raleway-boldI',
    textAlign: 'left',
    paddingBottom: 12
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
)(FirstPostModal);
