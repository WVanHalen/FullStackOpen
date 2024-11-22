import { Link } from "react-router-dom";
import { logout } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Nav, Navbar, Button } from "react-bootstrap";
import "../Menu.css";

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
    <Navbar collapseOnSelect expand="lg" bg="myColor" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <span style={{ display: "inline-block", marginTop: "9px" }}>
            {loggedUser.name ? loggedUser.name : loggedUser.username} logged in
          </span>
          <Button
            variant="dark"
            onClick={handleLogout}
            style={{ display: "inline-block", marginLeft: "5px" }}
          >
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
