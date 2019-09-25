import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Text, View } from 'react-native';
import { ListItem, Icon, Right, Left, Toast } from 'native-base';
import { InstagramText, PodList } from '../styles';
import { postSelectedEpisode } from '../../actions/podcastActions';

class ListPodcastEpisodes extends Component {
  postSelectedEpisode = () => {
    const { episode } = this.props;
    this.props.postSelectedEpisode(episode);
  };
  render() {
    const { episode } = this.props;
    return (
      <ListItem onPress={this.postSelectedEpisode}>
        <Left>
          <PodList>{episode.title}</PodList>
        </Left>
        <Right></Right>
      </ListItem>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect(
    state => ({
      podCast: state.podcasts.podCast
    }),
    { postSelectedEpisode }
  )
)(ListPodcastEpisodes);
