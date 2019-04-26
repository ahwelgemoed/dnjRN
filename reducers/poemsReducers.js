const initialState = {
  addedPoem: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESSFULLYADDEDPOEM':
      return {
        ...state,
        addedPoem: action.payload
      };
    default:
      return state;
  }
}
