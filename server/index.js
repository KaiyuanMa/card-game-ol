const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const port = process.env.PORT || 3000;
const UnreadMessage = require("./db/UnreadMessage");

const socketMap = new Map();

const server = http.createServer(app);
const io = socketIo(server);

const createUnreadMessage = async (messageType, userId, friendId) => {
  await UnreadMessage.create({
    messageType: messageType,
    userId: userId,
    friendId: friendId,
  });
};

io.on("connection", (socket) => {
  socket.on("getUserInfo", (userId, friends) => {
    socket.userId = userId;
    socket.friends = friends;
    socketMap.set(userId, socket.id);
    console.log("socket rooms: " + [...socketMap.values()]);
    for (let friend of friends) {
      if (socketMap.get(friend.friendId)) {
        console.log("sending to" + socketMap.get(friend.friendId));
        io.to(socketMap.get(friend.friendId)).emit("isOnline", userId, true);
      }
    }
    socket.on("onlineResponse", (userId, friendId) => {
      if (socketMap.get(friendId)) {
        io.to(socketMap.get(friendId)).emit("getOnlineResponse", userId);
      }
    });
    socket.on("sendMessage", (message, friendId, userId) => {
      if (socketMap.get(friendId)) {
        io.to(socketMap.get(friendId)).emit("receiveMessage", message, userId);
      } else {
        createUnreadMessage("message", friendId, userId);
      }
    });
    socket.on("sendFriendRequest", (userId, friendId) => {
      if (socketMap.get(userId)) {
        io.to(socketMap.get(userId)).emit("receiveFriendRequest", friendId);
      } else {
        createUnreadMessage("friendRequest", userId, friendId);
      }
    });
    socket.on("friendRequestResponse", (userId, friend) => {
      if (socketMap.get(userId)) {
        io.to(socketMap.get(userId)).emit(
          "receiveFriendRequestResponse",
          friend
        );
      }
    });
    socket.on("gameRequest", (userId, friendId, username) => {
      console.log(socketMap);
      if (socketMap.get(friendId)) {
        console.log("sending");
        io.to(socketMap.get(friendId)).emit(
          "receiveGameRequest",
          userId,
          username
        );
      }
    });
    socket.on("logOut", () => {
      logoutEvent(socket);
    });
  });
  socket.on("disconnect", () => {
    logoutEvent(socket);
  });
});

const logoutEvent = (socket) => {
  if (socket.friends) {
    for (let friend of socket.friends) {
      if (socketMap.get(friend.friendId)) {
        io.to(socketMap.get(friend.friendId)).emit(
          "isOnline",
          socket.userId,
          false
        );
      }
    }
    socketMap.delete(socket.userId);
  }
};

app.use(express.json());
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static("public"));
app.use("/api/session", require("./routes/session"));
app.use("/api/user", require("./routes/user"));
app.use("/api/match", require("./routes/match"));
app.use("/api/friend", require("./routes/friend"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/unreadMessage", require("./routes/unreadMessage"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const init = () => {
  server.listen(port, () => console.log(`listening on port ${port}`));
};

init();
