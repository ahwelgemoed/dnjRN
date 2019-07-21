import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { successfullyAddedPoem } from '../actions/poemsActions';
import { Icon, Button } from 'native-base';
import { StyledText, PoemName, PoemBodyText } from './Styles';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  CNRichTextView,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
import NewBookmark from './NewBookmark';
const defaultStyles = getDefaultStyles();
let customStyles = {
  ...defaultStyles,
  body: { fontSize: 16, fontFamily: 'raleway-regular' },
  heading: { fontSize: 18 },
  title: { fontSize: 20 },
  ol: { fontSize: 14 },
  ul: { fontSize: 12 }
};
class NewPoem extends Component {
  state = {
    open: false,
    userEdit: false,
    bookmarked: false,
    reportDialog: false,
    modalVisible: false
  };
  componentDidMount() {
    const { id } = this.props.poem;
    if (this.props.profile.bookmarks) {
      const found = this.props.profile.bookmarks.find(function(element) {
        return element === id;
      });
      if (found) {
        this.setState({
          bookmarked: true
        });
      }
    }
  }
  toggleBookMark = () => {
    this.setState({
      bookmarked: !this.state.bookmarked
    });
  };
  render() {
    return (
      <StyledText
        ref={ref => {
          this[`${this.props.poem.id}`] = ref;
        }}
      >
        <Row>
          <Col>
            <NewBookmark
              poemId={this.props.poem.id}
              bookmarkedCount={this.props.poem.bookmarkedCount}
              bookmarked={this.state.bookmarked}
              toggleBookMark={this.toggleBookMark}
            />

            <PoemName>{this.props.poem.name}</PoemName>
            {this.props.poem.richText ? (
              <View
                style={{
                  flex: 1
                }}
              >
                <CNRichTextView
                  text={this.props.poem.body}
                  styleList={customStyles}
                  foreColor={'#474554'}
                  color={'#474554'}
                />
              </View>
            ) : (
              <PoemBodyText>{this.props.poem.body}</PoemBodyText>
            )}
          </Col>
        </Row>
        {/* <Button
          onPress={() =>
            this.setState({
              open: !this.state.open
            })
          }
        >
          <Text>Open</Text>
        </Button> */}
        <Row style={!this.state.open ? { display: 'none' } : {}}>
          <Col>
            <PoemName>Options</PoemName>
            <Text>Bookmark</Text>
            <Text>Report</Text>
          </Col>
        </Row>
      </StyledText>
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
    { successfullyAddedPoem }
  )
)(NewPoem);
