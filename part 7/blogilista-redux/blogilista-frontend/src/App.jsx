import { useEffect, useRef } from "react";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/loginReducer";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
            <br /> <br />
          </>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
