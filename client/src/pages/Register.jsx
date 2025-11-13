import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import "../styles/App.css";
import Toast from "../components/Toast";

const Register = () => {
    const navigate = useNavigate();
    const { register, setCurrentPage, loading } = useAppContext();
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.email || !formData.password) {
            setToastMessage('Por favor completa todos los campos');
            setToastType('error');
            setShowToast(true);
            return;
        }

        if (formData.password.length < 6) {
            setToastMessage('La contraseña debe tener al menos 6 caracteres');
            setToastType('error');
            setShowToast(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setToastMessage('Las contraseñas no coinciden');
            setToastType('error');
            setShowToast(true);
            return;
        }

        const result = await register({
            nombre: formData.nombre,
            email: formData.email,
            password: formData.password
        });
        
        if (result.success) {
            setToastMessage(result.message || 'Registro exitoso');
            setToastType('success');
            setShowToast(true);
            setCurrentPage('home');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            setToastMessage(result.message || 'Error al registrar usuario');
            setToastType('error');
            setShowToast(true);
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="login-card">
                    <h2 className="login-title">Crear Cuenta</h2>
                    <p className="login-subtitle">Regístrate para comenzar a comprar</p>
                    
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                placeholder="Tu nombre completo"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="tu@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Mínimo 6 caracteres"
                                minLength={6}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Repite tu contraseña"
                                minLength={6}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </form>

                    <p className="auth-link">
                        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                    </p>
                </div>
            </div>

            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default Register;

