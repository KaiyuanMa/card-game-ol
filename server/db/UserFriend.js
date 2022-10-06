const conn = require("./conn");
const { Sequelize } = conn;

const UserFriend = conn.define("userFriend", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  friendId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  icon: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UserFriend;
