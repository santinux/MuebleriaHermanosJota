
import { useEffect, useState } from 'react'
import { getFeaturedProducts } from '../services/productServices';
import '../styles/App.css'
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext.jsx';
import Loading from '../components/Loading.jsx';
import Error from '../components/Error.jsx';


const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { setCurrentPage, loading, setLoading, error, setError } = useAppContext();
    useEffect(() => {
        setLoading(true);
        setError(false);
        console.log('🔄 Cargando productos destacados...');
        getFeaturedProducts().then(products => {
            console.log('✅ Productos destacados cargados:', products);
            console.log('📊 Cantidad de productos destacados:', products?.length);
            if (products && products.length > 0) {
                console.log('📦 Primer producto destacado:', products[0]);
            }
            setFeaturedProducts(products);
        }).catch(error => {
            setError(true);
            console.error('❌ Error loading featured products:', error);
        }).finally(() => {
            setLoading(false);
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
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h2>Muebles Artesanales de Calidad Superior</h2>
                        <p>Más de 30 años creando piezas únicas que combinan tradición artesanal con diseño moderno. Cada mueble cuenta una historia de dedicación y maestría.</p>
                        <Link to="/products" onClick={() => setCurrentPage("products")} className="btn btn-primary">Ver Catálogo</Link>
                    </div>
                    <div className="hero-image">
                        <img src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Muebles artesanales de madera" />
                    </div>
                </div>
            </section>
            <section className="featured-products">
                <div className="container">
                    <h2 className="section-title">Productos Destacados</h2>
                    <div className="products-grid" id="featured-products-grid">
                        {/* Productos destacados se cargarán aquí dinámicamente */}
                        {loading && <Loading message="Cargando productos destacados..." />}
                        {error && <Error message="Error al cargar los productos destacados. Por favor, intentá nuevamente más tarde." />}
                        {featuredProducts && featuredProducts.length > 0 &&
                            featuredProducts.slice(0, 6).map(product => (
                                <Link className="product-card" to={`/products/${product.id}`} key={product.id} onClick={() => setCurrentPage("products")}>
                                    <div className="product-image">
                                        <img src={product.imagenUrl || product.image} alt={product.nombre || product.name} />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.nombre || product.name}</h3>
                                        <p className="product-description">{product.descripcion || product.description}</p>
                                        <span className="product-price">{formatPrice(product.precio || product.price)}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    <div className="see-more-container">
                        <Link to="/products" onClick={() => setCurrentPage("products")} className="see-more-btn">
                            Ver más
                        </Link>
                    </div>
                </div>
            </section>
            <section className="about">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Nuestra Historia</h2>
                            <p>La familia Jota ha dedicado más de tres décadas al arte de la carpintería, creando muebles únicos que combinan la robustez de lo artesanal con líneas de diseño moderno.</p>
                            <p>Cada pieza es cuidadosamente elaborada con materiales de la más alta calidad, garantizando durabilidad y belleza que perdura a través del tiempo.</p>
                        </div>
                        <div className="about-image">
                            <img src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Taller de carpintería" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home