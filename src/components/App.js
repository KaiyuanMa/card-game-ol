import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import FriendBar from "./RightSideBar/UserBar";
import Login from "./RightSideBar/Login";
import { useDispatch, useSelector } from "react-redux";
import { exchangeToken } from "../state/actionCreators/authAc";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import MiddleContent from "./MiddleContent.js/MiddleContent";
import { apiGetFriends } from "../api/friend";
import PopUp from "./PopUp/PopUp";
import socket from "../socket";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  const onlineSetup = async () => {
    const response = await apiGetFriends();
    socket.emit("getUserInfo", auth.id, response.data);
  };

  useEffect(() => {
    if (auth.id) {
      onlineSetup();
    }
  }, [auth]);

  useEffect(() => {
    dispatch(exchangeToken(auth));
  }, [auth]);
  return (
    <div className="app">
      <PopUp />
      <LeftSideBar />
      <MiddleContent />
      <div className="right-side-bar">
        {auth.id ? <FriendBar /> : <Login />}
      </div>
    </div>
  );
}

export default App;
