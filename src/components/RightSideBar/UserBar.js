import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";
import UserSetting from "./UserSetting";
import ChatBox from "./ChatBox";
import { setChatFriendAC } from "../../state/actionCreators/chatFriendAC";
import { setUnreadAC } from "../../state/actionCreators/unreadMessagesAC";
import { setPopUp } from "../../state/actionCreators/popUpAC";

function UserBar() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  function carouselHelper() {
    const slides = document.querySelectorAll(".slide");
    const friendBtn = document.querySelector(".friend-slide-btn");
    const settingBtn = document.querySelector(".setting-slide-btn");
    const addBtn = document.querySelector(".add-slide-btn");

    friendBtn?.addEventListener("click", function () {
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - 0)}%)`;
      });
    });

    addBtn?.addEventListener("click", function () {
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - 1)}%)`;
      });
    });

    settingBtn?.addEventListener("click", function () {
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - 2)}%)`;
      });
    });
  }

  const iconPopup = () => {
    const iconPop = document.querySelector(".icon_popUp");
    const popUp = document.querySelector(".PopUpWrapper");
    iconPop.style.display = "flex";
    popUp.style.display = "flex";
  };

  function showChat() {
    const chatBtn = document.querySelector(".chat-btn");
    const chatBox = document.querySelector(".chat-box");
    chatBtn?.classList?.toggle("chat-btn-active");
    if (chatBtn?.classList?.contains("chat-btn-active")) {
      chatBox.style.width = "25rem";
      chatBox.style.border = "1px solid #a09b8c";
    } else {
      chatBox.style.width = "0rem";
      chatBox.style.border = "0";
      dispatch(setChatFriendAC({}));
    }
  }

  useEffect(() => {
    carouselHelper();
    dispatch(setUnreadAC());
  }, [auth]);

  return auth ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="user-bar"
    >
      <div className="user-wrapper">
        <div className="user-content-wrapper">
          <div className="icon-wrapper">
            <img
              onClick={() => dispatch(setPopUp("icon"))}
              src={`../../../public/icons/${auth.icon}`}
              className="user-icon"
            />
            <img className="user-status" />
          </div>
          <p className="user-username">{auth.username}</p>
        </div>
        <div className="user-menu">
          <span class="fa fa-gear icon setting-slide-btn"></span>
          <span class="fa fa-user-plus icon add-slide-btn"></span>
          <span class="fa fa-user icon friend-slide-btn"></span>
        </div>
      </div>
      <div className="slider">
        <div className="slide">
          <FriendList />
        </div>
        <div className="slide">
          <AddFriend />
        </div>
        <div className="slide">
          <UserSetting />
        </div>
      </div>
      <div className="user-tools">
        <button
          onClick={() => {
            showChat();
          }}
          class="fa fa-comment icon chat-btn"
        ></button>
        <ChatBox />
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </motion.div>
  ) : null;
}

export default UserBar;
