import React from "react";
import "../styles/App.css";

const ProductDetail = ({ product, onExit, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };
  return (
    <>
      <section className="product-detail">
        <div className="container">
          <nav className="breadcrumb">
            <a onClick={() => onExit("home")}>{"Inicio > "}</a>
            <a onClick={() => onExit("products")}>{"Productos > "}</a>
            <span id="breadcrumb-product">{product.name}</span>
          </nav>
          {product && (
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
                          <span>
                            <strong>{key}:</strong>
                          </span>
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
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
