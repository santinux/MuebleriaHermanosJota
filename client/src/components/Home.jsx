
import React from 'react'

const Home = ({setActualPage}) => {

    return (
        <div>
            <section className="featured-products">
            <div className="container">
                <h2 className="section-title">Productos Destacados</h2>
                <div className="products-grid" id="featured-products-grid">
                    {/* Productos destacados se cargarán aquí dinámicamente */}
                </div>
                <div className="loading" id="loading">
                    <div className="loading-spinner"></div>
                    <p>Cargando productos destacados...</p>
                </div>
            </div>
            </section>
            <section className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <h2>Muebles Artesanales de Calidad Superior</h2>
                    <p>Más de 30 años creando piezas únicas que combinan tradición artesanal con diseño moderno. Cada mueble cuenta una historia de dedicación y maestría.</p>
                    <button onClick={() => setActualPage('products')} className="btn btn-primary">Ver Catálogo</button>
                </div>
                <div className="hero-image">
                    <img src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Muebles artesanales de madera"/>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Home