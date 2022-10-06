const axios = require("axios");

const apiGetMatchHistory = () => {
  return axios.get("/api/match/getMatch", {
    headers: {
      authorization: window.localStorage.getItem("token"),
    },
  });
};

export { apiGetMatchHistory };
