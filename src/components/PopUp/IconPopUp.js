import React, { useState } from "react";
import { useDispatch } from "react-redux";
import anonymous from "../../../public/icons/anonymous.png";
import freddy from "../../../public/icons/freddy.png";
import ironMan from "../../../public/icons/iron-man.png";
import jake from "../../../public/icons/jake.png";
import mario from "../../../public/icons/mario.png";
import peterson from "../../../public/icons/peterson.png";
import scream from "../../../public/icons/scream.png";
import simpson from "../../../public/icons/simpson.png";
import stormtrooper from "../../../public/icons/stormtrooper.png";
import walterWhite from "../../../public/icons/walter-white.png";
import { changeIcon } from "../../state/actionCreators/authAc";

function IconPopUp(prop) {
  const dispatch = useDispatch();
  const [iconSelected, setIconSelected] = useState("");
  const handelChange = (e) => {
    setIconSelected(e.target.value);
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(changeIcon(iconSelected));
  };

  return (
    <div className="icon_popUp">
      <form className="icon_form" onSubmit={handelSubmit}>
        <div className="icon_form_list" onChange={handelChange}>
          <input
            className="icon-input"
            type="radio"
            id="anonymous"
            name="iconSet"
            value="anonymous.png"
          />
          <label className="icon-label" for="anonymous">
            <img className="icon-radio" src={anonymous} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="freddy"
            name="iconSet"
            value="freddy.png"
          />
          <label className="icon-label" for="freddy">
            <img className="icon-radio" src={freddy} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="ironMan"
            name="iconSet"
            value="iron-man.png"
          />
          <label className="icon-label" for="ironMan">
            <img className="icon-radio" src={ironMan} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="jake"
            name="iconSet"
            value="jake.png"
          />
          <label className="icon-label" for="jake">
            <img className="icon-radio" src={jake} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="mario"
            name="iconSet"
            value="mario.png"
          />
          <label className="icon-label" for="mario">
            <img className="icon-radio" src={mario} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="peterson"
            name="iconSet"
            value="peterson.png"
          />
          <label className="icon-label" for="peterson">
            <img className="icon-radio" src={peterson} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="scream"
            name="iconSet"
            value="scream.png"
          />
          <label className="icon-label" for="scream">
            <img className="icon-radio" src={scream} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="simpson"
            name="iconSet"
            value="simpson.png"
          />
          <label className="icon-label" for="simpson">
            <img className="icon-radio" src={simpson} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="stormtrooper"
            name="iconSet"
            value="stormtrooper.png"
          />
          <label className="icon-label" for="stormtrooper">
            <img className="icon-radio" src={stormtrooper} />
          </label>
          <input
            className="icon-input"
            type="radio"
            id="walterWhite"
            name="iconSet"
            value="walter-white.png"
          />
          <label className="icon-label" for="walterWhite">
            <img className="icon-radio" src={walterWhite} />
          </label>
        </div>
        <button>set</button>
      </form>
      <button onClick={() => prop.handelClose()} className="icon_popUp_close">
        X
      </button>
    </div>
  );
}

export default IconPopUp;
