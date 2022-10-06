const axios = require("axios");

const getUnread = () => {
  return axios.get("/api/unreadMessage", {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const deleteUnread = (friendId, messageType) => {
  return axios.delete(`/api/unreadMessage/${friendId}/${messageType}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const addUnread = (unreadMessage) => {
  return axios.post("/api/unreadMessage/", unreadMessage, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export { getUnread, deleteUnread, addUnread };
