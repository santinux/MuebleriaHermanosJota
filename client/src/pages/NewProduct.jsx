import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import { createProduct } from "../services/productServices.js";
import "../styles/App.css";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";

const NewProduct = () => {
    // Estado del formulario
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    categoria: "",
    destacado: false
  });

  const [success, setSuccess] = useState(false);
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

  // Envia el producto al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      await createProduct({
         ...form,
         precio: parseFloat(form.precio),
         stock: parseInt(form.stock),
         id: Date.now()
      });
      setLoading(false);
      setSuccess(true);
      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagenUrl: "",
        categoria: "",
        destacado: false
      });

    } catch (err) {
      setLoading(false);
      setError(true);
      console.error("Error al crear producto:", err);
    }
  };


  return (
    <main className="new-product-page">
      <div className="container">
        <h2 className="section-title">Crear nuevo producto</h2>
        <p className="section-subtitle">Completá los campos para agregar un nuevo producto al catálogo.</p>

        <div className="new-product-form">
          {loading && <Loading />}

            {success && (
              <div className="new-product-success">
                <h3>¡Producto creado con éxito!</h3>
                <p>Ya podés verlo en el catálogo.</p>
              </div>
            )}

          <form onSubmit={handleSubmit}>
            {error && (
              <p className="error-message">
                Hubo un error al crear el producto. Verificá los campos o el servidor.
              </p>
            )}

            <div className="form-group">
              <label>Nombre:</label>
              <input name="nombre" value={form.nombre} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Descripción:</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Precio:</label>
              <input name="precio" type="number" value={form.precio} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Stock:</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Imagen URL:</label>
              <input name="imagenUrl" value={form.imagenUrl} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Categoría:</label>
              <input name="categoria" value={form.categoria} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Destacado:</label>
              <input name="destacado" type="checkbox" checked={form.destacado} onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">Crear producto</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default NewProduct;
