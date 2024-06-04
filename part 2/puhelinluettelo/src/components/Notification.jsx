const successStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const failureStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = ({ message }) => {
  if (message === null) return null;
  if (message.includes("Information") || message.includes("failed")) {
    return <div style={failureStyle}>{message}</div>;
  }
  return <div style={successStyle}>{message}</div>;
};

export default Notification;
