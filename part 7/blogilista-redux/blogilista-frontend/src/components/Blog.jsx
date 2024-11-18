import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import { deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const dispatch = useDispatch();

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? "hide" : "view";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteButtonStyle = {
    backgroundColor: "royalblue",
    borderRadius: "6px",
  };

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog));
      dispatch(setNotification(`Blog ${blog.title} updated successfully`, 5));
    } catch (exception) {
      dispatch(
        setNotification(`Error: Failed to update blog ${blog.title}`, 5)
      );
    }
  };

  const handleDelete = () => {
    try {
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification(`Blog ${blog.title} removed`, 5));
    } catch (e) {
      setNotification(`Error: Failed to delete blog ${blog.title}`, 5);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        <span>{blog.title} </span>
        <span>{blog.author} </span>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      {visible && (
        <>
          {blog.url}
          <div>
            <span>likes {blog.likes}</span>
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : ""}</div>
          <div>
            <button style={deleteButtonStyle} onClick={handleDelete}>
              remove
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
