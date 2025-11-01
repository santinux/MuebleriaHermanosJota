import React, { useState } from "react";
import "../styles/App.css";
import { normalizeImageUrl } from "../utils/imageUtils";

const PaymentModal = ({ isOpen, onClose, cart, onClearCart }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "credit",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.precio || item.price || 0) * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular procesamiento de pago
    setTimeout(() => {
      alert("¡Pago procesado exitosamente!");
      onClearCart();
      onClose();
      setCurrentStep(1);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "credit",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    }, 2000);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h2>Proceder al Pago</h2>
          <button className="payment-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="payment-steps">
          <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
            <span className="step-number">1</span>
            <span className="step-label">Información Personal</span>
          </div>
          <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
            <span className="step-number">2</span>
            <span className="step-label">Método de Pago</span>
          </div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
            <span className="step-number">3</span>
            <span className="step-label">Confirmación</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          {/* Paso 1: Información Personal */}
          {currentStep === 1 && (
            <div className="payment-step">
              <h3>Información Personal</h3>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Dirección de Envío *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
            </div>
          )}

          {/* Paso 2: Método de Pago */}
          {currentStep === 2 && (
            <div className="payment-step">
              <h3>Método de Pago</h3>
              <div className="payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === "credit"}
                    onChange={handleInputChange}
                  />
                  <span>Tarjeta de Crédito</span>
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="debit"
                    checked={formData.paymentMethod === "debit"}
                    onChange={handleInputChange}
                  />
                  <span>Tarjeta de Débito</span>
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === "transfer"}
                    onChange={handleInputChange}
                  />
                  <span>Transferencia Bancaria</span>
                </label>
              </div>

              {(formData.paymentMethod === "credit" || formData.paymentMethod === "debit") && (
                <div className="card-details">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Número de Tarjeta *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Fecha de Vencimiento *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.paymentMethod === "transfer" && (
                <div className="transfer-info">
                  <h4>Datos para Transferencia</h4>
                  <p><strong>Banco:</strong> Banco de la Nación Argentina</p>
                  <p><strong>CBU:</strong> 01105995-20000000012345</p>
                  <p><strong>Titular:</strong> Mueblería Hermanos Jota S.A.</p>
                  <p><strong>Concepto:</strong> Compra de muebles - {formData.name}</p>
                </div>
              )}
            </div>
          )}

          {/* Paso 3: Confirmación */}
          {currentStep === 3 && (
            <div className="payment-step">
              <h3>Confirmación del Pedido</h3>
              <div className="order-summary">
                <h4>Resumen del Pedido</h4>
                <div className="order-items">
                  {cart.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={normalizeImageUrl(item.imagenUrl || item.image)} alt={item.nombre || item.name} />
                      <div className="item-details">
                        <h5>{item.nombre || item.name}</h5>
                        <p>Cantidad: {item.quantity}</p>
                        <p className="item-price">{formatPrice((item.precio || item.price || 0) * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <strong>Total: {formatPrice(getTotalPrice())}</strong>
                </div>
              </div>

              <div className="delivery-info">
                <h4>Información de Envío</h4>
                <p><strong>Dirección:</strong> {formData.address}</p>
                <p><strong>Teléfono:</strong> {formData.phone}</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </div>
            </div>
          )}

          <div className="payment-modal-actions">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                Anterior
              </button>
            )}
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary">
                Siguiente
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Confirmar Pago
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
