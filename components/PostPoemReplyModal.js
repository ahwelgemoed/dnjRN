import React, { Component } from 'react';
import { Button, Text, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  CNRichTextView,
  getDefaultStyles
} from 'react-native-cn-richtext-editor';
import {
  StyledText,
  PoemName,
  StaticPills,
  StaticPillsText,
  InstagramText
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';
const defaultStyles = getDefaultStyles();
let customStyles = {
  ...defaultStyles,
  body: { fontSize: 16, fontFamily: 'raleway-regular' },
  heading: { fontSize: 18 },
  title: { fontSize: 20 },
  ol: { fontSize: 14 },
  bold: { fontSize: 16, fontFamily: 'raleway-bold' },
  ul: { fontSize: 12 }
};

var { height, width } = Dimensions.get('window');

class AppologiesModal extends Component {
  state = {
    showAppologiesModal: false
  };
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.showAppologiesModal !== prevProps.showAppologiesModal &&
      !this.state.showAppologiesModal
    ) {
      this.setState({
        showAppologiesModal: true
      });
    }
  }

  toggleModal = () => {
    this.setState({ showAppologiesModal: !this.state.showAppologiesModal });
  };

  render() {
    const { theme } = this.props;
    return (
      <View onPress={this.toggleModal}>
        <Modal
          style={{ borderRadius: height * 0.03, flex: 1 }}
          isVisible={this.state.showAppologiesModal}
          onBackdropPress={() => this.setState({ showAppologiesModal: false })}
        >
          <View
            style={{
              paddingTop: 8,
              backgroundColor: theme ? '#191919' : '#fff',
              width: width * 0.95,
              height: height * 0.8,
              alignSelf: 'center',
              top: height * 0.1,
              borderRadius: height * 0.03,
              alignItems: 'center'
            }}
          >
            <InstagramText> REPLYING TO </InstagramText>
            <ScrollView>
              <StyledText>
                <React.Fragment>
                  {this.props.poem.name ? (
                    <PoemName>{this.props.poem.name}</PoemName>
                  ) : null}
                  {this.props.poem.handle ? (
                    <InstagramText> {this.props.poem.handle}</InstagramText>
                  ) : (
                    <InstagramText>- ANON</InstagramText>
                  )}
                  <View>
                    <CNRichTextView
                      text={this.props.poem.body}
                      styleList={customStyles}
                      foreColor={'#474554'}
                      color={theme ? '#fff' : '#474554'}
                    />
                  </View>
                  <Row style={{ marginTop: 40 }}>
                    <React.Fragment>
                      <Col>
                        <StaticPills>
                          <StaticPillsText>
                            {moment.unix(this.props.poem.date).fromNow()}
                          </StaticPillsText>
                        </StaticPills>
                      </Col>
                    </React.Fragment>
                  </Row>
                </React.Fragment>
              </StyledText>
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.theme.isThemeDark
});
export default compose(
  firestoreConnect(),
  connect(
    mapStateToProps,
    {}
  )
)(AppologiesModal);
