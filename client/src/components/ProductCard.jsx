import React from 'react';

const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <div 
        className="product-link"
        onClick={() => onProductClick(product)}
        style={{ cursor: 'pointer' }}
      >
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
      </div>
      <button 
        className="btn btn-primary add-to-cart-btn" 
        onClick={handleAddToCart}
      >
        Añadir al Carrito
      </button>
    </div>
  );
};

export default ProductCard;
