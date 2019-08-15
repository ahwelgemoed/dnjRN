import React, { Component } from 'react';
import { Button, Text, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { InstagramText } from './Styles';
var { height, width } = Dimensions.get('window');

export default class AppologiesModal extends Component {
  state = {
    showAppologiesModal: false
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.showAppologiesModal !== prevProps.showAppologiesModal &&
      !this.state.showAppologiesModal
    ) {
      this.setState({
        showAppologiesModal: true
      });
    }
  }

  toggleModal = () => {
    this.setState({ showAppologiesModal: !this.state.showAppologiesModal });
  };

  render() {
    return (
      <View onPress={this.toggleModal}>
        <Modal
          style={{ borderRadius: height * 0.03 }}
          isVisible={this.state.showAppologiesModal}
          onBackdropPress={() => this.setState({ showAppologiesModal: false })}
        >
          <View
            style={{
              paddingTop: 8,
              backgroundColor: 'white',
              width: width * 0.95,
              height: height * 0.8,
              alignSelf: 'center',
              top: height * 0.1,
              borderRadius: height * 0.03,
              alignItems: 'center'
            }}
          >
            <InstagramText> MET APOLOGIE AAN</InstagramText>
            {this.props.children}
          </View>
        </Modal>
      </View>
    );
  }
}
