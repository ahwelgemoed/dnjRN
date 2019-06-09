import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import CardPoem from '../components/CardPoem';
import { Button, Icon } from 'native-base';
import { ScreenBackground } from '../components/Styles';
import TopNav from '../components/TopNav';

class BookmarkScreen extends Component {
  state = {
    loading: true,
    poems: ''
  };
  getBookMarkedPoems = async () => {
    const { firestore } = this.props;
    await this.props.profile.bookmarks.map(bookmark => {
      firestore.get({ collection: 'poems', doc: bookmark }).then(doc => {
        this.setState({
          poems: [...this.state.poems, doc.data()]
        });
      });
    });
  };
  async componentDidMount() {
    await this.getBookMarkedPoems();
  }
  async componentDidUpdate() {
    if (
      this.state.loading &&
      this.state.poems.length === this.props.profile.bookmarks.length
    ) {
      this.setState({ loading: false });
    }
    if (
      !this.state.loading &&
      this.state.poems.length !== this.props.profile.bookmarks.length
    ) {
      await this.setState({ loading: true, poems: '' });
      await this.getBookMarkedPoems();
    }
  }
  render() {
    const { loading, poems } = this.state;
    const { theme } = this.props;

    if (this.props.profile.bookmarks.length === 0) {
      return (
        <ScreenBackground style={styles.container}>
          <TopNav
            pageTitle={'Bookmarks'}
            navigation={this.props.navigation}
            leftComponent={this.setLeftHeader}
          />
          <ScrollView>
            <Text
              style={[
                styles.name,
                theme
                  ? {
                      color: '#D8D9D9'
                    }
                  : {
                      color: '#2C2D2D'
                    }
              ]}
            >
              You don't have any bookmarks
            </Text>
            <Text style={styles.names}>#SAD</Text>
          </ScrollView>
        </ScreenBackground>
      );
    } else {
      return (
        <ScreenBackground style={styles.container}>
          <TopNav
            pageTitle={'Bookmarks'}
            navigation={this.props.navigation}
            leftComponent={this.setLeftHeader}
          />
          <ScrollView>
            {loading ? (
              <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
            ) : (
              <React.Fragment>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  data={poems}
                  ref={ref => {
                    this.flatListRef = ref;
                  }}
                  renderItem={({ item, i }) => (
                    <CardPoem
                      poem={item}
                      auth={this.props.auth}
                      navigation={this.props.navigation}
                    />
                  )}
                />
              </React.Fragment>
            )}
          </ScrollView>
        </ScreenBackground>
      );
    }
  }
}
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#f9f9f9',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
    // width: '100%'
  },
  name: {
    fontSize: 22,
    paddingTop: 10,
    fontFamily: 'raleway-bold',
    textAlign: 'left'
  },
  names: {
    fontSize: 14,
    paddingTop: 10,
    color: '#999',
    fontFamily: 'raleway-bold',
    textAlign: 'center'
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  poems: state.firestore.ordered.poems,
  theme: state.theme.isThemeDark
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(BookmarkScreen);
