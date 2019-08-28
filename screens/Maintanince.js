import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ScreenBackground, PoemName } from '../components/Styles';
import { firestoreConnect } from 'react-redux-firebase';

import wiggly from './book.json';
import Lottie from 'lottie-react-native';

class Maintanince extends React.PureComponent {
  state = {
    maintenanceset: false,
    animation: null,
    maintenance: false
  };
  componentDidMount() {
    const { firestore } = this.props;
    firestore.get({
      collection: 'appStatus'
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.appStatus !== prevProps.appStatus) {
      await this.setState({
        maintenanceset: true,
        maintenance: this.props.appStatus[0].maintenance
      });
    }
    if (this.state.maintenance) {
      await this._playAnimation();
    }
  }
  _changeSpeed = speed => {
    this.setState({ speed });
  };

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimation();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _stopAnimation = () => {
    this.animation.reset();
  };

  _loadAnimation = () => {
    this.setState({ animation: wiggly }, this._playAnimation);
  };

  render() {
    if (this.state.maintenance) {
      return (
        <View style={styles.mainContent}>
          {this.state.animation && (
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 200,
                height: 200
              }}
              source={this.state.animation}
              speed={this.state.speed}
              loop={true}
            />
          )}

          <Text
            style={{
              fontSize: 22,
              paddingTop: 10,
              width: '90%',
              fontFamily: 'raleway-bold',
              textAlign: 'center',
              color: '#fff'
            }}
          >
            Hey - Sorry We are doing Some Maintenance come back soon - Read a
            book or something
          </Text>
        </View>
      );
    } else {
      return this.props.children;
    }
  }
}

export default compose(
  firestoreConnect(),
  connect(
    state => ({
      appStatus: state.firestore.ordered.appStatus
    }),
    { successfullyAddedPoem }
  )
)(Maintanince);

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  }
});
