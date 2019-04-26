import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import AddInstagramModal from '../components/AddInstagramModal';
import { successfullyAddedPoem } from '../actions/poemsActions';
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
  Body
} from 'native-base';

class PostPoem extends Component {
  static navigationOptions = {
    title: 'Post Poem'
  };
  state = {
    withInstagram: false,
    instagram: false,
    date: Date.now()
  };

  withInstagram = () => {
    this.setState({
      withInstagram: !this.state.withInstagram
    });
  };
  postToPoem = async () => {
    const { firestore, auth } = this.props;
    const { date, body, name, handle, withInstagram } = this.state;
    if (withInstagram) {
      const payLoad = {
        date,
        body,
        name,
        handle: this.props.profile.Instagram,
        uid: auth.uid
      };
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
    } else {
      const payLoad = {
        date,
        body,
        name,
        uid: auth.uid
      };
      await firestore.add(
        {
          collection: 'poems'
        },
        payLoad
      );
    }
  };
  render() {
    const { handle } = this.state;
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Poem Title</Label>
              <Input onChangeText={text => this.setState({ name: text })} />
            </Item>
            <Item>
              <Textarea
                rowSpan={5}
                placeholder="Poem"
                onChangeText={text => this.setState({ body: text })}
              />
            </Item>
            {this.props.profile.isLoaded && this.props.profile.Instagram ? (
              <ListItem>
                <CheckBox
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
              <Text>Post Poem</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
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
