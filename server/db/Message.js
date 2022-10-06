const conn = require("./conn");
const { Sequelize } = conn;

const Message = conn.define("message", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Message;
