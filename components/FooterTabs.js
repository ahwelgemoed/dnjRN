import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
const FooterView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  shadow-opacity: 0.35;
  shadow-radius: 20px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 0px 0px;
  background: #111111;
  height: 10%;
`;
const FooterText = styled.Text`
  color: white;
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
