import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { PoemName, MetaAppolo } from './styles';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon } from 'native-base';
var { height, width } = Dimensions.get('window');

class ListAllAudioModal extends React.PureComponent {
  state = {
    ListAllAudioModal: false
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.ListAllAudioModal !== prevProps.ListAllAudioModal &&
      !this.state.ListAllAudioModal
    ) {
      this.setState({
        ListAllAudioModal: true
      });
    }
  }

  toggleModal = () => {
    this.setState({ ListAllAudioModal: !this.state.ListAllAudioModal });
  };

  render() {
    const { theme } = this.props;
    return (
      <View>
        <Icon
          onPress={this.toggleModal}
          style={{
            position: 'absolute',
            color: '#c2c2c2',
            transform: [{ rotate: '0deg' }],
            fontSize: 20,
            right: 80,
            top: 10
          }}
          type="FontAwesome"
          name="play"
        />
        {/* <MetaAppolo >Luister Toonse</MetaAppolo> */}
        <Modal
          style={{ borderRadius: height * 0.03 }}
          isVisible={this.state.ListAllAudioModal}
          onBackdropPress={() => this.setState({ ListAllAudioModal: false })}
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
            <MetaAppolo>Toonsete</MetaAppolo>
            {this.props.children}
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
)(ListAllAudioModal);
