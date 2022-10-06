import React from "react";

function LogInPopUp(prop) {
  return (
    <div className="login-popUp">
      Invalided Login Information
      <button
        onClick={() => {
          prop.handelClose();
        }}
      >
        X
      </button>
    </div>
  );
}

export default LogInPopUp;
