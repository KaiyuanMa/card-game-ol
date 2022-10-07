const setInGameWithAC = (room) => {
  return (dispatch) => {
    dispatch({
      type: "SET_IN_GAME_WITH",
      room: room,
    });
  };
};

const leaveInGameWithAC = () => {
  return (dispatch) => {
    dispatch({
      type: "EMPTY_IN_GAME_WITH",
    });
  };
};

export { setInGameWithAC, leaveInGameWithAC };
