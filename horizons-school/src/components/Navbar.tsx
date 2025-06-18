import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
const logo = `${process.env.PUBLIC_URL}/images/logo.svg`;

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100 },
    visible: { 
      y: 0,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 20
      }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.1,
      transition: { type: "spring" as const, stiffness: 300 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <BootstrapNavbar 
        expand="lg" 
        fixed="top" 
        className={`py-3 ${scrolled ? 'scrolled' : ''}`}
      >
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <motion.img 
              src={logo} 
              alt="Horizons School" 
              height="40" 
              className="me-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.span 
              className="fw-bold brand-text"
              whileHover={{ color: '#007bff' }}
            >
              HORIZONS SCHOOL
            </motion.span>
          </BootstrapNavbar.Brand>
          
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav">
            <motion.span whileTap={{ scale: 0.9 }}>
              <span className="navbar-toggler-icon"></span>
            </motion.span>
          </BootstrapNavbar.Toggle>

          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {[
                { path: '/', text: 'Accueil' },
                { path: '/about', text: 'À Propos' },
                { path: '/programs', text: 'Programmes' },
                { path: '/contact', text: 'Contact' }
              ].map((item) => (
                <motion.div
                  key={item.path}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Nav.Link 
                    as={Link} 
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.text}
                  </Nav.Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Nav.Link 
                  as={Link}
                  to="/register"
                  className="btn btn-primary ms-lg-3 px-4 rounded-pill inscription-btn"
                >
                  S'inscrire
                </Nav.Link>
              </motion.div>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </motion.div>
  );
};

export default Navbar; 