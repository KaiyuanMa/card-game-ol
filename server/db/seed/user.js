const User = require("../User");

const _USERS = [
  {
    username: "userA",
    password: "userA",
    email: "userA@email.com",
    icon: "freddy.png",
  },
  {
    username: "userB",
    password: "userB",
    email: "userB@email.com",
    icon: "anonymous.png",
  },
  {
    username: "userC",
    password: "userC",
    email: "userC@email.com",
    icon: "jake.png",
  },
  {
    username: "userD",
    password: "userD",
    email: "userD@email.com",
    icon: "jake.png",
  },
];

const seedUser = async () => {
  try {
    const users = await Promise.all(_USERS.map((user) => User.create(user)));
    return users;
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = seedUser;
