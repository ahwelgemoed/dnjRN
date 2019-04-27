export const successfullyAddedPoem = payLoad => async dispatch => {
  dispatch({
    type: 'SUCCESSFULLYADDEDPOEM',
    payload: payLoad
  });
};
export const activateDeleteAction = payLoad => async dispatch => {
  dispatch({
    type: 'ACTIVATEDELETE',
    payload: payLoad
  });
};
