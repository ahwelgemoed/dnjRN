export const changePoem = payLoad => async dispatch => {
  dispatch({
    type: 'THEME_CHANGED',
    payload: payLoad
  });
};
