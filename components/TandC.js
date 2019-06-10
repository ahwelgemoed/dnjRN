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
import { Modal, Dimensions, View, Alert, StyleSheet } from 'react-native';

class TandC extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Container>
            <Content>
              <View style={styles.mainContent}>
                <Text style={styles.name}>Dis Net Jy V 1.00</Text>
                <Text style={styles.handle}>
                  Copyright (c) 2019 A.H.Welgemoed
                </Text>
                <Text style={styles.body}>1. LICENSE</Text>
                <Text style={styles.bodys}>
                  By receiving, opening the file package, and/or using Dis Net
                  Jy V 1.00("Software") containing this software, you agree that
                  this End User User License Agreement(EULA) is a legally
                  binding and valid contract and agree to be bound by it. You
                  agree to abide by the intellectual property laws and all of
                  the terms and conditions of this Agreement.
                </Text>
                <Text style={styles.bodys}>
                  Unless you have a different license agreement signed by
                  A.H.Welgemoed your use of Dis Net Jy V 1.00 indicates your
                  acceptance of this license agreement and warranty. Subject to
                  the terms of this Agreement, A.H.Welgemoed grants to you a
                  limited, non-exclusive, non-transferable license, without
                  right to sub-license, to use Dis Net Jy V 1.00 in accordance
                  with this Agreement and any other written agreement with
                  A.H.Welgemoed. A.H.Welgemoed does not transfer the title of
                  Dis Net Jy V 1.00 to you; the license granted to you is not a
                  sale. This agreement is a binding legal agreement between
                  A.H.Welgemoed and the purchasers or users of Dis Net Jy V
                  1.00. If you do not agree to be bound by this agreement,
                  remove Dis Net Jy V 1.00 from your computer now and, if
                  applicable, promptly return to A.H.Welgemoed by mail any
                  copies of Dis Net Jy V 1.00 and related documentation and
                  packaging in your possession.
                </Text>
                <Text style={styles.body}>2. DISTRIBUTION</Text>
                <Text style={styles.bodys}>
                  Dis Net Jy V 1.00 and the license herein granted shall not be
                  copied, shared, distributed, re-sold, offered for re-sale,
                  transferred or sub-licensed in whole or in part except that
                  you may make one copy for archive purposes only. For
                  information about redistribution of Dis Net Jy V 1.00 contact
                  A.H.Welgemoed.
                </Text>
                <Text style={styles.body}>3. USER AGREEMENT</Text>
                <Text style={styles.bodys}>
                  3.1 Use Your license to use Dis Net Jy V 1.00 is limited to
                  the number of licenses purchased by you. You shall not allow
                  others to use, copy or evaluate copies of Dis Net Jy V 1.00.
                </Text>
                <Text style={styles.bodys}>
                  3.2 Use Restrictions You shall use Dis Net Jy V 1.00 in
                  compliance with all applicable laws and not for any unlawful
                  purpose. Without limiting the foregoing, use, display or
                  distribution of Dis Net Jy V 1.00 together with material that
                  is pornographic, racist, vulgar, obscene, defamatory,
                  libelous, abusive, promoting hatred, discriminating or
                  displaying prejudice based on religion, ethnic heritage, race,
                  sexual orientation or age is strictly prohibited. Each
                  licensed copy of Dis Net Jy V 1.00 may be used on one single
                  computer location by one user. Use of Dis Net Jy V 1.00 means
                  that you have loaded, installed, or run Dis Net Jy V 1.00 on a
                  computer or similar device. If you install Dis Net Jy V 1.00
                  onto a multi-user platform, server or network, each and every
                  individual user of Dis Net Jy V 1.00 must be licensed
                  separately. You may make one copy of Dis Net Jy V 1.00 for
                  backup purposes, providing you only have one copy installed on
                  one computer being used by one person. Other users may not use
                  your copy of Dis Net Jy V 1.00 . The assignment, sublicense,
                  networking, sale, or distribution of copies of Dis Net Jy V
                  1.00 are strictly forbidden without the prior written consent
                  of A.H.Welgemoed. It is a violation of this agreement to
                  assign, sell, share, loan, rent, lease, borrow, network or
                  transfer the use of Dis Net Jy V 1.00. If any person other
                  than yourself uses Dis Net Jy V 1.00 registered in your name,
                  regardless of whether it is at the same time or different
                  times, then this agreement is being violated and you are
                  responsible for that violation!
                </Text>
                <Text style={styles.bodys}>
                  3.3 Copyright Restriction This Software contains copyrighted
                  material, trade secrets and other proprietary material. You
                  shall not, and shall not attempt to, modify, reverse engineer,
                  disassemble or decompile Dis Net Jy V 1.00. Nor can you create
                  any derivative works or other works that are based upon or
                  derived from Dis Net Jy V 1.00 in whole or in part.
                  A.H.Welgemoed's name, logo and graphics file that represents
                  Dis Net Jy V 1.00 shall not be used in any way to promote
                  products developed with Dis Net Jy V 1.00 . A.H.Welgemoed
                  retains sole and exclusive ownership of all right, title and
                  interest in and to Dis Net Jy V 1.00 and all Intellectual
                  Property rights relating thereto. Copyright law and
                  international copyright treaty provisions protect all parts of
                  Dis Net Jy V 1.00, products and services. No program, code,
                  part, image, audio sample, or text may be copied or used in
                  any way by the user except as intended within the bounds of
                  the single user program. All rights not expressly granted
                  hereunder are reserved for A.H.Welgemoed.
                </Text>
                <Text style={styles.bodys}>
                  3.4 Limitation of Responsibility You will indemnify, hold
                  harmless, and defend A.H.Welgemoed , its employees, agents and
                  distributors against any and all claims, proceedings, demand
                  and costs resulting from or in any way connected with your use
                  of A.H.Welgemoed's Software. In no event (including, without
                  limitation, in the event of negligence) will A.H.Welgemoed ,
                  its employees, agents or distributors be liable for any
                  consequential, incidental, indirect, special or punitive
                  damages whatsoever (including, without limitation, damages for
                  loss of profits, loss of use, business interruption, loss of
                  information or data, or pecuniary loss), in connection with or
                  arising out of or related to this Agreement, Dis Net Jy V 1.00
                  or the use or inability to use Dis Net Jy V 1.00 or the
                  furnishing, performance or use of any other matters hereunder
                  whether based upon contract, tort or any other theory
                  including negligence. A.H.Welgemoed's entire liability,
                  without exception, is limited to the customers' reimbursement
                  of the purchase price of the Software (maximum being the
                  lesser of the amount paid by you and the suggested retail
                  price as listed by A.H.Welgemoed ) in exchange for the return
                  of the product, all copies, registration papers and manuals,
                  and all materials that constitute a transfer of license from
                  the customer back to A.H.Welgemoed.
                </Text>
                <Text style={styles.bodys}>
                  3.5 Warranties Except as expressly stated in writing,
                  A.H.Welgemoed makes no representation or warranties in respect
                  of this Software and expressly excludes all other warranties,
                  expressed or implied, oral or written, including, without
                  limitation, any implied warranties of merchantable quality or
                  fitness for a particular purpose.
                </Text>
                <Text style={styles.bodys}>
                  3.6 Governing Law This Agreement shall be governed by the law
                  of the South Africa applicable therein. You hereby irrevocably
                  attorn and submit to the non-exclusive jurisdiction of the
                  courts of South Africa therefrom. If any provision shall be
                  considered unlawful, void or otherwise unenforceable, then
                  that provision shall be deemed severable from this License and
                  not affect the validity and enforceability of any other
                  provisions.
                </Text>
                <Text style={styles.bodys}>
                  3.7 Termination Any failure to comply with the terms and
                  conditions of this Agreement will result in automatic and
                  immediate termination of this license. Upon termination of
                  this license granted herein for any reason, you agree to
                  immediately cease use of Dis Net Jy V 1.00 and destroy all
                  copies of Dis Net Jy V 1.00 supplied under this Agreement. The
                  financial obligations incurred by you shall survive the
                  expiration or termination of this license.
                </Text>
                <Text style={styles.body}>4. DISCLAIMER OF WARRANTY</Text>
                <Text style={styles.bodys}>
                  THIS SOFTWARE AND THE ACCOMPANYING FILES ARE SOLD "AS IS" AND
                  WITHOUT WARRANTIES AS TO PERFORMANCE OR MERCHANTABILITY OR ANY
                  OTHER WARRANTIES WHETHER EXPRESSED OR IMPLIED. THIS DISCLAIMER
                  CONCERNS ALL FILES GENERATED AND EDITED BY Dis Net Jy V 1.00
                  AS WELL.
                </Text>
                <Text style={styles.body}>5. CONSENT OF USE OF DATA</Text>
                <Text style={styles.bodys}>
                  You agree that A.H.Welgemoed may collect and use information
                  gathered in any manner as part of the product support services
                  provided to you, if any, related to Dis Net Jy V
                  1.00.A.H.Welgemoed may also use this information to provide
                  notices to you which may be of use or interest to you.
                </Text>
              </View>
            </Content>
          </Container>
          <Button
            block
            warning
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <Text>Close</Text>
          </Button>
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

let screenWidth = Dimensions.get('window').width - 20;
const styles = StyleSheet.create({
  button: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mainContent: {
    flex: 1,
    // alignItems: 'left',
    justifyContent: 'space-around',
    marginTop: 40,
    paddingLeft: 12,
    paddingRight: 12
  },
  body: {
    // width: screenWidth,
    fontFamily: 'raleway-regular',
    fontSize: 16,
    paddingBottom: 10,
    paddingTop: 10
  },
  bodys: {
    // width: screenWidth,
    fontFamily: 'raleway-regular',
    fontSize: 14,
    paddingBottom: 10,
    paddingTop: 10
  },
  buttonRed: {
    fontSize: 16,
    width: screenWidth,
    marginTop: 20,
    fontFamily: 'raleway-regular',
    textAlign: 'left',
    backgroundColor: '#FF5C5C'
  },
  name: {
    fontSize: 24,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  label: {
    fontSize: 16,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  handle: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'raleway-regular'
  },
  icon: {
    fontSize: 14,
    fontFamily: 'raleway-regular',
    textAlign: 'left'
  },
  mainButton: {
    fontSize: 16,
    marginTop: 20,
    width: screenWidth,
    fontFamily: 'raleway-regular',
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
