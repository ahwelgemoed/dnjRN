import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Input, Right, Left, Button, Text, ListItem } from 'native-base';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ScreenBackground, PoemName } from '../Styles';
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
      return;
    }

    await this.setState({
      loading: true
    });
    const payLoad = {
      uid: auth.uid,
      datePosted: dateNow,
      title: this.state.name
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
          loading: false
        });
      });
  };
  render() {
    const { theme } = this.props;
    return (
      <View>
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
            placeholder="Tema"
            value={this.state.name}
            onChangeText={text => this.setState({ name: text })}
          />
        </ListItem>
        <Left></Left>
        <Right>
          <Button
            small
            style={{
              fontSize: 16,
              textAlign: 'center',
              backgroundColor: '#3CADA0',
              marginTop: 5,
              padding: 16,
              width: '90%',
              // width: screenWidth - 80,
              fontFamily: 'raleway-regular',
              alignSelf: 'center',
              textAlign: 'center'
            }}
            light
            onPress={this.postUserTema}
          >
            {this.state.loading ? <ActivityIndicator color={'#fff'} /> : null}
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
        </Right>
      </View>
    );
  }
}

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
