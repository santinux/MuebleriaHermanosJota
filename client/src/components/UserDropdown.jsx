import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAppContext();

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".user-dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className={`user-dropdown-container ${isOpen ? "open" : ""}`}>
      <div
        className="user-icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        {user?.role === "admin" ? "⚙️" : "👤"}
      </div>

      <div className={`user-dropdown ${isOpen ? "show" : ""}`}>
        <div className="user-dropdown-header">
          <div className="user-info">
            <span className="user-name">{user?.nombre || user?.name}</span>
            <span className="user-role">{user?.role === "admin" ? "Administrador" : "Cliente"}</span>
          </div>
          <button
            className="user-dropdown-close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        
        <div className="user-dropdown-content">
          <Link
            to="/perfil"
            className="user-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <span className="item-icon">👤</span>
            <span className="item-text">Mi Perfil</span>
          </Link>
          <button
            className="user-dropdown-item logout-item"
            onClick={handleLogout}
          >
            <span className="item-icon">🚪</span>
            <span className="item-text">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;

