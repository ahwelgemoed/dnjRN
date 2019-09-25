import React from 'react';
import { StyleSheet } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import { firestoreConnect } from 'react-redux-firebase';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { DangerZone } from 'expo';
import wiggly from '../components/data.json';
import {
  ScreenBackground,
  PoemName,
  NavBarHeaderText
} from '../components/styles';

class AuthLoadingScreen extends React.Component {
  state = { firstVisit: null, animation: null, speed: 1, modalVisible: false };

  // componentDidMount() {
  //   const { firestore } = this.props;
  //   firestore
  //     .get({
  //       collection: 'appStatus'
  //     })
  //     .then(() => {
  //       this.setState({
  //         appStatus: this.props.appStatus,
  //         isFetching: false,
  //         loading: false
  //       });
  //     });
  // }
  constructor(props) {
    super(props);
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToke');
    // const firstVisit = await AsyncStorage.getItem('firstVisit');
    // await this.setState({
    //   firstVisit
    // });
  };
  componentDidUpdate(prevProps, prevState) {
    // if (this.state.modalVisible === true && prevState.modalVisible === false) {
    // }
  }

  // setModalVisible(visible) {
  //   this.setState({ modalVisible: visible });
  // }

  render() {
    const { auth } = this.props;
    if (!isLoaded(auth)) {
      return (
        <ScreenBackground style={styles.mainContent}>
          <NavBarHeaderText>DNJ</NavBarHeaderText>
        </ScreenBackground>
      );
    }
    if (isEmpty(auth)) {
      // if (this.state.firstVisit !== 'Yes') {
      return this.props.navigation.navigate('Welcome');
      // } else {
      //   return this.props.navigation.navigate('LoginScreen');
      // }
    }
    return this.props.navigation.navigate('App');
  }
}
const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  }
});

export default compose(
  firestoreConnect(),
  connect(
    state => ({
      appStatus: state.firestore.ordered.appStatus,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark
    }),
    {}
  )
)(AuthLoadingScreen);
