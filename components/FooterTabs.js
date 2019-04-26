import React, { Component } from 'react';
import { Text, StyleSheet, AsyncStorage } from 'react-native';
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
  background: #efefef;
  height: 10%;
`;
const FooterText = styled.Text`
  color: #999;
  flex-wrap: wrap;
  padding-top: 10px;
`;
export default class FooterTabs extends Component {
  state = {
    activeTab: 'Home',
    firstVisit: ''
  };
  async componentWillMount() {
    const firstVisit = await AsyncStorage.getItem('firstVisit');
    await this.setState({
      firstVisit
    });
  }
  changeTab = name => {
    this.setState({
      activeTab: name
    });
    this.props.navigation.navigate(name);
  };
  render() {
    const { activeTab } = this.state;
    if (this.state.firstVisit !== 'Yes') {
      return null;
    } else {
      return (
        <FooterView>
          <FooterText
            onPress={this.changeTab.bind(this, 'Home')}
            style={activeTab === 'Home' ? styles.active : null}
          >
            Home
          </FooterText>
          <FooterText
            onPress={this.changeTab.bind(this, 'Post')}
            style={activeTab === 'Post' ? styles.active : null}
          >
            Post
          </FooterText>
        </FooterView>
      );
    }
  }
}
const styles = StyleSheet.create({
  active: {
    fontFamily: 'raleway-bold',
    fontSize: 16
  }
});
