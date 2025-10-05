import React, { useState } from "react";
import ProductCard from "./ProductsCard.jsx";

const Products = ({ products, onProductClick, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Actualizar productos filtrados cuando cambien los productos o el término de búsqueda
  React.useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  if (!products || products.length === 0) {
    return (
      <section className="catalog">
        <div className="container">
          <div className="catalog-header">
            <h1>Nuestro Catálogo</h1>
            <p>Descubre nuestra colección completa de muebles artesanales</p>
          </div>
          
          <div className="search-section">
            <div className="search-box">
              <input 
                type="text" 
                id="search-input" 
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button id="search-btn" onClick={handleSearch}>🔍</button>
            </div>
          </div>

          <div className="products-container">
            <div className="loading" id="loading">
              <div className="loading-spinner"></div>
              <p>Cargando catálogo de productos...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="catalog">
      <div className="container">
        <div className="catalog-header">
          <h1>Nuestro Catálogo</h1>
          <p>Descubre nuestra colección completa de muebles artesanales</p>
        </div>
        
        <div className="search-section">
          <div className="search-box">
            <input 
              type="text" 
              id="search-input" 
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button id="search-btn" onClick={handleSearch}>🔍</button>
          </div>
        </div>

        <div className="products-container">
          {filteredProducts.length > 0 ? (
            <div className="products-grid" id="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "var(--text-medium)" }}>
              <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
