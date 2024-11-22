import { useEffect } from "react";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div className="container">
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <Notification />
          <Menu />
          <h1>Blog app</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
