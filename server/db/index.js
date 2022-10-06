const conn = require("./conn");
const User = require("./User");
const Match = require("./Match");
const Message = require("./Message");
const Chat = require("./Chat");
const UserFriend = require("./UserFriend");
const UnreadMessage = require("./UnreadMessage");

User.hasMany(Match);
User.hasMany(UserFriend);
User.hasMany(Chat, { foreignKey: "userAId" });
User.hasMany(Chat, { foreignKey: "userBId" });
User.hasMany(UnreadMessage, { foreignKey: "userId" });
User.hasMany(UnreadMessage, { foreignKey: "friendId" });
User.hasMany(Message);
Chat.hasMany(Message);

module.exports = {
  conn,
  User,
  Match,
  UserFriend,
  Chat,
  Message,
  UnreadMessage,
};
