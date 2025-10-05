import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductsCard.jsx";

const Products = ({ products, onProductClick, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isTipsVisible, setIsTipsVisible] = useState(false);
  const tipsRef = useRef(null);

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

  // Intersection Observer para animar los tips cuando sean visibles
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTipsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (tipsRef.current) {
      observer.observe(tipsRef.current);
    }

    return () => {
      if (tipsRef.current) {
        observer.unobserve(tipsRef.current);
      }
    };
  }, []);

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
        <>
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

          {/* Consejos de compra */}
          <aside>
            <div ref={tipsRef} className={`container purchase-tips ${isTipsVisible ? 'show' : ''}`}>
            <h3>Consejos de compra...</h3>
            <p className="purchase-tips-intro">
              Al comprar un mueble de nuestro catálogo, recordá que cada pieza está pensada para acompañarte
              durante décadas, no temporadas.
            </p>
            <ul>
              <li>
                <p>
                  <b>Elegí con perspectiva.</b> Nuestros diseños abrazan principios atemporales que
                  permanecerán relevantes dentro de 20 años. Considerá cómo cada pieza dialogará tanto con tu espacio
                  actual como con los futuros.
                </p>
              </li>
              <li>
                <p>
                  <b>Invertí en historia.</b> Cada mueble lleva consigo la narrativa de los artesanos que lo
                  crearon y pronto, la tuya propia. Las marcas del uso diario no son imperfecciones; son
                  capítulos de una historia compartida.
                </p>
              </li>
              <li>
                <p>
                  <b>Entendé el proceso.</b> Nuestro trabajo honra técnicas tradicionales con precisión
                  contemporánea. Seleccionamos cada madera por su carácter único, respetamos los tiempos
                  naturales, y aplicamos uniones que se fortalecen con el tiempo.
                </p>
              </li>
              <li>
                <p>
                  <b>Pensá en el impacto.</b> Cuando elegís Hermanos Jota, te convertís en custodio de un
                  objeto diseñado para perdurar. No es consumo; es una alianza con el futuro.
                </p>
              </li>
              <li>
                <p>
                  <b>Prestigio en cada detalle.</b> La diferencia está en los detalles invisibles: acabados
                  que nutren la madera, uniones tradicionales que perduran, y el amor por el oficio transmitido de generación en generación.
                  No solo adquirís mobiliario; preservás un arte ancestral.
                </p>
              </li>
            </ul>
            </div>
          </aside>
        </>
      );
    };

    export default Products;
