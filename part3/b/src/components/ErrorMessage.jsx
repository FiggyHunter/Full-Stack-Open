import React from "react";

const ErrorMessage = ({ message, status }) => {
  const styles = {
    container: {
      paddingLeft: "1.5rem",
      color: status === "error" ? "red" : "green",
      backgroundColor: status === "error" ? "#FFAAB" : "#A1FFA1",
      border: status === "error" ? "2px solid red" : "2px solid green",
    },
  };

  return (
    <div style={styles.container}>
      <h1>{message}</h1>
    </div>
  );
};

export default ErrorMessage;
