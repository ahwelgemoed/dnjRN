import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
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
import { successfullyAddedPoem } from '../actions/poemsActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ScreenBackground } from '../components/Styles';
import { changePoem, toggleSwipeMode } from '../actions/themeActions';
import TopNav from '../components/TopNav';

class Settings extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTitle: (
      <TopNav
        pageTitle={'DNJ'}
        navigation={navigation}
        leftComponent={this.setLeftHeader}
      />
    )
    // headerTransparent: true,
  });
  toggleDarkMode = () => {
    this.props.changePoem(!this.props.theme);
  };
  toggleSwipeMode = () => {
    this.props.toggleSwipeMode(!this.props.swipeMode);
  };

  render() {
    const { theme } = this.props;
    return (
      <ScreenBackground style={styles.mainContent}>
        <TopNav pageTitle={'Settings'} navigation={this.props.navigation} />

        <View style={styles.mainContent}>
          <ListItem>
            <Left>
              <Icon
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.icons
                ]}
                name="moon"
              />
              <Text
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.label
                ]}
              >
                {' '}
                Dark Mode
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{
                  true: '#000',
                  false: '#ddd'
                }}
                value={this.props.theme}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                onValueChange={this.toggleDarkMode}
              />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Icon
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.icons
                ]}
                name="fastforward"
              />
              <Text
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.label
                ]}
              >
                {' '}
                Swipe Mode
              </Text>
            </Left>
            <Right>
              <Switch
                trackColor={{
                  true: '#000',
                  false: '#ddd'
                }}
                value={this.props.swipeMode}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                onValueChange={this.toggleSwipeMode}
              />
            </Right>
          </ListItem>
          <ListItem
            onPress={this.props.navigation.navigate.bind(this, 'Account')}
          >
            <Left>
              <Icon
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.icons
                ]}
                name="key"
              />
              <Text
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.label
                ]}
              >
                {' '}
                Account Page
              </Text>
            </Left>
            <Right>
              <Icon
                name="arrow-forward"
                style={[
                  theme ? { color: '#D8D9D9' } : { color: '#2C2D2D' },
                  styles.icons
                ]}
              />
            </Right>
          </ListItem>
        </View>
      </ScreenBackground>
    );
  }
}
export default compose(
  firestoreConnect(),
  connect(
    state => ({
      poems: state.firestore.ordered.poems,
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      addedPoem: state.poems.addedPoem,
      theme: state.theme.isThemeDark,
      swipeMode: state.theme.toggleSwipeMode
    }),
    { changePoem, toggleSwipeMode }
  )
)(Settings);

let screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    textAlign: 'left',
    width: screenWidth
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  },
  label: {
    fontSize: 14,
    fontFamily: 'raleway-extralight',
    textAlign: 'left'
  },
  labels: {
    fontSize: 10,
    fontFamily: 'raleway-extralight',
    textAlign: 'left'
  }
});
