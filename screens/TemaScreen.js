import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import {
  Content,
  Container,
  ListItem,
  Icon,
  CheckBox,
  Right,
  Switch,
  Left
} from 'native-base';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  ScreenBackground,
  PoemName,
  InstagramText
} from '../components/styles';
import { changePoem, toggleSwipeMode } from '../actions/themeActions';
import AppologiesModal from '../components/AppologiesModal';
import TemaItem from '../components/Tema/TemaItem';
import GetUserSudjestion from '../components/Tema/GetUserSudjestion';
import AllUserSujestions from '../components/Tema/AllUserSujestions';
import TopNav from '../components/TopNav';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { ScrollView } from 'react-native-gesture-handler';

class TemaScreen extends React.PureComponent {
  state = { openReplyModal: false };
  toggleReplyHistory = () => {
    this.setState({
      openReplyModal: !this.state.openReplyModal
    });
  };
  toggleReplyHistorys = () => {
    this.setState({
      openReplyModal: false
    });
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
  render() {
    const { theme, tema } = this.props;
    return (
      <ScreenBackground style={styles.mainContent}>
        <TopNav pageTitle={'Tema'} navigation={this.props.navigation} />
        <AppologiesModal
          text={'Add Submition'}
          showAppologiesModal={this.state.openReplyModal}
        >
          <GetUserSudjestion toggleReplyHistory={this.toggleReplyHistorys} />
        </AppologiesModal>
        <Row
          style={{
            backgroundColor: theme ? '#000' : '#fff',
            marginBottom: 0.5,
            height: 70,
            shadowColor: '#000',
            shadowOffset: {
              width: 5,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
        >
          <Col style={{ width: '100%', marginLeft: 10 }}>
            <PoemName>View Past TEMAs</PoemName>
            {/* <InstagramText>Select To View The Submissions</InstagramText> */}
          </Col>
        </Row>
        {tema ? (
          <React.Fragment>
            <ScrollView
              style={{
                backgroundColor: theme ? '#2b2b2b' : '#efefef',
                flex: 1,
                paddingTop: 10,
                maxHeight: '50%'
              }}
            >
              {tema.map((t, i) => {
                if (t.isActive || t.wasActive) {
                  return <TemaItem t={t} key={i} />;
                }
              })}
            </ScrollView>
            <Row
              style={{
                backgroundColor: theme ? '#000' : '#fff',
                marginBottom: 0.5,
                height: 70,
                shadowColor: '#000',
                shadowOffset: {
                  width: 5,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}
            >
              <Col style={{ width: '90%', paddingLeft: 10 }}>
                <PoemName>Love & Submit Upcoming TEMAs</PoemName>
                {/* <InstagramText>Pressing It Votes For That Tema</InstagramText> */}
              </Col>
              <Col style={{ width: '10%' }}>
                <Icon
                  onPress={this.toggleReplyHistory}
                  style={{
                    color: '#c2c2c2',
                    paddingTop: 10,
                    fontSize: 20
                  }}
                  type="FontAwesome"
                  name="plus"
                />
              </Col>
            </Row>
            <Col
              style={{
                height: '50%',
                // marginLeft: 10,
                backgroundColor: theme ? '#2b2b2b' : '#efefef'
              }}
            >
              <AllUserSujestions reftesh={this.state.openReplyModal} />
            </Col>
          </React.Fragment>
        ) : (
          <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
        )}
      </ScreenBackground>
    );
  }
}
export default compose(
  firestoreConnect(),
  connect(
    state => ({
      tema: state.firestore.ordered.tema,
      poems: state.firestore.ordered.poems,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark,
      swipeMode: state.theme.toggleSwipeMode
    }),
    { changePoem, toggleSwipeMode }
  )
)(TemaScreen);

let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    textAlign: 'left',
    width: screenWidth,
    height: '50%'
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  },
  label: {
    fontSize: 14,
    fontFamily: 'raleway-extralight',
    textAlign: 'left'
  },
  labels: {
    fontSize: 10,
    fontFamily: 'raleway-extralight',
    textAlign: 'left'
  }
});
