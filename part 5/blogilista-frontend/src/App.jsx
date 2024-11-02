import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [refreshAllBlogs, setRefreshAllBlogs] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      initialBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(initialBlogs);
    });
  }, [refreshAllBlogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const blog = await blogService.create(blogObject);

      setBlogs(blogs.concat(blog));

      setMessage(`A new blog ${blog.title} by ${blog.author} added`);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(`Failed to add blog ${blogObject.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject);
      setMessage(`Blog ${updatedBlog.title} updated successfully`);

      setRefreshAllBlogs(!refreshAllBlogs);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage(`Failed to update blog ${blogObject.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      try {
        await blogService.remove(blogObject.id);
        setMessage(`Blog ${blogObject.title} removed successfully`);

        setRefreshAllBlogs(!refreshAllBlogs);

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch (exception) {
        setErrorMessage(`Failed to delete blog ${blogObject.title}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} errorMessage={errorMessage} />
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
            <br /> <br />
          </>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              username={user.username}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
