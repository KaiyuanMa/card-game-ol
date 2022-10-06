const UserFriend = require("../UserFriend");

const createAndSeedFriend = async (users) => {
  try {
    const friends = [
      {
        userId: users[0].id,
        friendId: users[1].id,
        username: users[1].username,
        icon: "anonymous.png",
      },
      {
        userId: users[0].id,
        friendId: users[2].id,
        username: users[2].username,
        icon: "jake.png",
      },
      {
        userId: users[1].id,
        friendId: users[2].id,
        username: users[2].username,
        icon: "jake.png",
      },
      {
        userId: users[1].id,
        friendId: users[0].id,
        username: users[0].username,
        icon: "freddy.png",
      },
      {
        userId: users[2].id,
        friendId: users[1].id,
        username: users[1].username,
        icon: "anonymous.png",
      },
      {
        userId: users[2].id,
        friendId: users[0].id,
        username: users[0].username,
        icon: "freddy.png",
      },
    ];
    await Promise.all(friends.map((friend) => UserFriend.create(friend)));
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedFriend;
