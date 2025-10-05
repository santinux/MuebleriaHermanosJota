const BASE_URL = 'http://localhost:3000/api/productos';

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