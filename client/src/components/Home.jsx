
import { useEffect, useState } from 'react'
import { getFeaturedProducts } from '../../services/productServices';
import '../styles/App.css'


const Home = ({ setActualPage, handleSelectProduct }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    
    useEffect(() => {
        getFeaturedProducts().then(products => {
            
            setFeaturedProducts(products);
        }).catch(error => {
            console.error('Error loading featured products:', error);
        });
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(price);
    }

    return (
        <div>
            <section className="featured-products">
                <div className="container">
                    <h2 className="section-title">Productos Destacados</h2>
                    <div className="products-grid" id="featured-products-grid">
                        {/* Productos destacados se cargarán aquí dinámicamente */}
                        {featuredProducts.length > 0 ? 
                            featuredProducts.map(product => (
                                <a className="product-card" key={product.id} onClick={() => handleSelectProduct(product)}>
                                    <div className="product-image">
                                        <img src={'../../' + product.image} alt={product.name} />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-description">{product.description}</p>
                                        <span className="product-price">{formatPrice(product.price)}</span>
                                    </div>
                                </a>
                                
                                
                            )) : (
                            <div className="loading" id="loading">
                                <div className="loading-spinner"></div>
                                <p>Cargando productos destacados...</p>
                            </div>
                        )}
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
                        <img src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Muebles artesanales de madera" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home