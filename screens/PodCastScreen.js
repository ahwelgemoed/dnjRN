import React from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
  Linking,
  Text,
  Platform
} from 'react-native';
import { getHuidig } from '../actions/podcastActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'native-base';
import { ScreenBackground, InstagramText } from '../components/Styles';
import ListPodcastEpisodes from '../components/Podcast/ListPodcastEpisodes';
import SelectedEpisodeModal from '../components/Podcast/SelectedEpisodeModal';
import TopNav from '../components/TopNav';
import Constants from 'expo-constants';
import { Col, Row, Grid } from 'react-native-easy-grid';
import HTMLView from 'react-native-htmlview';

class PodCastScreen extends React.PureComponent {
  state = {
    episodes: null
  };
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTitle: (
      <TopNav
        pageTitle={'DNJ'}
        navigation={navigation}
        leftComponent={this.setLeftHeader}
      />
    )
    // headerTransparent: true,
  });
  componentDidMount() {
    this.props.getHuidig();
  }

  render() {
    const { theme, podCast, selectedPodCast, allEps } = this.props;
    const dispP = podCast ? `<p>${podCast.description}</p>` : null;

    // website
    return (
      <React.Fragment>
        <ScreenBackground style={styles.container}>
          {podCast ? (
            <React.Fragment>
              <TopNav
                pageTitle={podCast.title}
                navigation={this.props.navigation}
              />

              <Image
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                source={{ uri: podCast.image }}
              />
              <InstagramText onPress={() => Linking.openURL(podCast.website)}>
                LISTEN
              </InstagramText>
              <HTMLView
                value={dispP}
                stylesheet={StyleSheet.create({
                  p: {
                    fontSize: 16,
                    padding: 10,
                    fontFamily: 'raleway-regular',
                    color: theme ? '#fff' : '#000'
                  },

                  a: { fontSize: 12 }
                })}
                onLinkPress={this.clickedLink}
              />
            </React.Fragment>
          ) : null}
          <Row>
            <ScrollView>
              <Col style={{ height: '50%', marginLeft: 10 }}>
                {allEps ? (
                  allEps.map(p => (
                    <React.Fragment>
                      <ListPodcastEpisodes episode={p} />
                    </React.Fragment>
                  ))
                ) : (
                  <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
                )}
              </Col>
            </ScrollView>
          </Row>
        </ScreenBackground>
        {selectedPodCast ? <SelectedEpisodeModal /> : null}
      </React.Fragment>
    );
  }
}
export default compose(
  firestoreConnect(),
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      selectedPodCast: state.podcasts.selectedPodCast,
      allEps: state.podcasts.allEps,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark,
      swipeMode: state.theme.toggleSwipeMode,
      podCast: state.podcasts.podCast
    }),
    { getHuidig }
  )
)(PodCastScreen);

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    width: width
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  }
});
