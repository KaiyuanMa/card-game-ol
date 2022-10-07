import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { setFriends, setStatus } from "../../state/actionCreators/friendsAC";
import { useDispatch, useSelector } from "react-redux";
import FriendListItem from "./FriendListItem";

function FriendList() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friends);
  const [gameRequest, setGameRequest] = useState({});
  useEffect(() => {
    if (auth.id) {
      dispatch(setFriends());
    }
  }, [auth]);

  useEffect(() => {
    socket.on("isOnline", (userId, isOnline) => {
      dispatch(setStatus(userId, isOnline));
      socket.emit("onlineResponse", auth.id, userId);
    });
    socket.on("getOnlineResponse", (userId) => {
      dispatch(setStatus(userId, true));
    });
    socket.on("receiveGameRequest", (userId, username) => {
      setGameRequest({ userId: userId, username: username });
    });
  }, [socket]);

  const acceptRequest = () => {};

  console.log(gameRequest);

  return (
    <div className="friend-list polygon-border">
      {gameRequest.userId ? (
        <div className="game-request">
          <div className="game-request-header">Game Request</div>
          <div className="game-request-content">
            <div>{gameRequest.username}</div>
            <button>V</button>
            <button onClick={() => setGameRequest({})}>X</button>
          </div>
        </div>
      ) : null}
      {friends.map((friend) => (
        <FriendListItem friend={friend} isClick={true} />
      ))}
    </div>
  );
}

export default FriendList;
