import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import CreateForm from "./components/CreateForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
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

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
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

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>

      <Notification message={message} errorMessage={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    <div>
      <h2>blogs</h2>

      <Notification message={message} errorMessage={errorMessage} />

      <>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <br /> <br />
      </>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  );
};

export default App;
