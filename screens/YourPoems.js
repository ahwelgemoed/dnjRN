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
import CardPoem from '../components/CardPoem';
import { Button, Icon } from 'native-base';
import UpdateUserInfo from '../components/UpdateUserInfo';

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
    console.log(poems);

    return (
      <SafeAreaView style={styles.container}>
        {loading ? (
          <Image
            source={require('../assets/images/Loading.gif')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
              paddingLeft: 30
            }}
          />
        ) : (
          <React.Fragment>
            {poems.length ? (
              <ScrollView>
                <Text style={styles.names}>Only You Can See This</Text>
                <FlatList
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
              </ScrollView>
            ) : (
              <View>
                <Text style={styles.name}>You haven't Posted...</Text>
                <Text style={styles.names}>yet</Text>
              </View>
            )}
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}
let screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%'
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
  poems: state.firestore.ordered.poems
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(YourPoems);
