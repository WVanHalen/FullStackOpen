import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { setUser, removeUser } = loginSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const login = (content) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(content);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(setNotification(`Welcome ${user.username}`, 5));
    } catch (e) {
      console.log(e);
      dispatch(setNotification("Error: Wrong username or password", 5));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };
};

export default loginSlice.reducer;
