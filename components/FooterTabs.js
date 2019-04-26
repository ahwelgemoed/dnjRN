import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import styled from 'styled-components/native';

const FooterView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  shadow-opacity: 0.35;
  shadow-radius: 20px;
  border-radius: 20px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 0px;
  background: #fbfbfb;
  height: 10%;
`;
const FooterText = styled.Text`
  color: #999;
  flex-wrap: wrap;
  padding-top: 10px;
`;
export default class FooterTabs extends Component {
  state = {
    activeTab: 'Home'
  };
  changeTab = name => {
    this.setState({
      activeTab: name
    });
    this.props.navigation.navigate(name);
  };
  render() {
    const { activeTab } = this.state;
    const firstVisit = AsyncStorage.getItem('firstVisit');
    if (firstVisit) {
      return null;
    } else {
      return (
        <FooterView>
          <FooterText onPress={this.changeTab.bind(this, 'Home')}>
            {activeTab === 'Home' ? 'Home Active' : 'Home'}
          </FooterText>
          <FooterText onPress={this.changeTab.bind(this, 'Post')}>
            {activeTab === 'Post' ? 'Post Active' : 'Post'}
          </FooterText>
        </FooterView>
      );
    }
  }
}
