import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      const message = action.payload;
      return message;
    },
    clearNotification() {
      const message = "";
      return message;
    },
  },
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(addNotification(content));
    const timeInMs = time * 1000;
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInMs);
  };
};

export default notificationSlice.reducer;
