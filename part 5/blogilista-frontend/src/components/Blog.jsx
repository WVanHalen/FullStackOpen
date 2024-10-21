import { useState } from "react";

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

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
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(blog.id, blogObject);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br></br>
        {blog.likes}
        <button onClick={handleLike}>like</button>
        <br></br>
        {blog.user ? blog.user.name : ""}
        {blog.user && blog.user.username === user.username && (
          <div>
            <button style={deleteButtonStyle} onClick={handleDelete}>
              remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
