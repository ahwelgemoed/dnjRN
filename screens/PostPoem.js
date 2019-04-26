import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import AddInstagramModal from '../components/AddInstagramModal';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { StyleSheet, Dimensions } from 'react-native';
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
      fontFamily: 'playfair-display-black',
      fontSize: 20
    }
  });
  state = {
    withInstagram: false,
    instagram: false,
    body: '',
    name: '',
    update: false,
    handle: '',
    date: Date.now()
  };

  withInstagram = () => {
    this.setState({
      withInstagram: !this.state.withInstagram
    });
  };
  upDateSave = async () => {};
  postToPoem = async () => {
    if (this.state.update) {
      const { firestore, auth } = this.props;
      const { id, date, body, name, handle, withInstagram } = this.state;
      let payLoad;
      if (withInstagram) {
        payLoad = {
          date,
          body,
          name,
          handle: this.props.profile.Instagram,
          uid: auth.uid
        };
      } else {
        payLoad = {
          date,
          body,
          name,
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
        });
    } else {
      const { firestore, auth } = this.props;
      const { date, body, name, handle, withInstagram } = this.state;
      let payLoad;
      if (withInstagram) {
        payLoad = {
          date,
          body,
          name,
          handle: this.props.profile.Instagram,
          uid: auth.uid
        };
      } else {
        payLoad = {
          date,
          body,
          name,
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
        });
    }
  };
  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    const name = navigation.getParam('name');
    const handle = navigation.getParam('handle');
    const body = navigation.getParam('body');
    if (name) {
      this.setState({
        id,
        name,
        body,
        update: true
      });
      if (handle) {
        this.setState({
          withInstagram: true
        });
      }
    }
  }
  render() {
    const { handle, body } = this.state;
    return (
      <Container>
        <Content>
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
                style={styles.input}
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
                  <Text>Post as {this.props.profile.Instagram}</Text>
                </Body>
              </ListItem>
            ) : (
              <React.Fragment>
                <AddInstagramModal />
              </React.Fragment>
            )}
            <Button block light onPress={this.postToPoem}>
              <Text style={styles.button}>Post Poem</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  },
  button: {
    fontSize: 16,
    color: '#868686',
    fontFamily: 'proxima-alt',
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
