import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  const [actualPage, setActualPage] = useState('home'); //pagina para renderizar
  const [cartItemCount, setCartItemCount] = useState(0); // contador de items en el carrito


  return (
    <>
      <header className="header">
        <NavBar
          actualPage={actualPage}
          setActualPage={setActualPage}
          cartItemCount={cartItemCount} />
      </header>
      <main>
        {actualPage === 'home' && <Home setActualPage={setActualPage} />}
        {actualPage === 'products' && <h1>Products Page</h1>}
        {actualPage === 'contact' && <h1>Contact Page</h1>}
        {actualPage === 'product_detail' && <h1>Product Detail Page</h1>}
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  )
}

export default App
