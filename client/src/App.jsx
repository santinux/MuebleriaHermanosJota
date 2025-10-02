import { useState } from 'react'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import Contact from './components/Contact';

import './styles/App.css'
import ProductDetail from './components/ProductDetail';

function App() {
  const [actualPage, setActualPage] = useState('home'); //pagina para renderizar
  const [cartItemCount, setCartItemCount] = useState(0); // contador de items en el carrito
  const [selectedProduct, setSelectedProduct] = useState(null); // producto seleccionado para ver detalle

  const handleSelectProduct = (product) => {
    // Aquí puedes implementar la lógica para seleccionar un producto
    // Por ejemplo, buscar el producto por ID y actualizar el estado
    console.log("Producto seleccionado:", product);
    setSelectedProduct(product);
    setActualPage('product_detail');
  }

  const handleExitProductDetail = (actualPage) => {
    setSelectedProduct(null);
    setActualPage(actualPage);
  }

  return (
    <>
      <header className="header">
        <NavBar
          actualPage={actualPage}
          setActualPage={setActualPage}
          cartItemCount={cartItemCount} />
      </header>
      <main>
        {actualPage === 'home' && 
          <Home 
            setActualPage={setActualPage} 
            handleSelectProduct={handleSelectProduct} />
        }
        {actualPage === 'products' && <h1>Products Page</h1>}
        {actualPage === 'contact' && <Contact />}
        {actualPage === 'product_detail' && <ProductDetail product={selectedProduct} onExit={handleExitProductDetail} />}
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  )
}

export default App
