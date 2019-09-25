import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Keyboard
} from 'react-native';
import { Input, Right, Left, Button, Text, ListItem, Toast } from 'native-base';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ScreenBackground, PoemName } from '../styles';
import moment from 'moment';

class GetUserSudjestion extends Component {
  state = { name: null, loading: false };
  postUserTema = async () => {
    const { firestore, auth, firebase } = this.props;
    const dateNow = JSON.stringify(moment());
    if (!this.state.name) {
      await this.setState({
        loading: false
      });
      return Toast.show({
        text: 'Please Add Tema Name',
        position: 'top',
        type: 'danger',
        duration: 3000
      });
    }

    await this.setState({
      loading: true
    });
    const payLoad = {
      uid: auth.uid,
      datePosted: dateNow,
      title: this.state.name,
      votes: 0,
      wasUsed: false
    };
    await firestore
      .add(
        {
          collection: 'userTemas'
        },
        payLoad
      )
      .then(() => {
        this.props.toggleReplyHistory();
        this.setState({
          loading: false,
          name: ''
        });
        Keyboard.dismiss;
        return Toast.show({
          text: 'Tema Posted Added',
          buttonText: 'Okay',
          position: 'top',
          type: 'success'
        });
      });
  };
  render() {
    const { theme } = this.props;
    return (
      <View style={styles.mainContent}>
        <PoemName>Post A Tema Suggestion</PoemName>
        <ListItem>
          <Input
            style={
              theme
                ? {
                    color: '#D8D9D9',
                    fontSize: 16,
                    fontFamily: 'raleway-regular',
                    textAlign: 'left'
                  }
                : {
                    color: '#2C2D2D',
                    fontSize: 16,
                    fontFamily: 'raleway-regular',
                    textAlign: 'left'
                  }
            }
            placeholder="Tema Name"
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </ListItem>
        {/* <ListItem> */}
        <Button
          small
          style={{
            fontSize: 16,
            textAlign: 'center',
            backgroundColor: '#3CADA0',
            marginTop: 5,
            padding: 16,
            marginTop: 30,
            width: '90%',
            // width: screenWidth - 80,
            fontFamily: 'raleway-regular',
            alignSelf: 'center',
            textAlign: 'center'
          }}
          light
          onPress={this.postUserTema}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: 'raleway-regular',
              fontSize: 16,
              textAlign: 'center'
            }}
          >
            Submit Tema
          </Text>
        </Button>
        {/* </ListItem> */}
      </View>
    );
  }
}

let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    textAlign: 'center'
    // width: screenWidth,
  }
});

export default compose(
  firestoreConnect(),
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark,
      swipeMode: state.theme.toggleSwipeMode
    }),
    {}
  )
)(GetUserSudjestion);
