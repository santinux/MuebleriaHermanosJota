const BASE_URL = 'http://localhost:3000/api/productos';

export const getFeaturedProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/featured`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const {success, data, count} = await response.json();
        if (!success) {
            throw new Error('Failed to fetch featured products');
        }
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
