import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { NavBarHeaderText, NavBarView, DrawerText } from './Styles';
import { View, Text } from 'react-native';
import { Icon, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class TopNav extends Component {
  render() {
    return (
      <NavBarView
        style={{
          display: 'flex',
          width: '100%',
          height: 50,
          flexDirection: 'row',
          textAlign: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#D8D9D9'
        }}
      >
        <Col>{this.props.leftComponent}</Col>
        <Col>
          <NavBarHeaderText> {this.props.pageTitle} </NavBarHeaderText>
        </Col>
        <Col>
          <DrawerText onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu" style={{ color: '#999' }} />
          </DrawerText>
        </Col>
      </NavBarView>
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
