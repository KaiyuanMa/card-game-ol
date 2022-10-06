import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconPopUp from "./IconPopUp";
import LogInPopUp from "./LogInPopUp";
import { setPopUp } from "../../state/actionCreators/popUpAC";

function PopUp() {
  const dispatch = useDispatch();
  const { popUp } = useSelector((state) => state.popUp);

  const handelClose = () => {
    dispatch(setPopUp(""));
    const popUp = document.querySelector(".PopUpWrapper");
    popUp.style.display = "none";
  };

  const showPopUp = () => {
    const popUpWrapper = document.querySelector(".PopUpWrapper");
    if (popUp == "") return null;
    else {
      popUpWrapper.style.display = "flex";
      if (popUp == "icon") return <IconPopUp handelClose={handelClose} />;
      else if (popUp == "login")
        return <LogInPopUp handelClose={handelClose} />;
    }
  };
  return <div className="PopUpWrapper">{showPopUp()}</div>;
}

export default PopUp;
