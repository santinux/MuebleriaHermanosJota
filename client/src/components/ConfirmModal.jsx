import React from "react";
import "../styles/App.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <div className="confirm-modal-icon">⚠️</div>
          <h2 className="confirm-modal-title">{title}</h2>
        </div>
        <div className="confirm-modal-body">
          <p className="confirm-modal-message">{message}</p>
        </div>
        <div className="confirm-modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

