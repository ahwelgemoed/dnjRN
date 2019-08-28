import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage, View } from 'react-native';
import { Container, Header, Content, Button, Icon, Text } from 'native-base';

import { Footer, FooterTab } from './Styles';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
    this.props.navigation.navigate(name);
  };
  render() {
    const { theme } = this.props;
    const { activeTab } = this.state;
    return (
      <Footer>
        {/* <FooterTab> */}
        <FooterTab vertical onPress={this.changeTab.bind(this, 'Home')}>
          Home
        </FooterTab>
        <FooterTab vertical onPress={this.changeTab.bind(this, 'Post')}>
          Post
        </FooterTab>
        {/* <FooterTab vertical onPress={this.changeTab.bind(this, 'Settings')}>
          Settings
        </FooterTab> */}
        {/* <View
          style={{ color: '#999' }}
          vertical
          onPress={this.changeTab.bind(this, 'Post')}
        >
          <Icon
            onPress={this.changeTab.bind(this, 'Post')}
            name="add"
            style={{ color: '#999' }}
          />
          <Text
            onPress={this.changeTab.bind(this, 'Post')}
            style={{ color: '#999' }}
          >
            Post
          </Text>
        </View> */}
        {/* <Button
            style={{ color: '#999' }}
            vertical
            onPress={this.changeTab.bind(this, 'Settings')}
          >
            <Icon name="settings" style={{ color: '#999' }} />
            <Text style={{ color: '#999' }}>Settings</Text>
          </Button> */}
        {/* </FooterTab> */}
      </Footer>
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
  connect(
    mapStateToProps,
    {}
  )
)(FooterTabs);
