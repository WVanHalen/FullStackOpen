import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === "") {
    return null;
  } else if (notification.includes("Error")) {
    return <Alert variant="danger">{notification}</Alert>;
  } else {
    return <Alert variant="success">{notification}</Alert>;
  }
};

export default Notification;
