const Match = require("../Match");

const createAndSeedMatch = async (users) => {
  try {
    const MATCHES = [
      { userId: users[0].id, result: "win", opponent: users[1].username },
      { userId: users[1].id, result: "lose", opponent: users[0].username },
      { userId: users[1].id, result: "win", opponent: users[2].username },
      { userId: users[2].id, result: "lose", opponent: users[1].username },
      { userId: users[2].id, result: "win", opponent: users[0].username },
      { userId: users[0].id, result: "lose", opponent: users[2].username },
    ];
    await Promise.all(MATCHES.map((match) => Match.create(match)));
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = createAndSeedMatch;
