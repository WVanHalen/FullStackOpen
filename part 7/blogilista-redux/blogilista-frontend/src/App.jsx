import { useEffect, useRef } from "react";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logout } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const Home = () => {
    return (
      <div>
        {!user ? (
          <LoginForm />
        ) : (
          <div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
            <BlogList />
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Menu />
      <h1>blog app</h1>
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
