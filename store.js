import { createStore, compose, applyMiddleware } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { reduxFirestore } from 'redux-firestore';
// const fbConfig = {
//   apiKey: 'AIzaSyCu119y-X_66vUOXixI9hCbTxjRx4zXPVM',
//   authDomain: 'disnetons.firebaseapp.com',
//   databaseURL: 'https://disnetons.firebaseio.com',
//   projectId: 'disnetons',
//   storageBucket: 'disnetons.appspot.com',
//   messagingSenderId: '554939781321'
// };
const fbConfig = {
  apiKey: 'AIzaSyBvirTMZcq_mBH_RLGpy3rbcgSRuZSTeJU',
  authDomain: 'disnetonsbackup.firebaseapp.com',
  databaseURL: 'https://disnetonsbackup.firebaseio.com',
  projectId: 'disnetonsbackup',
  storageBucket: 'disnetonsbackup.appspot.com',
  messagingSenderId: '168959021962',
  appId: '1:168959021962:web:cc04cf1f7bb344a3'
};
const rrfConfig = {
  userProfile: 'users',
  // presence: 'presence', // where list of online users is stored in database
  useFirestoreForProfile: true,
  enableRedirectHandling: false
};

firebase.initializeApp(fbConfig);
firebase.firestore();
const middleware = [thunk];

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
  applyMiddleware(...middleware)
)(createStore);

const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  devToolsEnhancer()
);
export default store;
