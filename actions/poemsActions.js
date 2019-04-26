export const successfullyAddedPoem = payLoad => async dispatch => {
  dispatch({
    type: 'SUCCESSFULLYADDEDPOEM',
    payload: payLoad
  });
};
