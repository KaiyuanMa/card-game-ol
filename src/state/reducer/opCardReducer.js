const reducer = (state = { opCard: "" }, action) => {
  switch (action.type) {
    case "SET_OP_CARD":
      return { ...state, opCard: action.opCard };
    case "DEL_OP_CARD":
      return { ...state, opCard: "" };
    default:
      return state;
  }
};

export default reducer;
