const reducer = (state = { unreadMessages: [] }, action) => {
  switch (action.type) {
    case "SET_UNREAD":
      return { ...state, unreadMessages: action.unreadMessages };
    case "ADD_UNREAD":
      return {
        ...state,
        unreadMessages: [action.unreadMessage, ...state.unreadMessages],
      };
    case "DEL_UNREAD":
      console.log(action.friendId);
      console.log(action.messageType);
      return {
        ...state,
        unreadMessages: state.unreadMessages.filter(
          (UnreadMessage) =>
            action.friendId !== UnreadMessage.friendId &&
            action.messageType !== UnreadMessage.messageType
        ),
      };
    default:
      return state;
  }
};

export default reducer;
