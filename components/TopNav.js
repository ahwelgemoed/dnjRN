import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  NavBarHeaderText,
  NavBarView,
  DrawerText,
  NavBarHeaderTextBig
} from './styles';
import { View, Text, Platform } from 'react-native';
import { Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class TopNav extends Component {
  render() {
    return (
      <Row
        style={{ height: 50, marginTop: Platform.OS === 'android' ? 40 : 0 }}
      >
        <Col style={{ width: '70%' }}>
          {this.props.pageTitle == 'DNJ' ? (
            <NavBarHeaderTextBig> {this.props.pageTitle} </NavBarHeaderTextBig>
          ) : (
            <NavBarHeaderText> {this.props.pageTitle} </NavBarHeaderText>
          )}
        </Col>
        <Col style={{ width: '15%' }}>{this.props.leftComponent}</Col>
        <Col style={{ width: '15%' }}>
          <DrawerText onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu" style={{ color: '#999' }} />
          </DrawerText>
        </Col>
      </Row>
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
)(TopNav);
