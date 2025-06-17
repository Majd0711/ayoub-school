import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar expand="lg" className="fixed-top" bg="dark" variant="dark">
      <Container>
        <BootstrapNavbar.Brand href="#/" className="d-flex align-items-center">
          <span className="fw-bold">HORIZONS SCHOOL</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#/">Accueil</Nav.Link>
            <Nav.Link href="#/about">À Propos</Nav.Link>
            <Nav.Link href="#/programs">Programmes</Nav.Link>
            <Nav.Link href="#/contact">Contact</Nav.Link>
            <Nav.Link 
              href="#/" 
              className="btn btn-primary ms-lg-3 px-4 rounded-pill"
            >
              S'inscrire
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar; 