import React, { useEffect, useState } from "react";
import { apiGetFriendInfo, getUserByUsername } from "../../api/user";
import {
  addUnreadAC,
  deleteUnreadAC,
} from "../../state/actionCreators/unreadMessagesAC";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../../state/actionCreators/friendsAC";
import { apiAddFriend } from "../../api/friend";
import socket from "../../socket";

function AddFriend() {
  const dispatch = useDispatch();
  const [friendUsername, setFriendUsername] = useState("");
  const { unreadMessages } = useSelector((state) => state.unreadMessages);
  const { auth } = useSelector((state) => state.auth);
  const { friends } = useSelector((state) => state.friends);
  const [requestUsers, setRequestUsers] = useState("");

  const getUsersInfo = async (requests) => {
    let dummy = [];
    for (let request of requests) {
      const response = await apiGetFriendInfo(request.friendId);
      const user = response.data;
      user.requestId = request.id;
      dummy.push(user);
    }
    console.log(dummy);
    setRequestUsers(dummy);
  };

  useEffect(() => {
    const dummy = unreadMessages.filter(
      (message) => message.messageType == "friendRequest"
    );
    getUsersInfo(dummy);
  }, [unreadMessages]);

  useEffect(() => {
    socket.on("receiveFriendRequest", (friendId) => {
      dispatch(
        addUnreadAC({
          messageType: "friendRequest",
          userId: auth.id,
          friendId: friendId,
        })
      );
    });
    socket.on("receiveFriendRequestResponse", (friend) => {
      dispatch(
        addFriend({
          friendId: friend.id,
          icon: friend.icon,
          userId: auth.id,
          username: friend.username,
        })
      );
    });
  }, [socket]);

  const sendRequest = async (e) => {
    e.preventDefault();
    const response = await getUserByUsername(friendUsername);
    const friend = response.data;
    console.log(friend);
    console.log(friends);
    console.log(friends.find((element) => element.friendId == friend.id));
    if (
      response.data &&
      !friends.find((element) => element.friendId == friend.id)
    ) {
      socket.emit("sendFriendRequest", friend.id, auth.id);

      console.log(response.data);
    }
  };

  const handelClick = async (event, user) => {
    if (event == "add") {
      dispatch(
        addFriend({
          friendId: user.id,
          icon: user.icon,
          userId: auth.id,
          username: user.username,
        })
      );
      socket.emit("friendRequestResponse", user.id, {
        id: auth.id,
        icon: auth.icon,
        username: auth.username,
      });
    }
    dispatch(deleteUnreadAC(user.id, "friendRequest"));
  };

  return (
    <div className="add-friend polygon-border">
      <div>
        {requestUsers
          ? requestUsers.map((user) => (
              <div className="add-list-item">
                <p>{user.username}</p>
                <button onClick={() => handelClick("add", user)}>Add</button>
                <button onClick={() => handelClick("ignore", user)}>
                  Ignore
                </button>
              </div>
            ))
          : null}
      </div>
      <form className="add-friend-form" onSubmit={sendRequest}>
        <label>Friend Username</label>
        <input
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddFriend;
