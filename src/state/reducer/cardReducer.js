const reducer = (state = { card: "" }, action) => {
  switch (action.type) {
    case "SET_CARD":
      return { ...state, card: action.card };
    case "DEL_CARD":
      return { ...state, card: "" };
    default:
      return state;
  }
};

export default reducer;
