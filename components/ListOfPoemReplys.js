import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PurePoemView from './PurePoemView';
import { firestoreConnect } from 'react-redux-firebase';
var { height, width } = Dimensions.get('window');
class ListOfPoemReplys extends Component {
  state = { poems: [this.props.poem], loading: true };
  async componentDidMount() {
    let i = 0;
    let gettingId = this.props.poem.repliedTo;
    const { firestore } = this.props;
    console.log(this.props.poem.repliedTo);
    while (i <= 0) {
      await firestore
        .get({ collection: 'poems', doc: gettingId })
        .then(doc => {
          this.setState({
            poems: [...this.state.poems, doc.data()]
          });
          if (doc.data().repliedTo) {
            gettingId = doc.data().repliedTo;
            i = 0;
          } else {
            i = 1;
            this.setState({
              loading: false
            });
          }
        })
        .catch(err => {});
    }
  }
  render() {
    const { theme } = this.props;
    return (
      <View>
        {!this.state.loading ? (
          <View
            style={{
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 50,
              flex: 1
            }}
          >
            <FlatList
              contentContainerStyle={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              scrollEventThrottle={160}
              onScroll={this.handleScroll}
              onEndReached={this.onRefresh}
              onEndReachedThreshold={0.5}
              onRefresh={this.initalFirebaseLoad}
              refreshing={this.state.isFetching}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.poems.reverse()}
              ref={ref => {
                this.flatListRef = ref;
              }}
              renderItem={({ item, i }) => (
                <React.Fragment>
                  <PurePoemView
                    poem={item}
                    navigation={this.props.navigation}
                  />
                </React.Fragment>
              )}
            />
          </View>
        ) : (
          <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
        )}
      </View>
    );
  }
}
export default compose(
  firestoreConnect(),
  connect(
    state => ({
      // profile: state.firebase.profile,
      // auth: state.firebase.auth,
      // addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark
      // swipeMode: state.theme.toggleSwipeMode
    }),
    {}
  )
)(ListOfPoemReplys);
