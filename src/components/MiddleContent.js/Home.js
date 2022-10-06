import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fullscreen"
    >
      <h1>Home</h1>
      {/* {auth.id ? (
        <NavLink to="/user">User</NavLink>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
      <NavLink to="/howToPlay">How to Play</NavLink>
      <NavLink to="/game">Game</NavLink> */}
    </motion.div>
  );
}
export default Home;
