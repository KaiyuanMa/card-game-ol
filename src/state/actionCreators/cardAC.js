const setCard = (card) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CARD",
      card: card,
    });
  };
};

const deleteCard = () => {
  return (dispatch) => {
    dispatch({
      type: "DEL_CARD",
    });
  };
};

export { setCard, deleteCard };
