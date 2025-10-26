import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { getFeaturedProducts } from "../services/productServices.js";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

function App() {
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

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
 
    // El useEffect se encarga del scroll automáticamente
  };

  const handleExitProductDetail = (actualPage) => {
    setSelectedProduct(null);

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
          cartItemCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
