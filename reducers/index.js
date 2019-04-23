import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import poemsReducers from './poemsReducers';

export default combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  poems: poemsReducers
});
