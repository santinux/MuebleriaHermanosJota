
import React from 'react'

const NavBar = ({ actualPage, setActualPage }) => {
    // Falta implementar el carrito de compras
    return (
        <div>
            {/* Logo y Titulo */}
            <div>
                <h1 onClick={() => setActualPage('home')}>
                    <h1>Mueblería<br /><span>Hermanos Jota</span></h1>
                </h1>
            </div>

            <div>
                {/* Ruteo de Navegación */}
                <ul>
                    <li><a href="#" onClick={() => setActualPage('home')}>Inicio</a></li>
                    <li><a href="#" onClick={() => setActualPage('products')}>Productos</a></li>
                    <li><a href="#" onClick={() => setActualPage('contact')}>Contacto</a></li>
                </ul>
            </div>

            {/* Carrito de Compras */}
            <div className="nav-cart">
                <div className="cart-icon">
                    <span className="cart-count">{cartItemCount}</span>
                    🛒
                </div>
            </div>
        </div>
    )
}

export default NavBar