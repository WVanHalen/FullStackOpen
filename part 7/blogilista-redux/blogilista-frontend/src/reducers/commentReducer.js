/*import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComment(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComment, appendComment } = commentSlice.actions;

export const initializeBlogs = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id);
    dispatch(setComment(comments));
  };
};

export const createComment = (id, content) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(id, content);
    dispatch(appendComment(newComment));
  };
};

export default commentSlice.reducer;
*/
