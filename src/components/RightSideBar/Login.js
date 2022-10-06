import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { login, exchangeToken } from "../../state/actionCreators/authAc";
import { Navigate } from "react-router-dom";
import { setPopUp } from "../../state/actionCreators/popUpAC";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState("");
  const { auth } = useSelector((state) => state.auth);

  const onlineSetup = async () => {
    const response = await apiGetFriends();
    socket.emit("getUserInfo", auth.id, response.data);
  };

  useEffect(() => {
    if (auth.id) {
      onlineSetup();
      console.log("on Client");
    }
  }, [auth]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const credentials = { username: username, password: password };
    dispatch(login(credentials));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fullscreen center"
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <label>username</label>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label>password</label>
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>
    </motion.div>
  );
}

export default Login;
