import { useSelector } from "react-redux";

const success = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const failure = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === "") {
    return null;
  } else if (notification.includes("Error")) {
    return (
      <div className="failure" style={failure}>
        {notification}
      </div>
    );
  } else {
    return (
      <div className="success" style={success}>
        {notification}
      </div>
    );
  }
};

export default Notification;
