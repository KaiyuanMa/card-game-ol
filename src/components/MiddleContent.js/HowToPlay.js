import React from "react";
import { motion } from "framer-motion";
function HowToPlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fullscreen how-to-play-wrapper"
    >
      <h1>HOW TO PLAY</h1>
    </motion.div>
  );
}

export default HowToPlay;
