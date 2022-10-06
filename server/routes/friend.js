const express = require("express");
const router = express.Router();
const { UserFriend } = require("../db");
const { isLoggedIn } = require("./middleware");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await UserFriend.findAll({ where: { userId: req.user.id } }));
  } catch (ex) {
    next(ex);
  }
});
router.get("/:userFriendId", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await UserFriend.findByPk(req.params.userFriendId));
  } catch (ex) {
    next(ex);
  }
});
router.post("/add", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await UserFriend.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
