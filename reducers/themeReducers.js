const initialState = {
  isThemeDark: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'THEME_CHANGED':
      return {
        ...state,
        isThemeDark: action.payload
      };

    default:
      return state;
  }
}
