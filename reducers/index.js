import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import poemsReducers from './poemsReducers';
import themeReducers from './themeReducers';

export default combineReducers({
  theme: themeReducers,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  poems: poemsReducers
});
