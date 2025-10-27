import { useEffect, useState } from "react";
import ProductCard from "../components/ProductsCard";
import "../styles/App.css";
import { getProductById } from "../services/productServices";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";

const ProductDetail = ({ allProducts, onProductClick }) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { id } = useParams();
  const { setCurrentPage, addToCart, error, setError, loading, setLoading } = useAppContext();

  // Cargar detalles del producto cuando cambie id
  useEffect(() => {
    setLoading(true);
    setError(false);
    getProductById(id).then(data => {
      setProduct(data);
      const relatedProducts = getRelatedProducts();
      setRelatedProducts(relatedProducts);
    }).catch(error => {
      console.error('Error loading product details:', error);
      setError(true);
    }).finally(() => {
      setLoading(false);
    });

  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  // Obtener productos relacionados (excluyendo el producto actual)
  const getRelatedProducts = () => {
    if (!allProducts || !product) return [];
    return allProducts
      .filter(p => p.id !== product.id)
      .slice(0, 4); // Mostrar máximo 4 productos relacionados
  };


  return (
    <>
      <section className="product-detail">
        <div className="container">
          <>
            <nav className="breadcrumb">
              <Link to="/" onClick={() => setCurrentPage("home")}>Inicio</Link>
              <Link to="/products" onClick={() => setCurrentPage("products")}>Productos</Link>
              {!error && product && <span id="breadcrumb-product">{product.name}</span>}
            </nav>
            {product && (
              <div className="product-container">
                <div className="product-detail-content">
                  <div className="product-detail-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-detail-info">
                    <h1>{product.name}</h1>
                    <div className="product-detail-price">
                      {formatPrice(product.price)}
                    </div>
                    <div className="product-detail-description">
                      <p>{product.description}</p>
                    </div>

                    <div className="product-specs">
                      <h3>Especificaciones</h3>
                      <ul>
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <li key={key}>
                              <span>{key}:</span>
                              <span>{value}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <button
                      className="btn btn-primary add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>

        </div>
      </section>

      {/* Productos Relacionados */}
      {product && relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <h2 className="section-title">Productos Relacionados</h2>
            <div className="products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      {error && (
        <Error message="Error al cargar los detalles del producto. Por favor, inténtelo de nuevo más tarde." />
      )}
      {loading && <Loading message="Cargando detalles del producto..." />}
    </>
  );
};

export default ProductDetail;
