const reducer = (state = { chatFriend: {} }, action) => {
  switch (action.type) {
    case "SET_CHAT_FRIEND":
      return { ...state, chatFriend: action.chatFriend };
    case "PRINT_FRIEND":
      console.log(state);
      return state;
    default:
      return state;
  }
};

export default reducer;
