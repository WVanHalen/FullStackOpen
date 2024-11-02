import { useState } from "react";

const Blog = ({ blog, username, updateBlog, deleteBlog }) => {
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
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(blogToUpdate);
  };

  const handleDelete = () => {
    deleteBlog(blog);
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
          {blog.user && blog.user.username === username && (
            <div>
              <button style={deleteButtonStyle} onClick={handleDelete}>
                remove
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
