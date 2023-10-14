import "../index.css";
const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }
  const messageClass = error ? "error-message" : "success-message";
  return <div className={messageClass}>{message}</div>;
};

export default Notification;
