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
      <NavBarView
        style={{
          marginTop: Platform.OS === 'android' ? 20 : 0,
          display: 'flex',
          width: '100%',
          height: 50,
          flexDirection: 'row',
          textAlign: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.0,
          elevation: 1
          // borderBottomWidth: 1,
          // borderBottomColor: '#D8D9D9'
        }}
      >
        <Col
          style={{
            width: '10%',
            marginLeft: 10
          }}
        >
          <DrawerText onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu" style={{ color: '#999' }} />
          </DrawerText>
        </Col>
        <Col>
          <NavBarHeaderText> {this.props.pageTitle} </NavBarHeaderText>
        </Col>
        <Col
          style={{
            width: '10%'
          }}
        >
          {this.props.leftComponent}
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
