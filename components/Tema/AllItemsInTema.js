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
import PurePoemView from '../PurePoemView';
import { firestoreConnect } from 'react-redux-firebase';
import { compareValues } from '../../helperFuctions';
import * as firebase from 'firebase';

var { height, width } = Dimensions.get('window');
class AllItemsInTema extends Component {
  state = { poems: '', loading: true };
  async componentDidMount() {
    const { firestore } = this.props;
    await firestore
      .collection('poems')
      .where('activeTema', '==', this.props.t.title)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          this.setState({
            poems: [...this.state.poems, doc.data()],
            loading: false
          });
        });
      });
  }
  render() {
    const { theme } = this.props;
    console.log(this.state.poems);

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
              data={this.state.poems.sort(compareValues('date'))}
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
)(AllItemsInTema);
