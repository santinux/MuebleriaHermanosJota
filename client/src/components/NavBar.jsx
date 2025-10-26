import { useState, useEffect } from "react";
import CartDropdown from "./CartDropDown";
import { Link } from "react-router-dom";
import "../styles/App.css";

const NavBar = ({ cart, onUpdateCart }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [actualPage, setActualPage] = useState("home");

    // Hacer scroll hacia arriba cuando cambie la página
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [actualPage]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleChangePage = (page) => {
        setActualPage(page);
        setIsMenuOpen(false); // Cerrar el menú al cambiar de página
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
                        <Link
                            to="/"
                            onClick={() => handleChangePage("home")}
                            className={actualPage === "home" ? "nav-link active" : "nav-link"}
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            onClick={() => handleChangePage("products")}
                            className={actualPage === "products" ? "nav-link active" : "nav-link"}
                        >
                            Productos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            onClick={() => handleChangePage("contact")}
                            className={actualPage === "contact" ? "nav-link active" : "nav-link"}
                        >
                            Contacto
                        </Link>
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
