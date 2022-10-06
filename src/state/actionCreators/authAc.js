import { useDispatch } from "react-redux";
import { apiGetAuth, apiSetAuth } from "../../api/auth";
import { apiChangeUserIcon } from "../../api/user";
import { setPopUp } from "./popUpAC";

const login = (credentials) => {
  return async (dispatch) => {
    try {
      let response = await apiSetAuth(credentials);
      const token = response.data;
      window.localStorage.setItem("token", token);
      response = await apiGetAuth(token);
      const auth = response.data;
      dispatch({ type: "SET_AUTH", auth: auth });
    } catch (ex) {
      dispatch({ type: "SET_POPUP", popUp: "login" });
    }
  };
};

const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
  };
};

const exchangeToken = (currAuth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await apiGetAuth(token);
      const auth = response.data;
      if (currAuth.id !== auth.id) dispatch({ type: "SET_AUTH", auth: auth });
    }
  };
};

const changeIcon = (icon) => {
  return async (dispatch) => {
    await apiChangeUserIcon(icon);
    dispatch({
      type: "UPDATE_ICON",
      icon: icon,
    });
  };
};

export { login, logout, exchangeToken, changeIcon };
