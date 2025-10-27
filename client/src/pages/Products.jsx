import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductsCard.jsx";
import { getAllProducts, searchProducts } from "../services/productServices.js";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import { useAppContext } from "../contexts/AppContext.jsx";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isTipsVisible, setIsTipsVisible] = useState(false);
  const tipsRef = useRef(null);

  const { setCurrentPage, error, setError, loading, setLoading } = useAppContext();

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    filterProductsBySearchTerm();
  };

  const handleSearchButtonClick = async () => {
    setLoading(true);
    try {
      if (searchTerm === "") {
        // Si no hay término de búsqueda, mostrar todos los productos
        setFilteredProducts(allProducts);
      } else {
        // Usar la búsqueda del backend
        const searchResults = await searchProducts(searchTerm);
        setFilteredProducts(searchResults);
      }
    } catch (error) {
      console.error('Error searching products:', error);
      // En caso de error, mostrar todos los productos como fallback
      setFilteredProducts(allProducts);
    }
    setLoading(false);
  };

  const filterProductsBySearchTerm = () => {
    if (searchTerm === "") {
      setFilteredProducts(allProducts);
      return;
    }
    // Para búsqueda en tiempo real, usar filtrado local como fallback
    const filtered = allProducts.filter(product =>
      (product.nombre || product.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.descripcion || product.description).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    getAllProducts().then(data => {
      setAllProducts(data);
      setFilteredProducts(data);
    }).catch(error => {
      setError(true);
      console.error('Error loading products:', error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

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
                onChange={(e) => handleSearch(e)}
              />
              <button id="search-btn" onClick={handleSearchButtonClick}>🔍</button>
            </div>
          </div>

          <div className="products-container">
            {loading ? (
              <Loading message="Cargando catálogo de productos..." />
            ) : (
              <div className="products-grid" id="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))
                ) : (
                  <Error message={error ? "Error al cargar los productos. Por favor, intentá nuevamente más tarde." : "No se encontraron productos que coincidan con tu búsqueda."} />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
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
}

export default Products;
