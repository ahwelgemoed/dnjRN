import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getHuidig } from '../../actions/podcastActions';

class GetPodcasts extends Component {
  componentDidMount() {
    this.props.getHuidig();
  }
  onClose = e => {
    if (e == 'user') {
      this.props.navigation.navigate('PodCastScreen');
    }
  };
  async componentDidUpdate(pP, ps) {
    // await AsyncStorage.clear();
    if (this.props.allEps != pP.allEps) {
      const huidigFromAPI = this.props.podCast.total_episodes;
      try {
        const numberOfHuidigEps = await AsyncStorage.getItem('huidigEps');
        const parseNumberOfHuidigEps = JSON.parse(numberOfHuidigEps);
        if (parseNumberOfHuidigEps) {
          if (parseNumberOfHuidigEps != huidigFromAPI) {
            console.log('A New EPS');
            await AsyncStorage.setItem(
              'huidigEps',
              JSON.stringify(huidigFromAPI)
            );
            Toast.show({
              onClose: this.onClose,
              text: 'A New huiDig Episode Available',
              buttonText: 'Listen',
              duration: 5000,
              position: 'top'
            });
          }
        } else {
          await AsyncStorage.setItem(
            'huidigEps',
            JSON.stringify(huidigFromAPI)
          );
          Toast.show({
            onClose: this.onClose,
            text: 'You Can Now Listen To huiDig Podcast in DNJ',
            buttonText: 'Listen',
            duration: 5000,
            position: 'top'
          });
        }
      } catch (error) {
        console.log('There As Been An Error');
      }
    }
  }
  render() {
    return <View>{this.props.children}</View>;
  }
}

export default compose(
  connect(
    state => ({
      allEps: state.podcasts.allEps,
      podCast: state.podcasts.podCast
    }),
    { getHuidig }
  )
)(GetPodcasts);
