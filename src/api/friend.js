const axios = require("axios");

const apiGetFriends = () => {
  return axios.get("/api/friend", {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const apiGetFriend = (userFriendId) => {
  return axios.get(`/api/friend/${userFriendId}`, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const apiAddFriend = (friend) => {
  return axios.post("/api/friend/add/", friend, {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export { apiGetFriends, apiGetFriend, apiAddFriend };
