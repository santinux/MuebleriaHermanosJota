import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext.jsx";
import "../styles/App.css";

const Login = () => {
    const navigate = useNavigate();
    const { login, setCurrentPage } = useAppContext();

    const handleLogin = (role) => {
        login({ 
            role, 
            name: role === 'admin' ? 'Administrador' : 'Cliente',
            email: `${role}@muebleria.com`
        });
        setCurrentPage('home');
        navigate('/');
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="login-card">
                    <h2 className="login-title">Mueblería Hermanos Jota</h2>
                    <p className="login-subtitle">Selecciona tu rol para acceder</p>
                    
                    <div className="login-options">
                        <button 
                            className="login-btn login-btn-client" 
                            onClick={() => handleLogin('client')}
                        >
                            <div className="login-icon">🛒</div>
                            <h3>Cliente</h3>
                            <p>Comprar productos</p>
                        </button>
                        
                        <button 
                            className="login-btn login-btn-admin" 
                            onClick={() => handleLogin('admin')}
                        >
                            <div className="login-icon">⚙️</div>
                            <h3>Administrador</h3>
                            <p>Gestionar productos</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

