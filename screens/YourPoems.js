import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import NewPoem from '../components/NewPoem';
import { Button, Icon } from 'native-base';
import UpdateUserInfo from '../components/UpdateUserInfo';
import { ScreenBackground } from '../components/styles';
import TopNav from '../components/TopNav';

class YourPoems extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Your Poems',
    headerLeft: null,
    headerRight: (
      <Button transparent onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" style={{ color: '#999' }} />
      </Button>
    ),
    headerTitleStyle: {
      fontFamily: 'raleway-boldI',
      fontSize: 20
    }
  });
  state = {
    loading: true,
    poems: ''
  };
  getBookMarkedPoems = async () => {
    const { firestore } = this.props;
    await firestore
      .get({
        collection: 'poems',
        where: ['uid', '==', `${this.props.profile.user}`]
      })
      .then(() => {
        this.setState({
          poems: this.props.poems,
          isFetching: false,
          loading: false
        });
      });
  };
  async componentDidMount() {
    await this.getBookMarkedPoems();
  }

  render() {
    const { loading, poems } = this.state;
    const { theme } = this.props;

    return (
      <ScreenBackground style={styles.container}>
        <TopNav
          pageTitle={'Your Poems'}
          navigation={this.props.navigation}
          leftComponent={this.setLeftHeader}
        />
        <ScrollView>
          {loading ? (
            <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />
          ) : (
            <React.Fragment>
              {poems.length ? (
                <ScrollView>
                  <Text style={styles.names}>Only You Can See This</Text>
                  <View
                    style={{
                      width: width,
                      justifyContent: 'center',
                      alignItems: 'center',
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
                      ListFooterComponent={() => (
                        <ActivityIndicator
                          color={theme ? '#D8D9D9' : '#2C2D2D'}
                        />
                      )}
                      data={poems}
                      ref={ref => {
                        this.flatListRef = ref;
                      }}
                      renderItem={({ item, i }) => (
                        <NewPoem
                          poem={item}
                          auth={this.props.auth}
                          navigation={this.props.navigation}
                        />
                        // <CardPoem
                        //   poem={item}
                        //   auth={this.props.auth}
                        //   navigation={this.props.navigation}
                        // />
                      )}
                    />
                  </View>
                </ScrollView>
              ) : (
                <View>
                  <Text style={styles.name}>You haven't Posted...</Text>
                  <Text style={styles.names}>yet</Text>
                </View>
              )}
            </React.Fragment>
          )}
        </ScrollView>
      </ScreenBackground>
    );
  }
}
var { height, width } = Dimensions.get('window');
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1
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
)(YourPoems);
