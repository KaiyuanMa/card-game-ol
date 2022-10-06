const express = require("express");
const router = express.Router();
const { Match } = require("../db");
const { isLoggedIn } = require("./middleware");

router.get("/getMatch", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await Match.findAll({
        where: {
          userId: req.user.id,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
