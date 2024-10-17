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

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null;
  } else if (message) {
    return (
      <div id="success" style={success}>
        {message}
      </div>
    );
  } else {
    return (
      <div id="failure" style={failure}>
        {errorMessage}
      </div>
    );
  }
};

export default Notification;
