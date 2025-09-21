import React from 'react'
import '../styles/App.css'

const Footer = () => {
    return (
        <>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Mueblería Hermanos Jota</h3>
                        <p>Creando muebles únicos desde 1990</p>
                    </div>
                    <div className="footer-section">
                        <h4>Contacto</h4>
                        <p>📧 info@muebleriajota.com</p>
                        <p>📞 +54 11 1234-5678</p>
                    </div>
                    <div className="footer-section">
                        <h4>Síguenos</h4>
                        <p>📱 @muebleriahermanosjota</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 Mueblería Hermanos Jota. Todos los derechos reservados.</p>
                </div>
            </div>
        </>
    )
}

export default Footer