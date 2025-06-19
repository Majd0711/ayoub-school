import React, { useState, useEffect } from 'react';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const logo = `${process.env.PUBLIC_URL}/images/logo-seul-horizons.jpg`;

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
    <BootstrapNavbar 
      expand="lg" 
      fixed="top" 
      className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <motion.img 
            src={logo} 
            alt="Horizons School" 
            className="navbar-logo me-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <span className="brand-text">HORIZONS SCHOOL</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-custom">
          <span className="navbar-toggler-icon"></span>
        </BootstrapNavbar.Toggle>

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {[
              { path: '/', text: 'Accueil' },
              { path: '/about', text: 'À Propos' },
              { path: '/programs', text: 'Programmes' },
              { path: '/contact', text: 'Contact' }
            ].map((item) => (
              <Nav.Item key={item.path} className="nav-item-custom">
                <Nav.Link 
                  as={Link} 
                  to={item.path}
                  className={`nav-link-custom ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => {
                    // Only scroll to top if we're already on the same page
                    if (location.pathname === item.path) {
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  {item.text}
                  {location.pathname === item.path && <span className="nav-active-indicator"></span>}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 