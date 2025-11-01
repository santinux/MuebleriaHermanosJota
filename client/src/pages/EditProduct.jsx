import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import { getProductById, updateProduct } from "../services/productServices.js";
import "../styles/App.css";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import Toast from "../components/Toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading, error, setError } = useAppContext();
  
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

  // Cargar datos del producto
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const product = await getProductById(id);
        const specs = product.specifications || {};
        setForm({
          nombre: product.nombre || "",
          descripcion: product.descripcion || "",
          precio: product.precio || "",
          stock: product.stock || "",
          imagenUrl: product.imagenUrl || "",
          categoria: product.categoria || "",
          destacado: product.destacado || false,
          specifications: specs
        });
        // Inicializar IDs únicos para cada especificación
        setSpecIds(Object.keys(specs).map((key, idx) => idx));
        setError(false);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id, setLoading, setError]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await updateProduct(id, {
        ...form,
        precio: parseFloat(form.precio),
        stock: form.stock ? parseInt(form.stock) : 0
      });
      setLoading(false);
      
      // Mostrar toast de éxito
      setToastMessage('Producto actualizado exitosamente');
      setToastType('success');
      setShowToast(true);
      
      // Redirigir al producto editado después de un breve delay
      setTimeout(() => {
        navigate(`/products/${id}`);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error("Error updating product:", err);
      
      // Mostrar toast de error
      setToastMessage('Error al actualizar el producto. Verificá los campos.');
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <main className="new-product-page">
      <div className="container">
        <h2 className="section-title">Editar Producto</h2>
        <p className="section-subtitle">Modificá los campos que desees actualizar.</p>

        <div className="new-product-form">
          {loading && <Loading />}

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="error-message full-width">
                Hubo un error al actualizar el producto. Verificá los campos o el servidor.
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
            <button type="button" className="btn btn-secondary" onClick={() => navigate(`/products/${id}`)}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Guardar Cambios
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

export default EditProduct;

