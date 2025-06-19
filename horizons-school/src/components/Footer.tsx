import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import 'boxicons/css/boxicons.min.css';
import '../styles/Footer.css';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Handle smooth scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top-footer"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Retour en haut de la page"
        >
          <i className='bx bx-up-arrow-alt'></i>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="gy-4">
          <Col lg={3} md={6}>
            <h4 className="text-white">HORIZONS SCHOOL</h4>
            <p className="mt-3">
              École supérieure de commerce et de gestion à Marrakech, offrant des formations de qualité pour préparer les étudiants au monde professionnel.
            </p>
            <div className="social-links mt-3">
              <a href="https://www.facebook.com/share/1ENdkkJ2KD/" target="_blank" rel="noopener noreferrer" className="me-2 text-white">
                <i className="bx bxl-facebook-circle bx-md"></i>
              </a>
              <a href="https://www.instagram.com/horizons.school" target="_blank" rel="noopener noreferrer" className="me-2 text-white">
                <i className="bx bxl-instagram bx-md"></i>
              </a>
              <a href="https://wa.me/212604916565" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bx bxl-whatsapp bx-md"></i>
              </a>
            </div>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-white">Liens Rapides</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><a href="#/" className="text-white text-decoration-none">Accueil</a></li>
              <li className="mb-2"><a href="#/about" className="text-white text-decoration-none">À Propos</a></li>
              <li className="mb-2"><a href="#/programs" className="text-white text-decoration-none">Programmes</a></li>
              <li className="mb-2"><a href="#/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-white">Programmes</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <a 
                  href="#/programs#technicien" 
                  className="text-white text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    setTimeout(() => window.location.href = '#/programs#technicien', 100);
                  }}
                >
                  Formations Techniques
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#/programs#licence" 
                  className="text-white text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    setTimeout(() => window.location.href = '#/programs#licence', 100);
                  }}
                >
                  Licence Professionnelle
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#/programs#master" 
                  className="text-white text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    setTimeout(() => window.location.href = '#/programs#master', 100);
                  }}
                >
                  Master Professionnel
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#/programs#formation" 
                  className="text-white text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    setTimeout(() => window.location.href = '#/programs#formation', 100);
                  }}
                >
                  Formations Continues
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#/programs#langues" 
                  className="text-white text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo(0, 0);
                    setTimeout(() => window.location.href = '#/programs#langues', 100);
                  }}
                >
                  Formations en Langues
                </a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-white">Contact</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><i className="bx bx-map me-2"></i> Mhamid Maatalah, Marrakech</li>
              <li className="mb-2">
                <i className="bx bx-phone me-2"></i> 
                <a href="tel:+212525181650" className="text-white text-decoration-none">+212 5 25 18 16 50</a>
              </li>
              <li className="mb-2">
                <i className="bx bxl-whatsapp me-2"></i>
                <a href="https://wa.me/212604916565" className="text-white text-decoration-none me-3">+212 6 04 91 65 65</a>
              </li>
              <li className="mb-2">
                <i className="bx bx-envelope me-2"></i>
                <a href="mailto:horizonsschool4@gmail.com" className="text-white text-decoration-none">horizonsschool4@gmail.com</a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="mt-4" />
        
        <Row className="align-items-center position-relative">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Horizons School. Tous droits réservés.</p>
          </Col>
          <div className="position-absolute" style={{ right: '15px', bottom: '0' }}>
            <ScrollToTopButton />
          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 