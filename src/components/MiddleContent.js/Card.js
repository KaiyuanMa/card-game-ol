import React from "react";

function Card(prop) {
  return (
    <button
      className="card"
      id={prop.id ? prop.id : null}
      onClick={() => (prop.handleClick ? prop.handleClick(prop.id) : null)}
    >
      {prop.id}
    </button>
  );
}
export default Card;
