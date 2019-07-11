import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class MaintaninceComp extends Component {
  render() {
    return (
      <View style={styles.mainContent}>
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 250,
              height: 250
            }}
            source={this.state.animation}
            speed={this.state.speed}
            loop={true}
          />
        )}

        <Text
          style={{
            fontSize: 22,
            paddingTop: 10,
            width: '90%',
            fontFamily: 'raleway-bold',
            textAlign: 'center',
            color: '#fff'
          }}
        >
          Hey - Sorry We are doing some Maintenance come back soon - Read a book
          or something
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  flatlist: {
    flex: 1,
    display: 'flex',
    paddingTop: 20,
    justifyContent: 'center'
  }
});
