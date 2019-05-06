import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
  ScrollView
} from 'react-native';
import { Icon, Button, Row, Col, Badge, Toast, Text } from 'native-base';
import moment from 'moment';
import CardPoem from './CardPoem';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import AdminModal from './AdminModal';
import styled from 'styled-components/native';
import Dialog, {
  SlideAnimation,
  DialogContent
} from 'react-native-popup-dialog';
import { WebBrowser } from 'expo';
const StyledText = styled.View`
  shadow-opacity: 0.35;
  shadow-radius: 10px;
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 1px 1px;
  background: white;
  margin: 10px;
  /* width: 100%; */
  padding: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  /* display: none; */
`;

class HorisontalPoems extends Component {
  state = {
    userEdit: false
  };
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
                this.setState({ reportDialog: false });
                Toast.show({
                  text: 'Poem Reported to Admin',
                  buttonText: 'Okay',
                  position: 'bottom',
                  type: 'danger'
                });
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
  componentDidMount() {
    const now = moment();
    const posted = moment.unix(this.props.poem.date);
    const differ = now.diff(posted, 'minutes');

    if (this.props.profile.user === this.props.poem.uid && differ < 5) {
      this.setState({
        userEdit: true
      });
      let time = setInterval(() => {
        const now = moment();
        const posted = moment(this.props.poem.date);
        const differ = now.diff(posted, 'minutes');

        if (differ < 5) {
          this.setState({
            userEdit: true
          });
        } else {
          if (this.state.userEdit) {
            this.setState({
              userEdit: false
            });
          }
          clearInterval(time);
        }
      }, 30000);
    }
  }
  render() {
    return (
      <FlatList
        onContentSizeChange={(w, h) => (this.contentHeight = h)}
        onLayout={ev => (this.scrollViewHeight = ev.nativeEvent.layout.height)}
        pagingEnabled={true}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <CardPoem
            poem={this.props.poem}
            auth={this.props.auth}
            navigation={this.props.navigation}
          />
        }
        data={this.props.poems}
        horizontal={true}
        collapsable={false}
        ref="full"
        renderItem={({ item, i }) => (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={styles.flatview}
          >
            <Row>
              <Col>
                <Text style={styles.name}>Records for {item.name}</Text>
              </Col>
            </Row>
          </ScrollView>
        )}
      />
    );
  }
}
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.poems.activateDelete
});
export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(HorisontalPoems);

let screenWidth = Dimensions.get('window').width - 20;
let screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatview: {
    width: screenWidth,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // borderRadius: 5
  },
  name: {
    fontFamily: 'Proxima Nova Alt',
    fontSize: 30,
    textAlign: 'left'
    // paddingTop: 30
  },
  handle: {
    fontFamily: 'Proxima Nova Alt',
    fontSize: 16,
    textAlign: 'left'
    // paddingBottom: 10
  },
  body: {
    fontFamily: 'Lato-Light',
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10
  },
  icon: {
    fontSize: 14
  },
  date: {
    fontFamily: 'Lato-Light',
    fontSize: 12,
    textAlign: 'right',
    color: '#DCDCDC'
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    borderRadius: 5
  }
});
