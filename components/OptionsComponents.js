import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { WebBrowser, Permissions } from 'expo';
import {
  StyledText,
  PoemName,
  OptionsListView,
  OptionsListText
} from './Styles';

class OptionsComponents extends Component {
  reportPoem = () => {
    const { firestore } = this.props;
    Alert.alert(
      'Are You Sure?',
      'If you accept you will report this poem for being inappropriate or against the T&C`s  ',
      [
        {
          text: 'Report',
          onPress: () =>
            firestore
              .update(
                { collection: 'poems', doc: this.props.poem.id },
                { reported: true }
              )
              .then(res => {
                this.setState({ modalVisible: !this.state.modalVisible });
              })
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };
  render() {
    return (
      <View style={!this.props.open ? { display: 'none' } : {}}>
        <Row>
          <Col>
            <PoemName>Options</PoemName>
            <OptionsListView>
              {this.props.children}
              <OptionsListText>Share</OptionsListText>
              <OptionsListText onPress={() => this.reportPoem()}>
                Report Poem as Inappropriate
              </OptionsListText>
            </OptionsListView>
          </Col>
        </Row>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.poems.activateDelete,
  theme: state.theme.isThemeDark
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    {}
  )
)(OptionsComponents);
