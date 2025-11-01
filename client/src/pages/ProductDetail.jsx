import { useEffect, useState } from "react";
import ProductCard from "../components/ProductsCard";
import "../styles/App.css";
import { getProductById, getAllProducts, deleteProduct } from "../services/productServices";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import { normalizeImageUrl } from "../utils/imageUtils";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const { id } = useParams();
  const navigate = useNavigate();
  const { setCurrentPage, addToCart, error, setError, loading, setLoading, isAdmin } = useAppContext();

  // Cargar todos los productos para productos relacionados
  useEffect(() => {
    getAllProducts().then(data => {
      setAllProducts(data);
    }).catch(error => {
      console.error('Error loading all products:', error);
    });
  }, []);

  // Cargar detalles del producto cuando cambie id
  useEffect(() => {
    setLoading(true);
    setError(false);
    getProductById(id).then(data => {
      setProduct(data);
    }).catch(error => {
      console.error('Error loading product details:', error);
      setError(true);
    }).finally(() => {
      setLoading(false);
    });

  }, [id]);

  // Actualizar productos relacionados cuando cambie el producto o allProducts
  useEffect(() => {
    if (product && allProducts.length > 0) {
      const productId = product.id || product._id;
      const related = allProducts
        .filter(p => (p.id || p._id) !== productId)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, allProducts]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  // Manejar eliminación de producto
  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      setShowConfirmModal(false);
      await deleteProduct(id);
      setLoading(false);
      
      // Mostrar toast de éxito
      setToastMessage('Producto eliminado exitosamente');
      setToastType('success');
      setShowToast(true);
      
      // Redirigir al catálogo después de un breve delay para ver el toast
      setTimeout(() => {
        navigate('/products');
        setCurrentPage('products');
      }, 1500);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      setLoading(false);
      setShowConfirmModal(false);
      
      // Mostrar toast de error
      setToastMessage('Error al eliminar el producto. Por favor, intenta nuevamente.');
      setToastType('error');
      setShowToast(true);
    }
  };

  // Traducir claves de especificaciones al español
  const translateSpecKey = (key) => {
    const translations = {
      'material': 'Material',
      'dimensions': 'Dimensiones',
      'finish': 'Acabado',
      'warranty': 'Garantía',
      'maxWeight': 'Peso máximo',
      'levels': 'Niveles',
      'size': 'Tamaño',
      'headboardHeight': 'Altura cabecero',
      'drawers': 'Cajones',
      'doors': 'Puertas',
      'shelves': 'Estantes',
      'capacity': 'Capacidad',
      'shape': 'Forma',
      'type': 'Tipo',
      'usage': 'Uso',
      'comfort': 'Comodidad',
      'ergonomics': 'Ergonomía',
      'upholstery': 'Tapizado',
      'mattress': 'Colchón',
      'weight': 'Peso',
      'diameter': 'Diámetro',
      'height': 'Altura',
      'length': 'Largo',
      'width': 'Ancho',
      'depth': 'Profundidad'
    };
    return translations[key] || key;
  };



  return (
    <>
      <section className="product-detail">
        <div className="container">
          <>
            <nav className="breadcrumb">
              <Link to="/" onClick={() => setCurrentPage("home")}>Inicio</Link>
              <Link to="/products" onClick={() => setCurrentPage("products")}>Productos</Link>
              {!error && product && <span id="breadcrumb-product">{product.nombre || product.name}</span>}
            </nav>
            {product && (
              <div className="product-container">
                <div className="product-detail-content">
                  <div className="product-detail-image">
                    <img src={normalizeImageUrl(product.imagenUrl || product.image)} alt={product.nombre || product.name} />
                  </div>
                  <div className="product-detail-info">
                    <h1>{product.nombre || product.name}</h1>
                    <div className="product-detail-price">
                      {formatPrice(product.precio || product.price)}
                    </div>
                    <div className="product-detail-description">
                      <p>{product.descripcion || product.description}</p>
                    </div>

                    <div className="product-specs">
                      <h3>Especificaciones</h3>
                      <ul>
                        {product.specifications && Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <li key={key}>
                              <span>{translateSpecKey(key)}:</span>
                              <span>{value}</span>
                            </li>
                          )
                        )}
                        {(!product.specifications || Object.keys(product.specifications).length === 0) && (
                          <li>No hay especificaciones disponibles</li>
                        )}
                      </ul>
                    </div>

                    <div className="product-actions">
                      {!isAdmin && (
                        <button
                          className="btn btn-primary add-to-cart-btn"
                          onClick={() => addToCart(product)}
                        >
                          Añadir al Carrito
                        </button>
                      )}
                      {isAdmin && (
                        <>
                          <Link
                            to={`/admin/editar-producto/${id}`}
                            className="btn btn-secondary"
                          >
                            ✏️ Editar Producto
                          </Link>
                          <button
                            className="btn btn-danger delete-btn"
                            onClick={handleDeleteClick}
                          >
                            🗑️ Eliminar Producto
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>

        </div>
      </section>

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar "${product?.nombre || product?.name}"? Esta acción no se puede deshacer.`}
      />

      {/* Toast de Notificación */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

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
