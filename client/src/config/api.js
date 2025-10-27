// Configuración de la API para diferentes entornos
const getApiUrl = () => {
  // En desarrollo, usar localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:3000';
  }
  
  // En producción, usar la URL actual (Vercel)
  return window.location.origin;
};

export const API_BASE_URL = getApiUrl();

// Endpoints de la API
export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/api/productos`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/productos/${id}`,
  FEATURED_PRODUCTS: `${API_BASE_URL}/api/productos/featured`,
  SEARCH_PRODUCTS: (query) => `${API_BASE_URL}/api/productos/search?q=${encodeURIComponent(query)}`,
  CONTACTS: `${API_BASE_URL}/api/contactos`,
  HEALTH: `${API_BASE_URL}/api/health`
};

// Configuración de fetch
export const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Función helper para hacer requests
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...fetchConfig,
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
