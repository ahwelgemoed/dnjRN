import React from 'react';
import { StyleSheet, View, Modal, Text, Linking } from 'react-native';
import Lottie from 'lottie-react-native';
import wiggly from './data.json';
import { Button, Grid, Col } from 'native-base';
import { ScreenBackground, PoemName } from './styles';
import moment from 'moment';

export default class MorningModal extends React.Component {
  state = {
    animation: null,
    speed: 1,
    modalVisible: false
  };

  componentWillMount() {
    if (
      moment().format('HH:mm') > '02:00' &&
      moment().format('HH:mm') < '04:30'
    ) {
      setTimeout(() => {
        this.setModalVisible(true);
      }, 5000);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.modalVisible === true && prevState.modalVisible === false) {
      this._playAnimation();
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ScreenBackground style={styles.mainContent}>
            {this.state.animation && (
              <Lottie
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 400,
                  height: 400
                }}
                source={this.state.animation}
                speed={this.state.speed}
                loop={true}
              />
            )}

            <PoemName>
              It's past {moment().format('HH')}, You are probably somewhere
              between Insomnia, drunk and existential.
            </PoemName>
            <PoemName>Be kind to yourself</PoemName>
            <Grid style={{ paddingLeft: 12, paddingRight: 12 }}>
              <Col>
                <Button
                  style={styles.buttonIn}
                  block
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    Linking.openURL('http://api.whatsapp.com');
                  }}
                >
                  <Text style={styles.mwhatappText}>Whatsapp</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  style={styles.buttonIn}
                  block
                  light
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    this.props.navigation.navigate('Post');
                  }}
                >
                  <Text style={styles.mwhatappText}>Post Poem</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  style={styles.buttonIn}
                  block
                  warning
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.mwhatappText}>Read Poems </Text>
                </Button>
              </Col>
            </Grid>
          </ScreenBackground>
        </Modal>
        {/* <Button
          block
          light
          bordered
          style={styles.buttonUp}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.blueText}>Open</Text>
        </Button> */}
      </View>
    );
  }

  _changeSpeed = speed => {
    this.setState({ speed });
  };

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimation();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _stopAnimation = () => {
    this.animation.reset();
  };

  _loadAnimation = () => {
    this.setState({ animation: wiggly }, this._playAnimation);
  };
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12
  },
  buttonIn: {
    fontSize: 16,
    backgroundColor: '#474554',
    marginTop: 20,
    marginRight: 5,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mainButton: {
    fontSize: 16,
    marginTop: 20,
    marginRight: 5,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mwhatapp: {
    fontSize: 16,
    marginTop: 20,
    marginRight: 5,
    backgroundColor: '#25D366',
    borderColor: '#25D366',
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mwhatappText: {
    color: '#C2C2C2',
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  speedBtnContainer: {
    flexDirection: 'row'
  },
  margin: {
    height: 10
  },
  marginRight: {
    width: 5
  }
});
