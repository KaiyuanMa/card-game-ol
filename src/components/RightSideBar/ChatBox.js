import React, { useEffect, useState } from "react";
import { getChat, createMessage } from "../../api/chat";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../socket";
import FriendListItem from "./FriendListItem";
import { addUnreadAC } from "../../state/actionCreators/unreadMessagesAC";

function ChatBox() {
  const dispatch = useDispatch();
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const { auth } = useSelector((state) => state.auth);
  const { chatFriend } = useSelector((state) => state.chatFriend);
  const [messageReceived, setMessageReceived] = useState("");
  const [friendId, setFriendId] = useState("");
  const { unreadMessages } = useSelector((state) => state.unreadMessages);

  const fetchChat = async (friendId) => {
    const response = await getChat(friendId);
    setChat(response.data);
  };

  const scrollbarHelp = () => {
    let chatMessages = document.querySelector(".chat-messages");
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const sendMessage = async (ev) => {
    ev.preventDefault();
    const response = await createMessage(chatFriend.friendId, message);
    if (response.status == 200)
      setChat((chat) => [...chat, { content: message, userId: auth.id }]);
    socket.emit("sendMessage", message, chatFriend.friendId, auth.id);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receiveMessage", (message, friendId) => {
      setMessageReceived(message);
      setFriendId(friendId);
    });

    if (messageReceived) {
      if (friendId == chatFriend.friendId) {
        console.log(chatFriend.friendId == friendId);
        setChat((chat) => [
          ...chat,
          { content: messageReceived, userId: friendId },
        ]);
      } else {
        for (let message of unreadMessages) {
          if (message.friendId == friendId && message.messageType == "message")
            return;
        }
        console.log("adding");
        dispatch(
          addUnreadAC({
            messageType: "message",
            userId: auth.id,
            friendId: friendId,
          })
        );
      }
    }
    setMessageReceived("");
    setFriendId("");
  }, [socket, friendId, chatFriend]);

  useEffect(() => {
    if (chatFriend.id) {
      fetchChat(chatFriend.friendId);
    }
  }, [chatFriend]);

  useEffect(() => {
    scrollbarHelp();
  }, [chat]);

  return chatFriend.id ? (
    <div className="chat-box">
      <div className="chat-content">
        <FriendListItem friend={chatFriend} />
        <div className="chat-messages">
          {chat[0]
            ? chat.map((message) => (
                <div
                  className={
                    message.userId == auth.id
                      ? "user-message message"
                      : "guest-message message"
                  }
                  id={message.id}
                >
                  {message.content}
                  <div
                    className={
                      message.userId == auth.id
                        ? "user-message-corner message-corner"
                        : "guest-message-corner message-corner"
                    }
                  />
                </div>
              ))
            : null}
        </div>
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button>send</button>
      </form>
    </div>
  ) : (
    <div className="chat-box"></div>
  );
}

export default ChatBox;
