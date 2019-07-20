import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavBarHeaderText, NavBarView, DrawerText } from './Styles';
import { View, Text, Platform } from 'react-native';
import { Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class TopNav extends Component {
  render() {
    return (
      <Row style={{ height: 50 }}>
        <Col>
          <NavBarHeaderText> {this.props.pageTitle} </NavBarHeaderText>
        </Col>
        <Col>
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
