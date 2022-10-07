import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import socket from "../../socket";

function Game() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { inGameWith } = useSelector((state) => state.inGameWith);
  const { friends } = useSelector((state) => state.friends);

  const sendGameRequest = (friendId) => {
    console.log(auth.id, friendId);
    socket.emit("gameRequest", auth.id, friendId, auth.username);
  };

  return inGameWith ? (
    <Navigate to="/inGame" />
  ) : auth.id ? (
    <div>
      {friends.map((friend) => {
        if (friend.isOnline)
          return (
            <div>
              <div>{friend.username}</div>
              <button onClick={() => sendGameRequest(friend.friendId)}>
                Invite
              </button>
            </div>
          );
        else return null;
      })}
    </div>
  ) : (
    <div></div>
  );
}

export default Game;
