import React, { Component } from 'react';
import { Text, ScrollView, ActivityIndicator } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { InstagramText, PodList } from '../styles';
import { compareValues } from '../../helperFuctions';
import { ListItem, Icon, Right, Left, Toast } from 'native-base';

class AllUserSujestions extends Component {
  componentDidMount() {
    this.initalFirebaseLoad();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.reftesh && prevProps.reftesh) {
      this.initalFirebaseLoad();
    }
  }
  initalFirebaseLoad = async () => {
    await this.setState({
      isFetching: true,
      poems: []
    });
    const { firestore } = this.props;
    await firestore
      .get({
        collection: 'userTemas',
        orderBy: ['votes', 'desc']
      })
      .then(res => {});
  };
  vote = t => {
    const { firestore } = this.props;
    firestore
      .update({ collection: 'userTemas', doc: t.id }, { votes: t.votes + 1 })
      .then(docRef => {
        this.initalFirebaseLoad();
        Toast.show({
          text: `Voted for ${t.title} `,
          buttonText: 'Okay',
          position: 'top'
        });
      })

      .catch(err =>
        this.setState({
          loading: false
        })
      );
  };
  render() {
    const { userTemas, theme } = this.props;
    return (
      <ScrollView style={{ backgroundColor: theme ? '#2b2b2b' : '#efefef' }}>
        {userTemas ? (
          userTemas.map((t, i) => {
            if (!t.wasUsed) {
              return (
                <ListItem key={i} onPress={this.vote.bind(this, t)}>
                  <Left>
                    <PodList>{t.title}</PodList>
                  </Left>
                  <Right style={{ textAlign: 'center' }}>
                    <Text
                      style={[
                        theme
                          ? {
                              color: '#D8D9D9',
                              fontSize: 16,
                              textAlign: 'center',
                              paddingRight: 5
                            }
                          : {
                              color: '#2C2D2D',
                              fontSize: 16,
                              textAlign: 'center',
                              paddingRight: 5
                            }
                      ]}
                    >
                      {t.votes}
                    </Text>
                    <Icon
                      name="heart"
                      type="FontAwesome"
                      style={[
                        theme
                          ? { color: '#D8D9D9', fontSize: 16 }
                          : { color: '#2C2D2D', fontSize: 16 }
                      ]}
                    />
                  </Right>
                </ListItem>
              );
            }
          })
        ) : (
          <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
        )}
      </ScrollView>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect(state => ({
    userTemas: state.firestore.ordered.userTemas,
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    addedPoem: state.poems.addedPoem,
    theme: state.theme.isThemeDark,
    swipeMode: state.theme.toggleSwipeMode
  }))
)(AllUserSujestions);
