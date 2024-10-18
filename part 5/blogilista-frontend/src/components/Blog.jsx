import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
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

  const addLike = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(blog.id, blogObject);
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
        <button onClick={addLike}>like</button>
        <br></br>
        {blog.user ? blog.user.name : ""}
      </div>
    </div>
  );
};

export default Blog;
