import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import ProductDetail from "./components/ProductDetail";
import Products from "./components/Products";
import { getFeaturedProducts } from "../services/productServices.js";
import "./styles/App.css";

function App() {
  const [actualPage, setActualPage] = useState("home"); //pagina para renderizar
  const [selectedProduct, setSelectedProduct] = useState(null); // producto seleccionado para ver detalle
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al inicio
  useEffect(() => {
    setLoading(true);
    getFeaturedProducts().then(data => {
      setProducts(data);
    }).catch(error => {
      console.error("Error cargando productos:", error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("reactShoppingCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("reactShoppingCart", JSON.stringify(cart));
  }, [cart]);

  // Hacer scroll hacia arriba cuando cambie la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [actualPage]);

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
    setActualPage("product_detail");
    // El useEffect se encarga del scroll automáticamente
  };

  const handleExitProductDetail = (actualPage) => {
    setSelectedProduct(null);
    setActualPage(actualPage);
    // El useEffect se encarga del scroll automáticamente
  };
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };
  return (
    <>
      <header className="header">
        <NavBar
          cart={cart}
          onUpdateCart={handleUpdateCart}
          actualPage={actualPage}
          setActualPage={setActualPage}
          cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        />
      </header>
      <main>
        {actualPage === "home" && (
          <Home
            setActualPage={setActualPage}
            handleSelectProduct={handleSelectProduct}
          />
        )}

        {actualPage === "products" && (
          <Products
            products={products}
            onProductClick={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {actualPage === 'contact' && <Contact />}

        {actualPage === "product_detail" && (
          <ProductDetail
            productId={selectedProduct}
            onExit={handleExitProductDetail}
            onAddToCart={handleAddToCart}
            allProducts={products}
            onProductClick={handleSelectProduct}
          />
        )}
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
