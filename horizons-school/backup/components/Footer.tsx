import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="g-4">
          <Col lg={4} md={6}>
            <div className="mb-4">
              <h5 className="mb-3 fw-bold">HORIZONS SCHOOL</h5>
              <p className="mb-3">
                École de formation professionnelle à Marrakech offrant des programmes de qualité pour préparer les étudiants à réussir dans leur carrière.
              </p>
            </div>
          </Col>
          
          <Col lg={2} md={6}>
            <h5 className="mb-3 fw-bold">Liens Rapides</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#/" className="text-white text-decoration-none">Accueil</a>
              </li>
              <li className="mb-2">
                <a href="#/about" className="text-white text-decoration-none">À Propos</a>
              </li>
              <li className="mb-2">
                <a href="#/programs" className="text-white text-decoration-none">Programmes</a>
              </li>
              <li className="mb-2">
                <a href="#/contact" className="text-white text-decoration-none">Contact</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="mb-3 fw-bold">Programmes</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#/programs" className="text-white text-decoration-none">Management des organisations</a>
              </li>
              <li className="mb-2">
                <a href="#/programs" className="text-white text-decoration-none">Gestion des ressources humaines</a>
              </li>
              <li className="mb-2">
                <a href="#/programs" className="text-white text-decoration-none">Commerce international</a>
              </li>
              <li className="mb-2">
                <a href="#/programs" className="text-white text-decoration-none">Gestion comptable et financière</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="mb-3 fw-bold">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                MARRAKECH Mhamid maatalah
              </li>
              <li className="mb-2">
                06-04-91-65-65
              </li>
              <li className="mb-2">
                contact@horizons-school.com
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <div className="text-center">
          <p className="mb-0">© {new Date().getFullYear()} Horizons School. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 