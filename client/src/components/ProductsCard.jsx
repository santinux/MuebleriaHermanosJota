import { Link } from "react-router-dom";
import { normalizeImageUrl } from "../utils/imageUtils";

const ProductCard = ({ product}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const imageUrl = normalizeImageUrl(product.imagenUrl || product.image);
  const productId = product.id || product._id;

  return (
    <div className="product-card">
      <Link
        to={`/products/${productId}`}
        className="product-link"
        style={{ cursor: "pointer" }}
      >
        <div className="product-image">
          <img src={imageUrl} alt={product.nombre || product.name} />
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
