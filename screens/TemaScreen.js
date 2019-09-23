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
import { ScreenBackground, PoemName } from '../components/Styles';
import { changePoem, toggleSwipeMode } from '../actions/themeActions';
import AppologiesModal from '../components/AppologiesModal';
import TemaItem from '../components/Tema/TemaItem';
import GetUserSudjestion from '../components/Tema/GetUserSudjestion';
import TopNav from '../components/TopNav';
import { Col, Row, Grid } from 'react-native-easy-grid';

class TemaScreen extends React.PureComponent {
  state = { openReplyModal: false };
  toggleReplyHistory = () => {
    this.setState({
      openReplyModal: !this.state.openReplyModal
    });
  };
  toggleReplyHistorys = () => {
    console.log('RANRANRAN');
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
        <TopNav pageTitle={'Temas'} navigation={this.props.navigation} />
        <AppologiesModal
          text={'Add Submition'}
          showAppologiesModal={this.state.openReplyModal}
        >
          <GetUserSudjestion toggleReplyHistory={this.toggleReplyHistorys} />
        </AppologiesModal>
        <PoemName>Past and Current Tema's</PoemName>
        {tema ? (
          <View style={styles.mainContent}>
            {tema.map((t, i) => {
              if (t.isActive || t.wasActive) {
                return (
                  <ListItem key={i}>
                    <TemaItem t={t} />
                  </ListItem>
                );
              }
            })}

            <Row>
              <Col style={{ width: '90%' }}>
                <PoemName>User Suggestion Tema's</PoemName>
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
          </View>
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
    width: screenWidth
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
