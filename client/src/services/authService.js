const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth`;

// Registrar nuevo usuario
export const register = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar usuario');
    }

    return data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

// Iniciar sesión
export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Obtener perfil del usuario autenticado
export const getProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/perfil`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener perfil');
    }

    return data;
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    throw error;
  }
};

