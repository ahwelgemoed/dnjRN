import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import poemsReducers from './poemsReducers';
import themeReducers from './themeReducers';
import podcastReducers from './podcastReducers';

export default combineReducers({
  theme: themeReducers,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  podcasts: podcastReducers,
  poems: poemsReducers
});
