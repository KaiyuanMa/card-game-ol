const axios = require("axios");

const apiGetUser = () => {
  return axios.get("/api/user", {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

const apiGetFriendInfo = (friendId) => {
  return axios.get(`/api/user/${friendId}`);
};

const getUserByUsername = (username) => {
  return axios.get(`/api/user/username/${username}`);
};

const apiChangeUserIcon = (icon) => {
  return axios.put(
    "/api/user/icon",
    { icon: icon },
    {
      headers: {
        authorization: window.localStorage.getItem("token"),
      },
    }
  );
};

export { apiGetUser, apiChangeUserIcon, apiGetFriendInfo, getUserByUsername };
