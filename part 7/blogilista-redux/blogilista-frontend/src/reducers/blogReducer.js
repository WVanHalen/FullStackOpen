import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          `A new blog ${newBlog.title} by ${newBlog.author} added`,
          5
        )
      );
    } catch (e) {
      console.log(e);
      dispatch(
        setNotification(`Error: Failed to add blog ${content.title}`, 5)
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotification(`Blog ${updatedBlog.title} updated successfully`, 5)
      );
    } catch (e) {
      console.log(e);
      dispatch(
        setNotification(`Error: Failed to update blog ${blog.title}`, 5)
      );
    }
  };
};

export const deleteBlog = (id, name) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(removeBlog(id));
      dispatch(setNotification(`Blog ${name} removed`, 5));
    } catch (e) {
      console.log(e);
      setNotification(`Error: Failed to delete blog ${name}`, 5);
    }
  };
};

export const addNewComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment);
      dispatch(updateBlog(updatedBlog));
      dispatch(setNotification("New comment added", 5));
    } catch (error) {
      dispatch(setNotification("Error: Failed to add a new comment", 5));
    }
  };
};

export default blogSlice.reducer;
