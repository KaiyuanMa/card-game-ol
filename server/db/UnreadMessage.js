const conn = require("./conn");
const { Sequelize } = conn;

const UnreadMessage = conn.define("unreadMessage", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  messageType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = UnreadMessage;
