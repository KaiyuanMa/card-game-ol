const setChatFriendAC = (chatFriend) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CHAT_FRIEND",
      chatFriend: chatFriend,
    });
  };
};

const printFriendAC = () => {
  return (dispatch) => {
    dispatch({
      type: "PRINT_FRIEND",
    });
  };
};

export { setChatFriendAC, printFriendAC };
