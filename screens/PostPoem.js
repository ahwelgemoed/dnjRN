import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import AddInstagramModal from '../components/AddInstagramModal';
import { successfullyAddedPoem } from '../actions/poemsActions';
import {
  StyleSheet,
  Dimensions,
  AsyncStorage,
  View,
  ActivityIndicator
} from 'react-native';
import FirstPostModal from '../components/FirstPostModal';
import {
  Content,
  Form,
  Item,
  Input,
  Label,
  Container,
  Textarea,
  Button,
  Text,
  CheckBox,
  ListItem,
  Toast,
  Body,
  Icon
} from 'native-base';

class PostPoem extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Post a Poem',
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
    withInstagram: false,
    instagram: false,
    body: '',
    openFirstModal: false,
    name: '',
    update: false,
    handle: '',
    nsfw: '',
    adminNotes: 'None',
    reported: false,
    loading: false
  };

  withInstagram = () => {
    this.setState({
      withInstagram: !this.state.withInstagram
    });
  };
  nsfw = () => {
    this.setState({
      nsfw: !this.state.nsfw
    });
  };
  upDateSave = async () => {};
  postToPoem = async () => {
    if (!this.state.name) {
      return Toast.show({
        text: 'Please give Poem a name',
        position: 'bottom',
        type: 'danger',
        duration: 3000
      });
    }
    if (!this.state.body) {
      return Toast.show({
        text: 'Please give Poem a body',
        position: 'bottom',
        type: 'danger',
        duration: 3000
      });
    }
    if (this.state.firstPost != 'true') {
      return this.setState({
        openFirstModal: true
      });
    }
    this.setState({
      loading: true
    });
    if (this.state.update) {
      const { firestore, auth } = this.props;
      const {
        id,
        date,
        body,
        name,
        handle,
        nsfw,
        withInstagram,
        adminNotes,
        reported
      } = this.state;
      let payLoad;
      if (withInstagram) {
        payLoad = {
          date,
          body,
          nsfw,
          reported,
          name,
          adminNotes,
          handle: this.props.profile.Instagram,
          uid: auth.uid
        };
      } else {
        payLoad = {
          date,
          body,
          adminNotes,
          nsfw,
          name,
          reported,
          handle: '',
          uid: auth.uid
        };
      }
      await firestore
        .update(
          {
            collection: 'poems',
            doc: id
          },
          payLoad
        )
        .then(res => {
          this.props.successfullyAddedPoem(true);
          this.props.navigation.navigate('Home');
        })
        .catch(err =>
          this.setState({
            loading: false
          })
        );
    } else {
      const { firestore, auth } = this.props;
      const {
        date,
        body,
        reported,
        name,
        handle,
        withInstagram,
        nsfw,
        adminNotes
      } = this.state;
      let payLoad;
      if (withInstagram) {
        payLoad = {
          date: parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0)),
          body,
          nsfw,
          name,
          adminNotes,
          reported,
          handle: this.props.profile.Instagram,
          uid: auth.uid
        };
      } else {
        payLoad = {
          date: parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0)),
          nsfw,
          body,
          name,
          reported,
          adminNotes,
          handle: '',
          uid: auth.uid
        };
      }
      await firestore
        .add(
          {
            collection: 'poems'
          },
          payLoad
        )
        .then(res => {
          this.props.successfullyAddedPoem(true);
          this.props.navigation.navigate('Home');
        })
        .catch(err =>
          this.setState({
            loading: false
          })
        );
    }
  };
  async componentDidUpdate(prevProps, prevState) {
    const firstPost = await AsyncStorage.getItem('firstPost');
    if (this.state.openFirstModal === true && firstPost == 'true') {
      await this.setState({
        openFirstModal: false,
        firstPost
      });
      await this.postToPoem();
    }
  }
  async componentDidMount() {
    const firstPost = await AsyncStorage.getItem('firstPost');
    this.setState({
      firstPost
    });
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const name = navigation.getParam('name');
    const handle = navigation.getParam('handle');
    const body = navigation.getParam('body');
    const nsfw = navigation.getParam('nsfw');
    const date = navigation.getParam('date');
    if (name) {
      await this.setState({
        id,
        name,
        nsfw,
        body,
        date,
        update: true
      });
      if (handle) {
        await this.setState({
          withInstagram: true
        });
      }
    }
  }
  render() {
    const { handle, body, firstPost } = this.state;
    return (
      <Container>
        <Content>
          <View style={styles.mainContent}>
            <Form>
              <Item>
                <Input
                  style={styles.input}
                  placeholder="Poem Title"
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                />
              </Item>
              <Item>
                <Textarea
                  style={styles.inputs}
                  rowSpan={5}
                  placeholder="Poem"
                  value={this.state.body}
                  onChangeText={text => this.setState({ body: text })}
                />
              </Item>
              {this.props.profile.isLoaded && this.props.profile.Instagram ? (
                <ListItem>
                  <CheckBox
                    color={'#000'}
                    checked={this.state.withInstagram}
                    onPress={this.withInstagram}
                  />
                  <Body>
                    <Text style={styles.check}>
                      Post as {this.props.profile.Instagram}
                    </Text>
                  </Body>
                </ListItem>
              ) : (
                <React.Fragment>
                  <AddInstagramModal />
                </React.Fragment>
              )}
              <ListItem>
                <CheckBox
                  color={'#000'}
                  checked={this.state.nsfw}
                  onPress={this.nsfw}
                />
                <Body>
                  <Text style={styles.check}>NSFW</Text>
                </Body>
              </ListItem>
              <Button
                style={styles.buttonIn}
                block
                light
                onPress={this.postToPoem}
              >
                {this.state.loading ? (
                  <ActivityIndicator color={'#fff'} />
                ) : null}
                <Text style={styles.labelIn}>Post Poem</Text>
              </Button>
              <Button
                block
                style={styles.buttonItself}
                bordered
                warning
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.button}>Cancel</Text>
              </Button>
            </Form>
          </View>
          <FirstPostModal openFirstModal={this.state.openFirstModal} />
        </Content>
      </Container>
    );
  }
}
let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  inputs: {
    fontSize: 16,
    width: screenWidth,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  labelIn: {
    color: '#fff',
    fontFamily: 'raleway-regular',
    fontSize: 16
  },
  buttonIn: {
    fontSize: 16,
    backgroundColor: '#91D9D9',
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  button: {
    fontSize: 16,
    fontFamily: 'raleway-regular',

    textAlign: 'center'
  },
  check: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  buttonItself: {
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  }
});
const mapStateToProps = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    { successfullyAddedPoem }
  )
)(PostPoem);
