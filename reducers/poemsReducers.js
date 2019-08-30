const initialState = {
  addedPoem: false,
  activateDelete: false,
  audio_Upload_Status: 'LOADING'
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
    case 'AUDIO_ADDED':
      return {
        ...state,
        audio_Upload_Status: action.payload
      };
    default:
      return state;
  }
}
