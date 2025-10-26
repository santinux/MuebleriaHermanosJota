import React, { useState, useEffect } from "react";
import PaymentModal from "./PaymentModal";
import { useAppContext } from "../contexts/AppContext.jsx";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { cart,
        setItemQty,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
    } = useAppContext();

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Obtener total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Proceder al checkout
  const proceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    setIsOpen(false);
    setIsPaymentModalOpen(true);
  };

  // Limpiar carrito después del pago
  const handlePaymentSuccess = () => {
    clearCart();
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".cart-dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`cart-dropdown-container ${isOpen ? "open" : ""}`}>
      <div
        className="cart-icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        <span className="cart-count">{cartCount}</span>🛒
      </div>

      <div className={`cart-dropdown ${isOpen ? "show" : ""}`}>
        <div className="cart-dropdown-header">
          <h3 className="cart-dropdown-title">Carrito ({cartCount})</h3>
          <button
            className="cart-dropdown-close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="cart-dropdown-content">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-message">Tu carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-quantity-btn"
                      onClick={() => setItemQty(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">
                      {item.quantity}
                    </span>
                    <button
                      className="cart-item-quantity-btn"
                      onClick={() => setItemQty(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-dropdown-footer">
            <div className="cart-total">
              <span className="cart-total-label">Total:</span>
              <span className="cart-total-value">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <div className="cart-dropdown-actions">
              <button className="btn btn-secondary" onClick={clearCart}>
                Vaciar
              </button>
              <button className="btn btn-primary" onClick={proceedToCheckout}>
                Comprar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cart={cart}
        onClearCart={handlePaymentSuccess}
      />
    </div>
  );
};

export default CartDropdown;
