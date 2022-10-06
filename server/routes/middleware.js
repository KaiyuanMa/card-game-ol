const { User } = require("../db");

const isLoggedIn = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.headers.authorization);
    next();
  } catch (ex) {
    next(ex);
  }
};

// const chatVerify = async (req, res, next) => {
//   try {
//     const chat = await Chat.findByPk(req.body.chatId);
//     const chatUserAId = chat.userAID;
//     const chatUserBId = chat.userBID;
//     if (req.user.id != chatUserAId && req.user.id != chatUserBId) {
//       throw "error";
//     }
//   } catch (ex) {
//     next(ex);
//   }
// };

// const isFriend = async (req, res, next) => {
//   try {

//   } catch (ex) {
//     next(ex);
//   }
// };

module.exports = {
  isLoggedIn,
};
