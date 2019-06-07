import { AsyncStorage } from 'react-native';
export const changePoem = payLoad => async dispatch => {
  await AsyncStorage.setItem('theme', JSON.stringify(payLoad));
  dispatch({
    type: 'THEME_CHANGED',
    payload: payLoad
  });
};
