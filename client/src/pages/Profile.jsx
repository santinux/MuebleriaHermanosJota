import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext.jsx";
import { getUserOrders, getAllOrders, getOrderStats, updateOrderStatus } from "../services/orderService";
import "../styles/App.css";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Toast from "../components/Toast";

const Profile = () => {
    const { user, isAuthenticated, isAdmin } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [updatingStatus, setUpdatingStatus] = useState(null);
    const [expandedOrders, setExpandedOrders] = useState(new Set());

    useEffect(() => {
        const loadData = async () => {
            if (!user || !isAuthenticated) {
                setLoading(false);
                return;
            }
            
            setLoading(true);
            setError(false);
            setErrorMessage('');
            try {
                if (isAdmin) {
                    // Cargar estadísticas y todos los pedidos para admin
                    const [ordersResponse, statsResponse] = await Promise.all([
                        getAllOrders().catch(err => {
                            console.error('Error al obtener pedidos:', err);
                            return { success: false, message: err.message, data: [] };
                        }),
                        getOrderStats().catch(err => {
                            console.error('Error al obtener estadísticas:', err);
                            return { success: false, message: err.message, data: null };
                        })
                    ]);
                    
                    if (ordersResponse.success) {
                        setOrders(ordersResponse.data || []);
                    } else {
                        setError(true);
                        setErrorMessage(ordersResponse.message || 'Error al cargar pedidos');
                        setOrders([]);
                    }
                    
                    if (statsResponse.success) {
                        setStats(statsResponse.data);
                    } else {
                        console.warn('Error al cargar estadísticas:', statsResponse.message);
                        // No mostramos error para estadísticas, solo para pedidos
                    }
                } else {
                    // Cargar solo los pedidos del usuario para clientes
                    const response = await getUserOrders();
                    if (response.success) {
                        setOrders(response.data || []);
                    } else {
                        setError(true);
                        setErrorMessage(response.message || 'Error al cargar pedidos');
                        setOrders([]);
                    }
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError(true);
                setErrorMessage(err.message || 'Error al cargar los datos. Por favor, intenta nuevamente.');
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, isAuthenticated, isAdmin]);

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

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingStatus(orderId);
        try {
            const response = await updateOrderStatus(orderId, newStatus);
            if (response.success) {
                // Actualizar el pedido en la lista
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order._id === orderId 
                            ? { ...order, status: newStatus }
                            : order
                    )
                );
                
                // Si es admin, actualizar las estadísticas
                if (isAdmin && stats) {
                    try {
                        const statsResponse = await getOrderStats();
                        if (statsResponse.success) {
                            setStats(statsResponse.data);
                        }
                    } catch (err) {
                        console.error('Error al actualizar estadísticas:', err);
                    }
                }
                
                setToastMessage('Estado del pedido actualizado exitosamente');
                setToastType('success');
                setShowToast(true);
            } else {
                throw new Error(response.message || 'Error al actualizar el estado');
            }
        } catch (err) {
            console.error('Error al actualizar estado:', err);
            setToastMessage(err.message || 'Error al actualizar el estado del pedido');
            setToastType('error');
            setShowToast(true);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const toggleOrder = (orderId) => {
        setExpandedOrders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(orderId)) {
                newSet.delete(orderId);
            } else {
                newSet.add(orderId);
            }
            return newSet;
        });
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
                <h2 className="section-title">
                    {isAdmin ? '👑 Panel de Administración' : 'Mi Perfil'}
                </h2>

                {error && (
                    <div className="profile-error-message">
                        <p>⚠️ {errorMessage}</p>
                    </div>
                )}

                <div className={`profile-content ${isAdmin ? 'admin-content' : ''}`}>
                    {/* Estadísticas para Admin - Mostrar primero */}
                    {isAdmin && stats && (
                        <div className="admin-stats">
                            <h3>📊 Estadísticas de Ventas</h3>
                            <div className="stats-grid">
                                <div className="stat-card stat-total">
                                    <div className="stat-icon">📦</div>
                                    <div className="stat-value">{stats.totalOrders || 0}</div>
                                    <div className="stat-label">Total de Pedidos</div>
                                </div>
                                <div className="stat-card stat-revenue">
                                    <div className="stat-icon">💰</div>
                                    <div className="stat-value">{formatPrice(stats.totalRevenue || 0)}</div>
                                    <div className="stat-label">Ingresos Totales</div>
                                </div>
                                <div className="stat-card stat-pending">
                                    <div className="stat-icon">⏳</div>
                                    <div className="stat-value">{stats.ordersByStatus?.pending || 0}</div>
                                    <div className="stat-label">Pendientes</div>
                                </div>
                                <div className="stat-card stat-processing">
                                    <div className="stat-icon">🔄</div>
                                    <div className="stat-value">{stats.ordersByStatus?.processing || 0}</div>
                                    <div className="stat-label">En Proceso</div>
                                </div>
                                <div className="stat-card stat-shipped">
                                    <div className="stat-icon">🚚</div>
                                    <div className="stat-value">{stats.ordersByStatus?.shipped || 0}</div>
                                    <div className="stat-label">Enviados</div>
                                </div>
                                <div className="stat-card stat-delivered">
                                    <div className="stat-icon">✅</div>
                                    <div className="stat-value">{stats.ordersByStatus?.delivered || 0}</div>
                                    <div className="stat-label">Entregados</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Información Personal - Solo para clientes */}
                    {!isAdmin && (
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
                    )}

                    <div className={`profile-orders ${isAdmin ? 'admin-orders' : ''}`}>
                        <h3>{isAdmin ? '📋 Todos los Pedidos' : 'Mis Pedidos'} ({orders.length})</h3>
                        {orders.length === 0 ? (
                            <div className="no-orders">
                                <p>🛒 {isAdmin ? 'No hay pedidos registrados' : 'No tienes pedidos aún'}</p>
                                <p className="no-orders-hint">
                                    {isAdmin ? 'Los pedidos aparecerán aquí cuando los clientes realicen compras.' : 'Cuando realices una compra, aparecerá aquí.'}
                                </p>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {orders.map((order) => {
                                    const isExpanded = expandedOrders.has(order._id);
                                    return (
                                        <div key={order._id} className={`order-card ${isExpanded ? 'expanded' : ''}`}>
                                            <div 
                                                className="order-header"
                                                onClick={() => toggleOrder(order._id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="order-header-main">
                                                    <div>
                                                        <span className="order-id">Pedido #{order._id.slice(-8).toUpperCase()}</span>
                                                        <span className="order-date">📅 {formatDate(order.createdAt)}</span>
                                                        {isAdmin && order.user && (
                                                            <span className="order-user">
                                                                👤 Cliente: {order.user.nombre || order.user.email}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="order-status-section">
                                                        {isAdmin ? (
                                                            <select
                                                                className="status-select"
                                                                value={order.status || 'pending'}
                                                                onChange={(e) => {
                                                                    e.stopPropagation();
                                                                    handleStatusChange(order._id, e.target.value);
                                                                }}
                                                                onClick={(e) => e.stopPropagation()}
                                                                disabled={updatingStatus === order._id}
                                                            >
                                                                <option value="pending" className="option-pending">Pendiente</option>
                                                                <option value="processing" className="option-processing">En proceso</option>
                                                                <option value="shipped" className="option-shipped">Enviado</option>
                                                                <option value="delivered" className="option-delivered">Entregado</option>
                                                                <option value="cancelled" className="option-cancelled">Cancelado</option>
                                                            </select>
                                                        ) : (
                                                            <span className={`status-badge status-${order.status || 'pending'}`}>
                                                                {getStatusLabel(order.status || 'pending')}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button 
                                                    className="order-toggle"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleOrder(order._id);
                                                    }}
                                                    aria-label={isExpanded ? 'Minimizar pedido' : 'Expandir pedido'}
                                                >
                                                    {isExpanded ? '▼' : '▶'}
                                                </button>
                                            </div>
                                            <div className={`order-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
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
                                                        <p><strong>Nombre:</strong> {order.shippingInfo.nombre}</p>
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
                                        </div>
                                    );
                                })}
                            </div>
                        )}
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

export default Profile;
