const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/productos`;

export const getFeaturedProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/featured`);
        if (!response.ok) {
            throw new Error('Hubo un error en el servidor');
        }
        const {success, data, count} = await response.json();
        if (!success) {
            throw new Error('Hubo un error al obtener los productos destacados');
        }
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) {
            throw new Error('Hubo un error en el servidor');
        }
        const {success, data, count} = await response.json();
        if (!success) {
            throw new Error('Hubo un error al obtener todos los productos');
        }
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Producto no encontrado');
            }
            throw new Error('Hubo un error en el servidor');
        }
        const { success, data } = await response.json();
        if (!success) {
            throw new Error('Failed to fetch product');
        }
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const searchProducts = async (searchTerm) => {
    try {
        const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
            throw new Error('Hubo un error en el servidor');
        }
        const { success, data, count } = await response.json();
        if (!success) {
            throw new Error('Hubo un error al buscar productos');
        }
        return data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

// Obtener token del localStorage
const getToken = () => {
    if (typeof window === 'undefined') return null;
    try {
        let token = localStorage.getItem('reactAuthToken');
        if (token) {
            token = token.toString().trim().replace(/^["']|["']$/g, '');
            if (token) return token;
        }
        const authData = localStorage.getItem('reactAuthUser');
        if (authData) {
            const user = JSON.parse(authData);
            if (user.token) {
                token = user.token.toString().trim().replace(/^["']|["']$/g, '');
                if (token) return token;
            }
        }
    } catch (error) {
        console.error('Error al obtener token:', error);
    }
    return null;
};

export const createProduct = async (productData) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear el producto');
        }
        if (!data.success) {
            throw new Error(data.message || 'El servidor no pudo crear el producto');
        }
        return data.data;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al actualizar el producto');
        }
        if (!data.success) {
            throw new Error(data.message || 'El servidor no pudo actualizar el producto');
        }
        return data.data;
    } catch (error) {
        console.error('Error actualizando producto:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al eliminar el producto');
        }
        if (!data.success) {
            throw new Error(data.message || 'El servidor no pudo eliminar el producto');
        }
        return data.data;
    } catch (error) {
        console.error('Error eliminando producto:', error);
        throw error;
    }
};