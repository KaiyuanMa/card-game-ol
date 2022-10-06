const express = require("express");
const router = express.Router();
const { Chat } = require("../db");
const { Message } = require("../db");
const { isLoggedIn } = require("./middleware");
const Op = require("Sequelize").Op;

const findChat = async (userId, friendId) => {
  return await Chat.findOne({
    where: {
      [Op.or]: [
        { userAId: userId, userBId: friendId },
        { userAId: friendId, userBId: userId },
      ],
    },
  });
};

router.get("/:friendId", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.friendId;
    const chat = await findChat(userId, friendId);
    if (chat) {
      const chatId = chat.id;
      res.send(await Message.findAll({ where: { chatId: chatId } }));
    } else res.send([]);
  } catch (ex) {
    next(ex);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const friendId = req.body.friendId;
    const chat = await findChat(userId, friendId);
    if (chat) {
      const chatId = chat.id;
      res.send(
        await Message.create({
          content: req.body.content,
          userId: req.user.id,
          chatId: chatId,
        })
      );
    } else {
      const newChat = await Chat.create({
        userAId: userId,
        userBId: friendId,
      });
      const newChatId = newChat.id;
      res.send(
        await Message.create({
          content: req.body.content,
          userId: req.user.id,
          chatId: newChatId,
        })
      );
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
