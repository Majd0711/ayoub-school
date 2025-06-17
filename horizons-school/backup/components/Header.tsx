import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar expand="lg" className="fixed-top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img 
            src="/images/logo.svg" 
            alt="Horizons School Logo" 
            height="40" 
            className="me-2"
          />
          <span className="fw-bold">HORIZONS SCHOOL</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#/">Accueil</Nav.Link>
            <Nav.Link href="#/about">À Propos</Nav.Link>
            <Nav.Link href="#/programs">Programmes</Nav.Link>
            <Nav.Link href="#/contact">Contact</Nav.Link>
            <Nav.Link 
              href="#inscription" 
              className="btn btn-primary ms-lg-3 px-4 rounded-pill"
            >
              S'inscrire
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 