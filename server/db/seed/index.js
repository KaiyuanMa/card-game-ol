const { conn } = require("../index");
const seedUser = require("./user");
const createAndSeedMatch = require("./match");
const createAndSeedFriend = require("./userFriend");

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });
    const user = await seedUser();
    await createAndSeedMatch(user);
    await createAndSeedFriend(user);
  } catch (ex) {
    next(ex);
  }
};

syncAndSeed();
