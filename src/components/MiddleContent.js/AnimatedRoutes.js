import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "../RightSideBar/Login";
import HowToPlay from "./HowToPlay";
import Game from "./Game";
import InGame from "./InGame";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/howToPlay" element={<HowToPlay />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/inGame" element={<InGame />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
