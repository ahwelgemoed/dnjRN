import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Poop, InstagramText } from '../Styles';
import { activeTema } from '../../actions/poemsActions';

class ActiveTemaCard extends Component {
  state = { Tema: null };
  async componentDidMount() {
    if (this.props.tema && !this.state.Tema) {
      const Tema = this.props.tema.find(active => {
        return active.isActive === true;
      });
      await this.setState({
        TEMA: Tema
      });
      this.props.activeTema(Tema);
    }
  }

  render() {
    const { theme, swipeMod, tema } = this.props;
    const { TEMA } = this.state;
    if (TEMA) {
      return (
        <View
          onPress={() =>
            this.props.navigation.navigate('Post', { comingForTema: true })
          }
        >
          <InstagramText
            style={{ textAlaign: 'center' }}
            onPress={() =>
              this.props.navigation.navigate('Post', { comingForTema: true })
            }
          >
            Huidige Tema : {TEMA.title}
          </InstagramText>
        </View>
      );
    } else {
      return <ActivityIndicator color={theme ? '#D8D9D9' : '#2C2D2D'} />;
    }
  }
}

export default compose(
  firestoreConnect(),
  connect(
    state => ({
      tema: state.firestore.ordered.tema,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark,
      swipeMode: state.theme.toggleSwipeMode
    }),
    { activeTema }
  )
)(ActiveTemaCard);
