import React, { useEffect } from "react";
import "../styles/App.css";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type} show`}>
      <div className="toast-content">
        <span className="toast-icon">
          {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;

