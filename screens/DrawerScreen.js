import React, { Component } from 'react';
import { Content, Container } from 'native-base';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
// import { DrawerActions, DrawerItems, SafeAreaView } from 'react-navigation';
// import styles from '../../styles/index';

class DrawerScreen extends Component {
  changeTab = name => {
    this.props.navigation.navigate(name);
  };
  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Content>
            <View>
              <Text onPress={this.changeTab.bind(this, 'Home')}>Home</Text>
            </View>
            <View>
              <Text onPress={this.changeTab.bind(this, 'Post')}>Post</Text>
            </View>
            <View>
              <Text onPress={this.changeTab.bind(this, 'Account Settings')}>
                Contact
              </Text>
            </View>
          </Content>
        </Container>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  }
});

export default DrawerScreen;
