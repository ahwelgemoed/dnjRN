const initialState = {
  podCast: null,
  selectedPodCast: null,
  allEps: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'GETHUIDIG':
      return {
        ...state,
        podCast: action.payload
      };
    case 'SELECTEDPODCAST':
      return {
        ...state,
        selectedPodCast: action.payload
      };
    case 'ALLEPISODES':
      return {
        ...state,
        allEps: action.payload
      };
    default:
      return state;
  }
}
