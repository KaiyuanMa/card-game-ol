const express = require("express");
const router = express.Router();
const { User, UserFriend } = require("../db");
const { isLoggedIn } = require("./middleware");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.user.id, {
        attributes: {
          exclude: ["password"],
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.params.userId, {
        attributes: ["id", "icon", "username"],
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.get("/username/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
      attributes: ["id", "icon"],
    });
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

router.put("/icon", isLoggedIn, async (req, res, next) => {
  try {
    await User.update({ icon: req.body.icon }, { where: { id: req.user.id } });
    await UserFriend.update(
      { icon: req.body.icon },
      { where: { friendId: req.user.id } }
    );
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
