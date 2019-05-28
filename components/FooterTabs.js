import React, { Component } from 'react';
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
export default class FooterTabs extends Component {
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
    const { activeTab } = this.state;
    return (
      // <Grid>
      // <FooterView>
      //   <Col onPress={this.changeTab.bind(this, 'Home')}>
      //     <FooterText style={activeTab === 'Home' ? styles.active : null}>
      //       Home
      //     </FooterText>
      //   </Col>
      //   <Col onPress={this.changeTab.bind(this, 'Post')}>
      //     <FooterText style={activeTab === 'Post' ? styles.active : null}>
      //       Post
      //     </FooterText>
      //   </Col>
      // </FooterView>
      <Footer>
        <FooterTab style={{ backgroundColor: '#efefef' }}>
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
