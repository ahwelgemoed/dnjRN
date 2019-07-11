import { AsyncStorage } from 'react-native';
export const changePoem = payLoad => async dispatch => {
  await AsyncStorage.setItem('theme', JSON.stringify(payLoad));
  dispatch({
    type: 'THEME_CHANGED',
    payload: payLoad
  });
};
export const toggleSwipeMode = payLoad => async dispatch => {
  await AsyncStorage.setItem('swipe', JSON.stringify(payLoad));
  dispatch({
    type: 'TOGGLE_SWIPEMODE',
    payload: payLoad
  });
};
