import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  Content,
  Container,
  ListItem,
  Icon,
  CheckBox,
  Right,
  Switch,
  Left
} from 'native-base';
import AppologiesModal from '../AppologiesModal';
import AllItemsInTema from './AllItemsInTema';
import { InstagramText } from '../styles';

export default class TemaItem extends Component {
  state = { openReplyModal: false };
  toggleReplyHistory = () => {
    this.setState({
      openReplyModal: !this.state.openReplyModal
    });
  };
  render() {
    const { t, theme } = this.props;
    return (
      <React.Fragment>
        <AppologiesModal
          text={t.title}
          showAppologiesModal={this.state.openReplyModal}
        >
          <AllItemsInTema t={t} />
        </AppologiesModal>
        <Left>
          <InstagramText onPress={this.toggleReplyHistory}>
            {t.title}
          </InstagramText>
        </Left>
        <Right>
          <Icon
            name="arrow-forward"
            style={[theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' }]}
          />
        </Right>
      </React.Fragment>
    );
  }
}
