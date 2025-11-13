import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext.jsx";
import { getUserOrders } from "../services/orderService";
import "../styles/App.css";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Profile = () => {
    const { user, isAuthenticated } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadOrders = async () => {
            if (!user || !isAuthenticated) {
                setLoading(false);
                return;
            }
            
            setLoading(true);
            setError(false);
            setErrorMessage('');
            try {
                const response = await getUserOrders();
                if (response.success) {
                    setOrders(response.data || []);
                } else {
                    setError(true);
                    setErrorMessage(response.message || 'Error al cargar pedidos');
                }
            } catch (err) {
                console.error('Error al cargar pedidos:', err);
                setError(true);
                setErrorMessage(err.message || 'Error al cargar los pedidos. Por favor, intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [user, isAuthenticated]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusLabel = (status) => {
        const statusLabels = {
            pending: 'Pendiente',
            processing: 'En proceso',
            shipped: 'Enviado',
            delivered: 'Entregado',
            cancelled: 'Cancelado'
        };
        return statusLabels[status] || status;
    };

    if (!user || !isAuthenticated) {
        return (
            <main className="profile-page">
                <div className="container">
                    <h2 className="section-title">Mi Perfil</h2>
                    <div className="profile-error">
                        <p>Debes iniciar sesión para ver tu perfil.</p>
                    </div>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main className="profile-page">
                <div className="container">
                    <h2 className="section-title">Mi Perfil</h2>
                    <Loading />
                </div>
            </main>
        );
    }

    return (
        <main className="profile-page">
            <div className="container">
                <h2 className="section-title">Mi Perfil</h2>

                {error && (
                    <div className="profile-error-message">
                        <p>⚠️ {errorMessage}</p>
                    </div>
                )}

                <div className="profile-content">
                    <div className="profile-info">
                        <h3>Información Personal</h3>
                        <div className="profile-details">
                            <div className="profile-item">
                                <span className="profile-label">Nombre:</span>
                                <span className="profile-value">{user?.nombre || 'No disponible'}</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Email:</span>
                                <span className="profile-value">{user?.email || 'No disponible'}</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Rol:</span>
                                <span className="profile-value">
                                    {user?.role === 'admin' ? '👑 Administrador' : '👤 Cliente'}
                                </span>
                            </div>
                            {user?.createdAt && (
                                <div className="profile-item">
                                    <span className="profile-label">Miembro desde:</span>
                                    <span className="profile-value">
                                        {formatDate(user.createdAt)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profile-orders">
                        <h3>Mis Pedidos ({orders.length})</h3>
                        {orders.length === 0 ? (
                            <div className="no-orders">
                                <p>🛒 No tienes pedidos aún</p>
                                <p className="no-orders-hint">Cuando realices una compra, aparecerá aquí.</p>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {orders.map((order) => (
                                    <div key={order._id} className="order-card">
                                        <div className="order-header">
                                            <div>
                                                <span className="order-id">Pedido #{order._id.slice(-8).toUpperCase()}</span>
                                                <span className="order-date">📅 {formatDate(order.createdAt)}</span>
                                            </div>
                                            <div className="order-status">
                                                <span className={`status-badge status-${order.status}`}>
                                                    {getStatusLabel(order.status)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="order-items">
                                            <h4 className="order-items-title">Productos:</h4>
                                            {order.items && order.items.length > 0 ? (
                                                order.items.map((item, idx) => (
                                                    <div key={idx} className="order-item">
                                                        <span className="item-name">{item.nombre || 'Producto sin nombre'}</span>
                                                        <span className="item-quantity">x{item.cantidad || 1}</span>
                                                        <span className="item-price">
                                                            {formatPrice((item.precio || 0) * (item.cantidad || 1))}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="no-items">No hay productos en este pedido</p>
                                            )}
                                        </div>
                                        {order.shippingInfo && (
                                            <div className="order-shipping">
                                                <h4 className="order-shipping-title">Información de Envío:</h4>
                                                <p><strong>Dirección:</strong> {order.shippingInfo.direccion}</p>
                                                <p><strong>Teléfono:</strong> {order.shippingInfo.telefono}</p>
                                                <p><strong>Email:</strong> {order.shippingInfo.email}</p>
                                            </div>
                                        )}
                                        <div className="order-total">
                                            <span>Total:</span>
                                            <span className="total-amount">{formatPrice(order.total || 0)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;

