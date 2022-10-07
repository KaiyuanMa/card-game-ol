const reducer = (state = { InGameWith: "" }, action) => {
  switch (action.type) {
    case "SET_IN_GAME_WITH":
      return { ...state, InGameWith: action.InGameWith };
    case "EMPTY_IN_GAME_WITH":
      return { ...state, InGameWith: "" };
    default:
      return state;
  }
};

export default reducer;
