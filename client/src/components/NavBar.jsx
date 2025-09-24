import React from "react";
import CartDropdown from "./CartDropdown";
import "../styles/App.css";

const NavBar = ({ actualPage, setActualPage, cart, onUpdateCart }) => {
  // Falta implementar el carrito de compras
  return (
    <div>
      <nav className="nav">
        {/* Logo y Titulo */}
        <div className="nav-container">
          <div className="nav-logo">
            <h1 onClick={() => setActualPage("home")}>Mueblería</h1>
            <span>Hermanos Jota</span>
          </div>

          {/* Ruteo de Navegación */}
          {/* Falta css para activar el link */}
          <ul className="nav-menu" id="nav-menu">
            <li>
              <a href="#" onClick={() => setActualPage("home")}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setActualPage("products")}>
                Productos
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setActualPage("contact")}>
                Contacto
              </a>
            </li>
          </ul>

          {/* Carrito de Compras */}
          <div className="nav-cart">
            <CartDropdown cart={cart} onUpdateCart={onUpdateCart} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
