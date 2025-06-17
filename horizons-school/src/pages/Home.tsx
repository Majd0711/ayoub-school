import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';
import AOS from 'aos';

const Home: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right" data-aos-duration="1000">
              <h1 className="display-4 fw-bold mb-4">Bienvenue à Horizons School</h1>
              <p className="lead mb-4">
                École supérieure de commerce et de gestion à Marrakech. Formez-vous aux métiers 
                d'avenir et développez votre potentiel professionnel.
              </p>
              <div className="d-flex gap-3">
                <Button variant="light" size="lg" href="#/programs">
                  Nos Programmes
                </Button>
                <Button variant="outline-light" size="lg" href="#/contact">
                  Contactez-nous
                </Button>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0" data-aos="fade-left" data-aos-duration="1000">
              <img 
                src="/images/students.jpg" 
                alt="Étudiants à Horizons School" 
                className="img-fluid rounded-3 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Programs Overview */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">Nos Programmes de Formation</h2>
          <Row>
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <Card className="h-100 shadow-sm border-0 text-center p-3">
                <div className="text-primary mb-3">
                  <i className='bx bx-graduation fs-1'></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Management</Card.Title>
                  <Card.Text>
                    Développez vos compétences en gestion d'entreprise et leadership.
                  </Card.Text>
                </Card.Body>
                <div>
                  <Button variant="outline-primary" href="#/programs">En savoir plus</Button>
                </div>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <Card className="h-100 shadow-sm border-0 text-center p-3">
                <div className="text-primary mb-3">
                  <i className='bx bx-group fs-1'></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Ressources Humaines</Card.Title>
                  <Card.Text>
                    Maîtrisez les techniques modernes de gestion du capital humain.
                  </Card.Text>
                </Card.Body>
                <div>
                  <Button variant="outline-primary" href="#/programs">En savoir plus</Button>
                </div>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="300">
              <Card className="h-100 shadow-sm border-0 text-center p-3">
                <div className="text-primary mb-3">
                  <i className='bx bx-line-chart fs-1'></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Finance</Card.Title>
                  <Card.Text>
                    Apprenez à analyser, prévoir et optimiser les ressources financières.
                  </Card.Text>
                </Card.Body>
                <div>
                  <Button variant="outline-primary" href="#/programs">En savoir plus</Button>
                </div>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="400">
              <Card className="h-100 shadow-sm border-0 text-center p-3">
                <div className="text-primary mb-3">
                  <i className='bx bx-laptop fs-1'></i>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Commerce</Card.Title>
                  <Card.Text>
                    Développez vos compétences en marketing, vente et stratégies commerciales.
                  </Card.Text>
                </Card.Body>
                <div>
                  <Button variant="outline-primary" href="#/programs">En savoir plus</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right">
              <img 
                src="/images/campus.jpg" 
                alt="Campus Horizons School" 
                className="img-fluid rounded-3 shadow"
              />
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0" data-aos="fade-left">
              <h2 className="mb-4">Pourquoi choisir Horizons School?</h2>
              <p className="mb-4">
                Horizons School est une institution d'excellence qui offre une formation de qualité 
                adaptée aux besoins du marché du travail. Notre approche pédagogique moderne et notre 
                équipe de professionnels expérimentés garantissent votre réussite.
              </p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <span className="bg-primary text-white rounded-circle p-2 me-3">1</span>
                  <span>Des programmes adaptés aux besoins du marché</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="bg-primary text-white rounded-circle p-2 me-3">2</span>
                  <span>Des professeurs experts dans leur domaine</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="bg-primary text-white rounded-circle p-2 me-3">3</span>
                  <span>Un environnement d'apprentissage moderne</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <span className="bg-primary text-white rounded-circle p-2 me-3">4</span>
                  <span>Des stages et opportunités professionnelles</span>
                </li>
              </ul>
              <Button variant="primary" href="#/about">Découvrir notre école</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home; 