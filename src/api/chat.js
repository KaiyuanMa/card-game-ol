const axios = require("axios");

const getChat = (friendId) => {
  return axios.get(`/api/chat/${friendId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const createMessage = (friendId, message) => {
  return axios.post(
    "/api/chat",
    { friendId: friendId, content: message },
    {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    }
  );
};

export { getChat, createMessage };
