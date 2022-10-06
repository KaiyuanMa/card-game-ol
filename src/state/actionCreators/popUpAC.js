const setPopUp = (popUp) => {
  return async (dispatch) => {
    dispatch({ type: "SET_POPUP", popUp: popUp });
  };
};

export { setPopUp };
