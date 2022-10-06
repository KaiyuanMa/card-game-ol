import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/howToPlay">How to Play</NavLink>
      <NavLink to="/game">Game</NavLink>
    </div>
  );
}

export default NavBar;
