import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';

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
              <a href="#" className="me-2 text-white"><i className="bx bxl-facebook-circle bx-md"></i></a>
              <a href="#" className="me-2 text-white"><i className="bx bxl-instagram bx-md"></i></a>
              <a href="#" className="me-2 text-white"><i className="bx bxl-linkedin-square bx-md"></i></a>
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
              <li className="mb-2"><a href="#/programs" className="text-white text-decoration-none">Commerce</a></li>
              <li className="mb-2"><a href="#/programs" className="text-white text-decoration-none">Finance</a></li>
              <li className="mb-2"><a href="#/programs" className="text-white text-decoration-none">Management</a></li>
              <li className="mb-2"><a href="#/programs" className="text-white text-decoration-none">Ressources Humaines</a></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="text-white">Contact</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><i className="bx bx-map me-2"></i> Avenue Mohammed VI, Marrakech</li>
              <li className="mb-2"><i className="bx bx-phone me-2"></i> +212 5 24 XX XX XX</li>
              <li className="mb-2"><i className="bx bx-envelope me-2"></i> contact@horizons-school.ma</li>
            </ul>
          </Col>
        </Row>
        
        <hr className="mt-4" />
        
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Horizons School. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 