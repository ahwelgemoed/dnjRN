import React, { Component } from 'react';
import {
  Content,
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast
} from 'native-base';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  Modal,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet
} from 'react-native';

class TandC extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  saveInstagramHandle = () => {
    const { firestore } = this.props;
    const payLoad = {
      Instagram: this.state.Instagram
    };
    firestore
      .update({ collection: 'users', doc: this.props.auth.uid }, payLoad)
      .then(res => {
        Toast.show({
          text: 'Instagram Handle Added!',
          buttonText: 'Okay',
          position: 'top'
        });
        this.setState({ modalVisible: false });
      });
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <Container>
            <Content>
              <View style={{ marginTop: 40 }}>
                <Text>
                  Introduction These Website Standard Terms and Conditions
                  written on this webpage shall manage your use of our website,
                  "disnetjy.com" accessible at www."disnetjy.com". These Terms
                  will be applied fully and affect to your use of this Website.
                  By using this Website, you agreed to accept all terms and
                  conditions written in here. You must not use this Website if
                  you disagree with any of these Website Standard Terms and
                  Conditions. Minors or people below 18 years old are not
                  allowed to use this Website. Intellectual Property Rights
                  Other than the content you own, under these Terms,
                  "disnetjy.com" and/or its licensors own all the intellectual
                  property rights and materials contained in this Website. You
                  are granted limited license only for purposes of viewing the
                  material contained on this Website. Restrictions You are
                  specifically restricted from all of the following: publishing
                  any Website material in any other media; selling, sublicensing
                  and/or otherwise commercializing any Website material;
                  publicly performing and/or showing any Website material; using
                  this Website in any way that is or may be damaging to this
                  Website; using this Website in any way that impacts user
                  access to this Website; using this Website contrary to
                  applicable laws and regulations, or in any way may cause harm
                  to the Website, or to any person or business entity; engaging
                  in any data mining, data harvesting, data extracting or any
                  other similar activity in relation to this Website; using this
                  Website to engage in any advertising or marketing. Certain
                  areas of this Website are restricted from being access by you
                  and "disnetjy.com" may further restrict access by you to any
                  areas of this Website, at any time, in absolute discretion.
                  Any user ID and password you may have for this Website are
                  confidential and you must maintain confidentiality as well.
                  Your Content In these Website Standard Terms and Conditions,
                  "Your Content" shall mean any audio, video text, images or
                  other material you choose to display on this Website. By
                  displaying Your Content, you grant "disnetjy.com" a
                  non-exclusive, worldwide irrevocable, sub licensable license
                  to use, reproduce, adapt, publish, translate and distribute it
                  in any and all media. Your Content must be your own and must
                  not be invading any third-party’s rights. "disnetjy.com"
                  reserves the right to remove any of Your Content from this
                  Website at any time without notice. No warranties This Website
                  is provided "as is," with all faults, and "disnetjy.com"
                  express no representations or warranties, of any kind related
                  to this Website or the materials contained on this Website.
                  Also, nothing contained on this Website shall be interpreted
                  as advising you. Limitation of liability In no event shall
                  "disnetjy.com", nor any of its officers, directors and
                  employees, shall be held liable for anything arising out of or
                  in any way connected with your use of this Website whether
                  such liability is under contract. "disnetjy.com", including
                  its officers, directors and employees shall not be held liable
                  for any indirect, consequential or special liability arising
                  out of or in any way related to your use of this Website.
                  Indemnification You hereby indemnify to the fullest extent
                  "disnetjy.com" from and against any and/or all liabilities,
                  costs, demands, causes of action, damages and expenses arising
                  in any way related to your breach of any of the provisions of
                  these Terms. Severability If any provision of these Terms is
                  found to be invalid under any applicable law, such provisions
                  shall be deleted without affecting the remaining provisions
                  herein. Variation of Terms "disnetjy.com" is permitted to
                  revise these Terms at any time as it sees fit, and by using
                  this Website you are expected to review these Terms on a
                  regular basis. Assignment The "disnetjy.com" is allowed to
                  assign, transfer, and subcontract its rights and/or
                  obligations under these Terms without any notification.
                  However, you are not allowed to assign, transfer, or
                  subcontract any of your rights and/or obligations under these
                  Terms. Entire Agreement These Terms constitute the entire
                  agreement between "disnetjy.com" and you in relation to your
                  use of this Website, and supersede all prior agreements and
                  understandings. Governing Law & Jurisdiction These Terms will
                  be governed by and interpreted in accordance with the laws of
                  the State of South Africa (South African Bill of Rights), and
                  you submit to the non-exclusive jurisdiction of the state and
                  federal courts located in South Africa for the resolution of
                  any disputes.
                </Text>
                <Button
                  block
                  light
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text>Close</Text>
                </Button>
              </View>
            </Content>
          </Container>
        </Modal>
        <Button
          block
          transparent
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.button}>View T&C's</Text>
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'proxima-alt',
    textAlign: 'left'
  }
});
const mapStateToProps = state => ({
  auth: state.firebase.auth
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(TandC);
