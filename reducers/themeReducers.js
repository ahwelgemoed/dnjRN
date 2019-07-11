const initialState = {
  isThemeDark: false,
  toggleSwipeMode: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'THEME_CHANGED':
      return {
        ...state,
        isThemeDark: action.payload
      };
    case 'TOGGLE_SWIPEMODE':
      return {
        ...state,
        toggleSwipeMode: action.payload
      };

    default:
      return state;
  }
}
