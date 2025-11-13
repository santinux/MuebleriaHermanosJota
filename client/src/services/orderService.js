const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/pedidos`;

// Limpiar token (remover comillas y espacios)
const cleanToken = (token) => {
  if (!token) return null;
  // Remover comillas y espacios del inicio y final
  return token.toString().trim().replace(/^["']|["']$/g, '');
};

// Obtener token del localStorage
const getToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    // El token se guarda por separado en 'reactAuthToken'
    let token = localStorage.getItem('reactAuthToken');
    if (token) {
      token = cleanToken(token);
      if (token) return token;
    }
    // Fallback: intentar obtener del objeto user (para compatibilidad)
    const authData = localStorage.getItem('reactAuthUser');
    if (authData) {
      const user = JSON.parse(authData);
      if (user.token) {
        token = cleanToken(user.token);
        if (token) return token;
      }
    }
  } catch (error) {
    console.error('Error al obtener token:', error);
  }
  return null;
};

// Crear un nuevo pedido
export const createOrder = async (orderData) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear el pedido');
    }

    return data;
  } catch (error) {
    console.error('Error al crear pedido:', error);
    throw error;
  }
};

// Obtener todos los pedidos del usuario
export const getUserOrders = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener pedidos');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    throw error;
  }
};

// Obtener un pedido específico
export const getOrderById = async (orderId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${BASE_URL}/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener el pedido');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    throw error;
  }
};

// Obtener todos los pedidos (solo admin)
export const getAllOrders = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${BASE_URL}/admin/todos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener los pedidos');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    throw error;
  }
};

// Obtener estadísticas de pedidos (solo admin)
export const getOrderStats = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${BASE_URL}/admin/estadisticas`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener las estadísticas');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    throw error;
  }
};

// Actualizar estado de un pedido (solo admin)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No hay token de autenticación');
    }

    const response = await fetch(`${BASE_URL}/admin/${orderId}/estado`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar el estado del pedido');
    }

    return data;
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    throw error;
  }
};

