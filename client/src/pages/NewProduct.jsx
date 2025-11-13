import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import { createProduct } from "../services/productServices.js";
import "../styles/App.css";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import Toast from "../components/Toast";

const NewProduct = () => {
    // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    categoria: "",
    destacado: false,
    specifications: {}
  });

  const [specIds, setSpecIds] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();
  const { loading, setLoading, error, setError } = useAppContext();

  // Actualiza el estado al escribir en los campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Manejar cambios en especificaciones
  const handleSpecChange = (specId, field, value) => {
    const specs = Object.entries(form.specifications);
    const [key, oldValue] = specs[specId];
    
    if (field === 'key') {
      // Cambiar la clave
      const newSpecs = { ...form.specifications };
      delete newSpecs[key];
      newSpecs[value] = oldValue;
      setForm({ ...form, specifications: newSpecs });
    } else {
      // Cambiar el valor
      setForm({
        ...form,
        specifications: {
          ...form.specifications,
          [key]: value
        }
      });
    }
  };

  const handleRemoveSpec = (specId) => {
    const specs = Object.entries(form.specifications);
    const key = specs[specId][0];
    const newSpecs = { ...form.specifications };
    delete newSpecs[key];
    setForm({
      ...form,
      specifications: newSpecs
    });
    // Remover el ID de la lista
    setSpecIds(prev => prev.filter(id => id !== specId).map((_, idx) => idx));
  };

  const handleAddSpec = () => {
    const newSpecs = { ...form.specifications };
    const tempId = `__temp_${Date.now()}`;
    newSpecs[tempId] = "";
    setForm({ ...form, specifications: newSpecs });
    setSpecIds(prev => [...prev, prev.length]);
  };

  // Envia el producto al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const newProduct = await createProduct({
         ...form,
         precio: parseFloat(form.precio),
         stock: form.stock ? parseInt(form.stock) : 0
      });
      setLoading(false);
      
      // Mostrar toast de éxito
      setToastMessage('Producto creado exitosamente');
      setToastType('success');
      setShowToast(true);
      
      // Redirigir al producto creado después de un breve delay
      setTimeout(() => {
        const productId = newProduct.id || newProduct._id;
        navigate(`/products/${productId}`);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error("Error al crear producto:", err);
      
      // Mostrar toast de error
      setToastMessage('Error al crear el producto. Verificá los campos.');
      setToastType('error');
      setShowToast(true);
    }
  };


  return (
    <main className="new-product-page">
      <div className="container">
        <h2 className="section-title">Crear nuevo producto</h2>
        <p className="section-subtitle">Completá los campos para agregar un nuevo producto al catálogo.</p>

        <div className="new-product-form">
          {loading && <Loading />}

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="error-message full-width">
                Hubo un error al crear el producto. Verificá los campos o el servidor.
              </p>
            )}

            <div className="form-group">
              <label>Nombre:</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Precio:</label>
              <input name="precio" type="number" value={form.precio} onChange={handleChange} required />
            </div>

            <div className="form-group full-width">
              <label>Descripción:</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Stock:</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Categoría:</label>
              <input name="categoria" value={form.categoria} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Imagen URL:</label>
              <input name="imagenUrl" value={form.imagenUrl} onChange={handleChange} />
            </div>

            <div className="form-group full-width featured-group">
              <label>Destacado:</label>
              <label className="switch">
                <input 
                  name="destacado" 
                  type="checkbox" 
                  checked={form.destacado} 
                  onChange={handleChange} 
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Especificaciones */}
            <div className="specifications-section full-width">
              <label className="specifications-label">Especificaciones:</label>
              {Object.entries(form.specifications).map(([key, value], idx) => (
                <div key={specIds[idx]} className="spec-item">
                  <input
                    type="text"
                    placeholder="Clave (ej: Material)"
                    value={key.startsWith('__temp_') ? '' : key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-remove-spec"
                    onClick={() => handleRemoveSpec(idx)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn-add-spec"
                onClick={handleAddSpec}
              >
                + Agregar especificación
              </button>
            </div>

          </form>

            <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Crear producto
            </button>
            </div>
        </div>
      </div>

      {/* Toast de Notificación */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </main>
  );
};

export default NewProduct;
