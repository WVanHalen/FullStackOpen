import { login } from "../reducers/loginReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.Username.value;
    const password = event.target.Password.value;
    const user = { username, password };
    dispatch(login(user));
    event.target.Username.value = "";
    event.target.Password.value = "";
    navigate("/");
  };

  return (
    <div>
      <h2>Log in to application</h2>

      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control data-testid="username" type="text" name="Username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            name="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
