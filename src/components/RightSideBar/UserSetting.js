import React from "react";
import socket from "../../socket";
import { logout } from "../../state/actionCreators/authAc";
import { useDispatch, useSelector } from "react-redux";

function UserSetting() {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
    socket.emit("logOut");
  };
  return (
    <div className="user-setting polygon-border">
      UserSetting
      <button onClick={() => logOut()}>Logout</button>
    </div>
  );
}

export default UserSetting;
