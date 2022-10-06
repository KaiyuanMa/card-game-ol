import { apiAddFriend, apiGetFriends } from "../../api/friend";

const setFriends = () => {
  return async (dispatch) => {
    try {
      const response = await apiGetFriends();
      const friends = response.data;
      dispatch({ type: "SET_FRIENDS", friends: friends });
    } catch (ex) {
      console.log(ex);
    }
  };
};

const setStatus = (friendId, status) => {
  return (dispatch) => {
    dispatch({
      type: "SET_STATUS",
      friendId: friendId,
      status: status,
    });
  };
};

const addFriend = (friend) => {
  return async (dispatch) => {
    const response = await apiAddFriend(friend);
    dispatch({
      type: "ADD_FRIEND",
      friend: response.data,
    });
  };
};

export { setFriends, setStatus, addFriend };
