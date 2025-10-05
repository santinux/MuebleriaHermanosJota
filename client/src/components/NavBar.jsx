import React, { useState } from "react";
import CartDropdown from "./CartDropDown";
import "../styles/App.css";

const NavBar = ({ setActualPage, actualPage, cart, onUpdateCart }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (page) => {
        setActualPage(page);
        setIsMenuOpen(false);
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                {/* Logo y Titulo */}
                <div className="nav-logo" onClick={() => setActualPage("home")}>
                    <h1>Mueblería</h1>
                    <span>Hermanos Jota</span>
                </div>

                {/* Enlaces de Navegación */}
                <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("home");
                            }}
                            className={actualPage === "home" ? "nav-link active" : "nav-link"}
                        >
                            Inicio
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("products");
                            }}
                            className={actualPage === "products" ? "nav-link active" : "nav-link"}
                        >
                            Productos
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("contact");
                            }}
                            className={actualPage === "contact" ? "nav-link active" : "nav-link"}
                        >
                            Contacto
                        </a>
                    </li>
                </ul>

                {/* Carrito de Compras */}
                <div className="nav-cart">
                    <CartDropdown cart={cart} onUpdateCart={onUpdateCart} />
                </div>

                {/* Hamburger Menu */}
                <div className="nav-hamburger" onClick={toggleMenu}>
                    <div className={`hamburger-line ${isMenuOpen ? "active" : ""}`}></div>
                    <div className={`hamburger-line ${isMenuOpen ? "active" : ""}`}></div>
                    <div className={`hamburger-line ${isMenuOpen ? "active" : ""}`}></div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
