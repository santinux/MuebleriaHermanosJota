import { useState, useEffect } from "react";
import CartDropdown from "./CartDropDown";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { useAppContext } from "../contexts/AppContext.jsx";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { currentPage, setCurrentPage, cart, addToCart, cartCount, user, isAdmin, isAuthenticated, logout } = useAppContext();

    // Hacer scroll hacia arriba cuando cambie la página
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false); // Cerrar el menú al cambiar de página
    };

    return (
        <nav className="nav">
            <div className="nav-container">
                {/* Logo y Titulo */}
                <div className="nav-logo" onClick={() => setCurrentPage("home")}>
                    <h1>Mueblería</h1>
                    <span>Hermanos Jota</span>
                </div>

                {/* Enlaces de Navegación */}
                <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
                    <li>
                        <Link
                            to="/"
                            onClick={() => handleChangePage("home")}
                            className={currentPage === "home" ? "nav-link active" : "nav-link"}
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            onClick={() => handleChangePage("products")}
                            className={currentPage === "products" ? "nav-link active" : "nav-link"}
                        >
                            Productos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            onClick={() => handleChangePage("contact")}
                            className={currentPage === "contact" ? "nav-link active" : "nav-link"}
                        >
                            Contacto
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link
                                to="/admin/crear-producto"
                                onClick={() => handleChangePage("admin")}
                                className={currentPage === "admin" ? "nav-link active" : "nav-link"}
                            >
                                ➕ Crear Producto
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Carrito de Compras y Usuario - A la derecha */}
                <div className="nav-right">
                    {/* Carrito de Compras - Solo para clientes */}
                    {!isAdmin && (
                        <div className="nav-cart">
                            <CartDropdown cart={cart} onUpdateCart={addToCart} />
                        </div>
                    )}
                    
                    {/* Login o Usuario */}
                    {user ? (
                        <UserDropdown />
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => handleChangePage("login")}
                            className="nav-login-link"
                        >
                            🔐
                        </Link>
                    )}
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
