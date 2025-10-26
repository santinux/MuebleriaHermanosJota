import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { getFeaturedProducts } from "../services/productServices.js";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

function App() {

  return (
    <>
      <header className="header">
        <NavBar />  
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/admin/crear-producto" element={<NewProduct />} /> */}
          {/* Ruta para manejar rutas no definidas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
