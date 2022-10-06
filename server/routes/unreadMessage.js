const express = require("express");
const router = express.Router();
const { UnreadMessage } = require("../db");
const { isLoggedIn } = require("./middleware");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await UnreadMessage.findAll({ where: { userId: req.user.id } }));
  } catch (ex) {
    next(ex);
  }
});

router.delete("/:friendId/:messageType", isLoggedIn, async (req, res, next) => {
  try {
    const unreadMessage = await UnreadMessage.findOne({
      where: {
        userId: req.user.id,
        friendId: req.params.friendId,
        messageType: req.params.messageType,
      },
    });
    if (unreadMessage) {
      if (unreadMessage.userId != req.user.id) {
        throw "error";
      }
      await unreadMessage.destroy();
    }
    res.send();
  } catch (ex) {
    next(ex);
  }
});

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    if (req.body.userId !== req.user.id) throw "error";
    console.log(req.body);
    res.status(201).send(await UnreadMessage.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
