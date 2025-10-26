import React, { useState } from 'react';
import '../styles/App.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validarFormulario = (nombre, email, mensaje) => {
    if (nombre.trim().length < 2) return 'Poné un nombre más largo';
    if (!email.includes('@') || !email.includes('.')) return 'Ese mail no parece válido';
    if (mensaje.trim().length < 10) return 'Escribí un mensaje un poco más largo';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const validationError = validarFormulario(name, email, message);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    fetch('http://localhost:3000/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Respuesta del backend:', data);
        if (data.success) {
          setShowSuccess(true);
          setError('');
        } else {
          setError(data.message || 'Hubo un error al enviar el mensaje');
        }
      })
      .catch(err => {
        console.error('Error al enviar el formulario:', err);
        setError('No se pudo enviar el mensaje. Intentá más tarde.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <main>
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <div className="contact-hero-content">
              <div className="contact-logo-section">
                <img src="/logo.svg" alt="Hermanos Jota logo" className='contact-logo' />
                <h1 className="contact-title">HERMANOS JOTA</h1>
                <p className="contact-subtitle">Muebles Artesanales de Calidad</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <div className="container">
            <div className="contact-header">
              <h2>Contáctanos</h2>
              <p>¿Tienes alguna pregunta sobre nuestros muebles? Estamos aquí para ayudarte.</p>
            </div>

            <div className="contact-content">
              <div className="contact-info">
                <h2>Información de Contacto</h2>
                <div className="contact-item"><h3>📧 Email</h3><p>info@muebleriajota.com</p></div>
                <div className="contact-item"><h3>📞 Teléfono</h3><p>+54 11 1234-5678</p></div>
                <div className="contact-item"><h3>📍 Dirección</h3><p>Av. Artesanos 123<br />Buenos Aires, Argentina</p></div>
                <div className="contact-item"><h3>🕒 Horarios</h3><p>Lunes a Viernes: 9:00 - 18:00<br />Sábados: 9:00 - 13:00</p></div>
              </div>

              <div className="contact-form-container">
                {!showSuccess ? (
                  <form onSubmit={handleSubmit}>
                    <h2>Envíanos un Mensaje</h2>
                    
                    {error && (
                      <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        <span>{error}</span>
                      </div>
                    )}
                    
                    <div className="form-group">
                      <label htmlFor="name">Nombre *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        className={error && formData.name.length < 2 ? 'error' : ''}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className={error && (!formData.email.includes('@') || !formData.email.includes('.')) ? 'error' : ''}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Mensaje *</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="5" 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        className={error && formData.message.length < 10 ? 'error' : ''}
                        required 
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                  </form>
                ) : (
                  <div className="success-message show">
                    <h3>¡Gracias {formData.name}!</h3>
                    <p>Te vamos a responder pronto</p>
                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="btn btn-secondary"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contact;
