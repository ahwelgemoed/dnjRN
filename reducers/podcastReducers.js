const initialState = {
  podCast: null,
  selectedPodCast: null,
  allEps: null,
  playerStatus: false
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
    case 'OPENPLAYER':
      return {
        ...state,
        playerStatus: action.payload
      };
    case 'LISTENCLICKED':
      return {
        ...state,
        listenClicked: action.payload
      };
    default:
      return state;
  }
}
