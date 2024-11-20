import { Link } from "react-router-dom";
import { logout } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {loggedUser.name} logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Menu;
