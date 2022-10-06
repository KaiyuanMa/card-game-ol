const conn = require("./conn");
const { Sequelize } = conn;

const Chat = conn.define("chat", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

module.exports = Chat;
