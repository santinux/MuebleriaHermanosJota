/**
 * Normaliza la URL de una imagen para que funcione correctamente en todas las rutas
 * @param {string} imageUrl - URL de la imagen desde la base de datos
 * @returns {string} - URL normalizada
 */
export function normalizeImageUrl(imageUrl) {
  if (!imageUrl) return '';
  
  // Si ya es una URL completa (http/https), retornarla tal cual
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Si empieza con /img/, retornarla tal cual
  if (imageUrl.startsWith('/img/')) {
    return imageUrl;
  }
  
  // Si empieza con img/ pero sin /, añadir el / al inicio
  if (imageUrl.startsWith('img/')) {
    return '/' + imageUrl;
  }
  
  // Para cualquier otro caso, asumir que está en /img/
  return '/img/' + imageUrl;
}
