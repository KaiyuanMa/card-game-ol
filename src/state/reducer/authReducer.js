const reducer = (state = { auth: {} }, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, auth: action.auth };
    case "UPDATE_ICON":
      const dummy = state.auth;
      dummy.icon = action.icon;
      return { ...state, auth: dummy };
    default:
      return state;
  }
};

export default reducer;
