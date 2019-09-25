import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Modalize from 'react-native-modalize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { CustomLinks } from '../styles';
import PodPlayer from './PodPlayer';
import { closePlayer } from '../../actions/podcastActions';
var { height, width } = Dimensions.get('window');

class PodcastPlayer extends Component {
  state = { PLAYLIST: null };
  modal = React.createRef();
  componentDidMount() {
    const { playerStatus, allEps } = this.props;
    if (!this.state.PLAYLIST && playerStatus !== 'all') {
      const PLAYLIST = [
        {
          uri: playerStatus.audio,
          name: playerStatus.title,
          image: playerStatus.image
        }
      ];

      this.setState({
        PLAYLIST
      });
    }
    let PLAYLIST = [];
    if (!this.state.PLAYLIST && playerStatus === 'all') {
      for (let index = 0; index < allEps.length; index++) {
        const element = allEps[index];
        const play = {
          uri: element.audio,
          name: element.title,
          image: element.image
        };
        PLAYLIST.push(play);
      }
      this.setState({
        PLAYLIST
      });
    }
  }
  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };
  onClosed = () => {
    const { onClosed } = this.props;

    if (onClosed) {
      onClosed();
    }
  };
  closePlayer = () => {
    this.props.closePlayer();
  };

  render() {
    const { theme, selectedPodCast, allEps, playerStatus } = this.props;
    return (
      <Modalize
        ref={this.modal}
        scrollViewProps={{ scrollEnabled: false }}
        modalHeight={height * 0.5}
        onClosed={this.onClosed}
        modalStyle={{
          backgroundColor: theme ? '#2b2b2b' : '#efefef',
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          shadowOpacity: 0
        }}
        alwaysOpen={85}
        handlePosition="inside"
      >
        <PodPlayer
          podPlaylist={this.state.PLAYLIST}
          theme={theme}
          playerStatus={playerStatus}
        />
        <CustomLinks onPress={this.closePlayer}>Close Player</CustomLinks>
      </Modalize>
    );
  }
}
export default compose(
  firestoreConnect(),
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      playerStatus: state.podcasts.playerStatus,
      selectedPodCast: state.podcasts.selectedPodCast,
      allEps: state.podcasts.allEps,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark
    }),
    { closePlayer }
  )
)(PodcastPlayer);
