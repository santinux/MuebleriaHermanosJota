import { Link } from "react-router-dom";

const ProductCard = ({ product}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-link"
        style={{ cursor: "pointer" }}
      >
        <div className="product-image">
          <img src={product.imagenUrl || product.image} alt={product.nombre || product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.nombre || product.name}</h3>
          <p className="product-description">{product.descripcion || product.description}</p>
          <span className="product-price">{formatPrice(product.precio || product.price)}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
