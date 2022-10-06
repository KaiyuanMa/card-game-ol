import { getUnread, deleteUnread, addUnread } from "../../api/unreadMessage";

const setUnreadAC = () => {
  return async (dispatch) => {
    try {
      const response = await getUnread();
      const unreadMessages = response.data;
      dispatch({ type: "SET_UNREAD", unreadMessages: unreadMessages });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const deleteUnreadAC = (friendId, messageType) => {
  return async (dispatch) => {
    try {
      await deleteUnread(friendId, messageType);
      dispatch({
        type: "DEL_UNREAD",
        friendId: friendId,
        messageType: messageType,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const addUnreadAC = (message) => {
  return async (dispatch) => {
    try {
      console.log(message);
      const response = await addUnread(message);
      const unreadMessage = response.data;
      dispatch({ type: "ADD_UNREAD", unreadMessage: unreadMessage });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export { setUnreadAC, deleteUnreadAC, addUnreadAC };
