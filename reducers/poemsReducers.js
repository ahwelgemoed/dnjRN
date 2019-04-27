const initialState = {
  addedPoem: false,
  activateDelete: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SUCCESSFULLYADDEDPOEM':
      return {
        ...state,
        addedPoem: action.payload
      };
    case 'ACTIVATEDELETE':
      return {
        ...state,
        activateDelete: action.payload
      };
    default:
      return state;
  }
}
