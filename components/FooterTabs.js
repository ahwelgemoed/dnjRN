import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text
} from 'native-base';
import styled from 'styled-components/native';
import { Col, Row, Grid } from 'react-native-easy-grid';

const FooterView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #efefef;
  height: 7%;
  padding-bottom: 10px;
`;
const FooterText = styled.Text`
  text-align: center;
  color: #999;
  flex-wrap: wrap;
  font-size: 16px;
  padding-top: 10px;
  font-family: 'raleway-bold';
  /* margin-bottom: 10px; */
`;
class FooterTabs extends Component {
  state = {
    // activeTab: 'Home',
    firstVisit: ''
  };
  async componentWillMount() {
    const firstVisit = await AsyncStorage.getItem('firstVisit');
    await this.setState({
      firstVisit
    });
  }
  changeTab = name => {
    // this.setState({
    //   activeTab: name
    // });
    this.props.navigation.navigate(name);
  };
  render() {
    const { theme } = this.props;
    const { activeTab } = this.state;
    return (
      <Footer>
        <FooterTab
          style={
            !theme
              ? {
                  backgroundColor: '#efefef'
                }
              : {
                  backgroundColor: '#232526'
                }
          }
        >
          <Button
            style={{ color: '#999' }}
            vertical
            onPress={this.changeTab.bind(this, 'Home')}
          >
            <Icon name="home" style={{ color: '#999' }} />
            <Text style={{ color: '#999' }}>Home</Text>
          </Button>
          <Button
            style={{ color: '#999' }}
            vertical
            onPress={this.changeTab.bind(this, 'Post')}
          >
            <Icon name="add" style={{ color: '#999' }} />
            <Text style={{ color: '#999' }}>Post</Text>
          </Button>
          {/* <Button
            style={{ color: '#999' }}
            vertical
            onPress={this.changeTab.bind(this, 'Settings')}
          >
            <Icon name="settings" style={{ color: '#999' }} />
            <Text style={{ color: '#999' }}>Settings</Text>
          </Button> */}
        </FooterTab>
      </Footer>
      // </Grid>
    );
  }
}
const styles = StyleSheet.create({
  active: {
    fontFamily: 'raleway-bold',
    fontSize: 16
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  admin: state.poems.activateDelete,
  theme: state.theme.isThemeDark
});
export default compose(
  connect(
    mapStateToProps,
    {}
  )
)(FooterTabs);
