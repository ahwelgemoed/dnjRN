import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Slider,
  Dimensions,
  Linking
} from 'react-native';
import Modalize from 'react-native-modalize';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Player } from 'react-native-audio-player-recorder-no-linking';
import { ListItem, Icon, Right, Left, Toast } from 'native-base';
import {
  InstagramText,
  FeatName,
  PoemBodyText,
  ScreenBackground
} from '../styles';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { postSelectedEpisode } from '../../actions/podcastActions';
import HTMLView from 'react-native-htmlview';
var { height, width } = Dimensions.get('window');

class SelectedEpisodeModal extends Component {
  modal = React.createRef();
  openModal = () => {
    this.modal.current.open();
  };
  componentDidMount() {
    console.log('POOP');

    this.openModal();
  }
  onClosed = () => {
    console.log('MESA');

    const { onClosed } = this.props;
    this.props.postSelectedEpisode(null);
    if (onClosed) {
      onClosed();
    }
  };
  clickedLink = url => {
    console.log(url);
    Linking.openURL(url);
  };
  render() {
    const { theme, selectedPodCast } = this.props;
    const dispP = `<p>${selectedPodCast.description}</p>`;

    return (
      <Modalize
        ref={this.modal}
        modalHeight={height / 2}
        onClosed={this.onClosed}
        modalStyle={{
          backgroundColor: theme ? '#000' : '#fff',
          margin: 20,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 20,
          shadowOpacity: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        // alwaysOpen={85}
        handlePosition="inside"
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FeatName>{selectedPodCast.title}</FeatName>

          <Image
            style={{
              width: 150,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            source={{ uri: selectedPodCast.image }}
          />
          <InstagramText>
            {moment(selectedPodCast.pub_date_ms).format('DD-MM-YYYY')}
          </InstagramText>
          <HTMLView
            value={dispP}
            stylesheet={StyleSheet.create({
              p: {
                fontSize: 16,
                fontFamily: 'raleway-regular',
                color: theme ? '#fff' : '#000'
              },
              heading: { fontSize: 18 },
              title: { fontSize: 20 },
              ol: { fontSize: 14 },
              bold: { fontSize: 16, fontFamily: 'raleway-bold' },
              a: { fontSize: 12 }
            })}
            onLinkPress={this.clickedLink}
          />
        </View>
      </Modalize>
    );
  }
}
const s = StyleSheet.create({
  content__modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16
  }
});
const styles = StyleSheet.create({
  p: { fontSize: 16, fontFamily: 'raleway-regular' },
  heading: { fontSize: 18 },
  title: { fontSize: 20 },
  ol: { fontSize: 14 },
  bold: { fontSize: 16, fontFamily: 'raleway-bold' },
  a: { fontSize: 12 }
});
export default compose(
  firestoreConnect(),
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      selectedPodCast: state.podcasts.selectedPodCast,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark
    }),
    { postSelectedEpisode }
  )
)(SelectedEpisodeModal);

{
  /* <Player
      timeStampStyle={{
        fontFamily: 'PTSansCaptionRegular',
        fontSize: 14,
        textAlign: 'left',
        color: '#C2C2C2',
        marginBottom: 5
      }}
      uri={selectedPodCast.audio}
      showBackButton={false}
      playbackSlider={renderProps => {
        return (
          <Slider
            minimimValue={0}
            maximumValue={renderProps.maximumValue}
            onValueChange={renderProps.onSliderValueChange}
            value={renderProps.value}
            style={{
              width: '100%'
            }}
          />
        );
      }}
    /> */
}
