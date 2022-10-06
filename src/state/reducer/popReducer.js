const reducer = (state = { popUp: "" }, action) => {
  switch (action.type) {
    case "SET_POPUP":
      return { ...state, popUp: action.popUp };
    default:
      return state;
  }
};

export default reducer;
