const reducer = (state = { friends: [] }, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return { ...state, friends: action.friends };
    case "SET_STATUS":
      const dummy = state.friends;
      for (let friend of dummy) {
        if (friend.friendId == action.friendId) {
          friend.isOnline = action.status;
        }
      }
      return {
        ...state,
        friends: dummy,
      };
    case "ADD_FRIEND":
      return { ...state, friends: [...state.friends, action.friend] };
    default:
      return state;
  }
};

export default reducer;
