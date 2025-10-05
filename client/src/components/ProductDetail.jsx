import React, { useEffect } from "react";
import ProductCard from "./ProductsCard";
import "../styles/App.css";

const ProductDetail = ({ product, onExit, onAddToCart, allProducts, onProductClick }) => {
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

  const relatedProducts = getRelatedProducts();

  // Hacer scroll hacia arriba cuando se carga el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Función para manejar clic en producto relacionado
  const handleRelatedProductClick = (relatedProduct) => {
    // Subir el scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Llamar a la función de navegación
    onProductClick(relatedProduct);
  };
  return (
    <>
      <section className="product-detail">
        <div className="container">
          <nav className="breadcrumb">
            <a onClick={() => onExit("home")}>Inicio</a>
            <a onClick={() => onExit("products")}>Productos</a>
            <span id="breadcrumb-product">{product.name}</span>
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
                    onClick={() => onAddToCart(product)}
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Productos Relacionados */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="container">
            <h2 className="section-title">Productos Relacionados</h2>
            <div className="products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onProductClick={handleRelatedProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
