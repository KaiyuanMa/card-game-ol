import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000/";
const socket = socketIOClient(ENDPOINT);
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { setCard, deleteCard } from "../../state/actionCreators/cardAC";
import { setOpCard, deleteOpCard } from "../../state/actionCreators/opCardAC";
import { motion } from "framer-motion";

function InGame() {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const { card } = useSelector((state) => state.card);
  const { opCard } = useSelector((state) => state.opCard);
  const [room, setRoom] = useState("");
  const sendCard = () => {
    socket.emit("send_card", { card, room });
    setConfirm(true);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const animations = () => {
    let elementId = "";
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Digit1":
          elementId = "1";
          break;
        case "Digit2":
          elementId = "2";
          break;
        case "Digit3":
          elementId = "3";
          break;
        case "Digit4":
          elementId = "4";
          break;
        case "Digit5":
          elementId = "5";
          break;
        default:
          return;
      }
      const element = document.getElementById(elementId);
      element.style.backgroundColor = "red";
    });
    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "Digit1":
          elementId = "1";
          break;
        case "Digit2":
          elementId = "2";
          break;
        case "Digit3":
          elementId = "3";
          break;
        case "Digit4":
          elementId = "4";
          break;
        case "Digit5":
          elementId = "5";
          break;
        default:
          return;
      }
      const element = document.getElementById(elementId);
      element.style.backgroundColor = "white";
      elementId = "";
    });
    elementId = "";
    console.log(elementId);
  };

  const handleClick = (id) => {
    dispatch(setCard(id));
  };

  useEffect(() => {
    socket.on("receive_card", (data) => {
      dispatch(setOpCard(data.card));
    });
    animations();
  }, [socket]);

  useEffect(() => {
    if (confirm && opCard) {
      console.log("card:" + card);
      console.log(card - 1);
      console.log("opCard:" + opCard);
      let results = "";
      if (card - 1 == opCard || (card == 1 && opCard == 5)) {
        results = "win";
      } else if (card - 0 + 1 == opCard || (card == 5 && opCard == 1)) {
        results = "loss";
      } else results = "draw";
      alert(results);
      dispatch(deleteCard());
      dispatch(deleteOpCard());
      setConfirm(false);
    }
  }, [confirm, opCard]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="game"
    >
      <div className="board">
        <input
          placeholder="room number"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={() => joinRoom()}></button>
        <div className="board-half">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className="board-half">
          <Card id="1" handleClick={handleClick} />
          <Card id="2" handleClick={handleClick} />
          <Card id="3" handleClick={handleClick} />
          <Card id="4" handleClick={handleClick} />
          <Card id="5" handleClick={handleClick} />
          <button disabled={!card} onClick={() => sendCard()}>
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default InGame;
