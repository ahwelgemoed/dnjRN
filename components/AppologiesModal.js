import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { InstagramText, PoemBodyText } from './Styles';
import { Button } from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

var { height, width } = Dimensions.get('window');

class AppologiesModal extends Component {
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
    const { theme } = this.props;
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
              backgroundColor: theme ? '#191919' : '#fff',
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
            <Button
              style={{
                fontSize: 16,
                backgroundColor: theme ? '#2f2f2f' : '#e5e5e5',
                marginTop: 20,
                marginRight: 5,
                fontFamily: 'raleway-regular',
                textAlign: 'center'
              }}
              block
              warning
              onPress={() => this.setState({ showAppologiesModal: false })}
            >
              {/* <PoemBodyText>Close</PoemBodyText> */}
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.theme.isThemeDark
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    {}
  )
)(AppologiesModal);
