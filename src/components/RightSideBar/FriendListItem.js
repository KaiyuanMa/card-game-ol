import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatFriendAC } from "../../state/actionCreators/chatFriendAC";
import { deleteUnreadAC } from "../../state/actionCreators/unreadMessagesAC";

function FriendListItem(props) {
  const dispatch = useDispatch();
  const [isUnread, setIsUnread] = useState("");
  const friend = props.friend;
  const { unreadMessages } = useSelector((state) => state.unreadMessages);
  const handleFriendChange = (friend) => {
    dispatch(setChatFriendAC(friend));
    dispatch(deleteUnreadAC(friend.friendId, "message"));
    setIsUnread("");
    const chatBtn = document.querySelector(".chat-btn");
    if (!chatBtn?.classList?.contains("chat-btn-active")) {
      const chatBox = document.querySelector(".chat-box");
      chatBtn?.classList?.toggle("chat-btn-active");
      if (chatBtn?.classList?.contains("chat-btn-active")) {
        chatBox.style.width = "25rem";
        chatBox.style.border = "1px solid #a09b8c";
      } else {
        chatBox.style.width = "0rem";
        chatBox.style.border = "0";
      }
    }
  };

  useEffect(() => {
    for (let message of unreadMessages) {
      if (
        message.friendId == friend.friendId &&
        message.messageType == "message"
      ) {
        setIsUnread(" friend-username-unread");
      }
    }
  }, [unreadMessages]);

  return (
    <div
      className={
        props.isClick
          ? "friend-list-item friend-list-item-click"
          : "friend-list-item"
      }
      onClick={() => {
        props.isClick ? handleFriendChange(props.friend) : null;
      }}
    >
      <div className="icon-wrapper">
        <img
          src={`../../../public/icons/${friend.icon}`}
          className="friend-icon"
        />
        {friend.isOnline ? (
          <img className="friend-status online" />
        ) : (
          <img className="friend-status offline" />
        )}
      </div>
      <p
        className={
          props.isClick ? `friend-username${isUnread}` : "friend-username"
        }
      >
        {friend.username}
      </p>
    </div>
  );
}

export default FriendListItem;
