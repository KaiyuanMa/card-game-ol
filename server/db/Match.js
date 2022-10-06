const conn = require("./conn");
const { Sequelize } = conn;

const Match = conn.define("match", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  result: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  opponent: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Match;
