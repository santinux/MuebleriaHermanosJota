import { Navigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAppContext();

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

