const setOpCard = (card) => {
  return (dispatch) => {
    dispatch({
      type: "SET_OP_CARD",
      opCard: card,
    });
  };
};

const deleteOpCard = () => {
  return (dispatch) => {
    dispatch({
      type: "DEL_OP_CARD",
    });
  };
};

export { setOpCard, deleteOpCard };
