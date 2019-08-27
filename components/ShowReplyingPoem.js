import React, { Component } from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import PurePoemView from './PurePoemView';

export default class ShowReplyingPoem extends Component {
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
        {this.props.children}
        <Modal
          isVisible={this.state.showAppologiesModal}
          onBackdropPress={() => this.setState({ showAppologiesModal: false })}
        >
          <View>
            <ScrollView
              ref={ref => (this.scrollViewRef = ref)}
              scrollEventThrottle={16}
            >
              <View>
                <PurePoemView
                  poem={this.props.poem}
                  navigation={this.props.navigation}
                />
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
