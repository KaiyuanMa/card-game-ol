import React, { useEffect } from "react";
import socket from "../../socket";
import { setFriends, setStatus } from "../../state/actionCreators/friendsAC";
import { useDispatch, useSelector } from "react-redux";
import FriendListItem from "./FriendListItem";

function FriendList() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friends);
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
  }, [socket]);

  return friends.length > 0 ? (
    <div className="friend-list polygon-border">
      {friends.map((friend) => (
        <FriendListItem friend={friend} isClick={true} />
      ))}
    </div>
  ) : null;
}

export default FriendList;
