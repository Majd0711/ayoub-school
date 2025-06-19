import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="position-relative text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 53, 102, 0.9), rgba(0, 53, 102, 0.8))',
            zIndex: 1
          }}
        ></div>
        
        <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
          <img 
            src="/images/Women_Scholarships.avif" 
            alt="Étudiants à Horizons School" 
            className="w-100 h-100"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        <Container className="position-relative py-5" style={{ zIndex: 2, paddingTop: '6rem', paddingBottom: '6rem' }}>
          <Row className="align-items-center">
            <Col lg={7} data-aos="fade-right" data-aos-duration="1000">
              <div className="mb-4">
                <span className="badge bg-white text-primary fs-6 fw-normal mb-3 px-3 py-2">
                  Excellence Académique
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4">
                Formez-vous aux métiers d'avenir avec <span className="text-warning">Horizons School</span>
              </h1>
              <p className="lead mb-4 fs-4" style={{ opacity: 0.9 }}>
                École supérieure de commerce et de gestion à Marrakech. 
                Développez votre potentiel professionnel avec nos formations d'excellence.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button 
                  variant="warning" 
                  size="lg" 
                  href="#/programs" 
                  className="px-4 py-2 fw-medium"
                >
                  Découvrir nos programmes
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg" 
                  href="#/contact"
                  className="px-4 py-2 fw-medium"
                >
                  Nous contacter
                </Button>
              </div>
              
              {/* Stats */}
              <div className="d-flex flex-wrap gap-4 mt-5 pt-3 border-top border-white-10">
                <div className="text-center">
                  <div className="fs-2 fw-bold mb-1">500+</div>
                  <div className="small">Diplômés</div>
                </div>
                <div className="text-center">
                  <div className="fs-2 fw-bold mb-1">98%</div>
                  <div className="small">Taux de réussite</div>
                </div>
                <div className="text-center">
                  <div className="fs-2 fw-bold mb-1">50+</div>
                  <div className="small">Partenaires entreprises</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4 text-center">
            <Col md={3} data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <h3 className="display-4 text-primary mb-2">17+</h3>
                <p className="mb-0 fw-medium">Formations</p>
              </div>
            </Col>
            <Col md={3} data-aos="fade-up" data-aos-delay="200">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <h3 className="display-4 text-primary mb-2">500+</h3>
                <p className="mb-0 fw-medium">Diplômés</p>
              </div>
            </Col>
            <Col md={3} data-aos="fade-up" data-aos-delay="300">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <h3 className="display-4 text-primary mb-2">50+</h3>
                <p className="mb-0 fw-medium">Partenaires entreprises</p>
              </div>
            </Col>
            <Col md={3} data-aos="fade-up" data-aos-delay="400">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <h3 className="display-4 text-primary mb-2">95%</h3>
                <p className="mb-0 fw-medium">Taux d'insertion</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Programs Overview */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-primary fw-bold">NOS PROGRAMMES</span>
            <h2 className="h1">Formations d'Excellence</h2>
            <p className="lead text-muted">Découvrez nos programmes conçus pour votre réussite professionnelle</p>
          </div>
          <Row>
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <Card className="h-100 shadow-sm border-0 text-center p-3 hover-lift">
                <div className="text-primary mb-3">
                  <img 
                    src="/images/managment-icon.jpg" 
                    alt="Management Icon" 
                    style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }}
                  />
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
                src="/images/arrakesh.jpg" 
                alt="Marrakech - Siège d'Horizons School" 
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

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-primary fw-bold">TÉMOIGNAGES</span>
            <h2>Ce que disent nos étudiants</h2>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Carousel controls={false} indicators>
                <Carousel.Item className="text-center px-5">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bx bxs-star text-warning fs-4"></i>
                    ))}
                  </div>
                  <p className="lead fst-italic mb-4">
                    "Grâce à la formation à Horizons School, j'ai pu acquérir des compétences pratiques qui m'ont permis de décrocher mon premier emploi avant même l'obtention de mon diplôme."
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <img 
                      src="/images/avatar1.jpg" 
                      alt="Student" 
                      className="rounded-circle me-3" 
                      width="60" 
                      height="60"
                    />
                    <div className="text-start">
                      <h5 className="mb-0">Mehdi El Amrani</h5>
                      <p className="text-muted mb-0">Promotion 2023 - Responsable Marketing Digital</p>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="text-center px-5">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bx bxs-star text-warning fs-4"></i>
                    ))}
                  </div>
                  <p className="lead fst-italic mb-4">
                    "L'accompagnement personnalisé et la qualité des enseignants font toute la différence. Je recommande vivement cette école !"
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <img 
                      src="/images/avatar2.jpg" 
                      alt="Student" 
                      className="rounded-circle me-3" 
                      width="60" 
                      height="60"
                    />
                    <div className="text-start">
                      <h5 className="mb-0">Amina Benjelloun</h5>
                      <p className="text-muted mb-0">Promotion 2022 - Chef de Projet IT</p>
                    </div>
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News & Events */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6} data-aos="fade-right">
              <span className="text-primary fw-bold">ACTUALITÉS</span>
              <h2>Dernières Nouvelles & Événements</h2>
            </Col>
            <Col lg={6} className="text-lg-end mt-4 mt-lg-0" data-aos="fade-left">
              <Button variant="outline-primary" href="#/news">Voir toutes les actualités</Button>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <div className="card-img-top overflow-hidden">
                  <img 
                    src="/images/event1.jpg" 
                    alt="Événement à venir" 
                    className="img-fluid"
                    style={{height: '200px', width: '100%', objectFit: 'cover'}}
                  />
                </div>
                <Card.Body>
                  <div className="d-flex mb-2">
                    <span className="badge bg-primary me-2">Événement</span>
                    <small className="text-muted">15 Juin 2025</small>
                  </div>
                  <Card.Title>Journée Portes Ouvertes</Card.Title>
                  <Card.Text>
                    Découvrez nos locaux, rencontrez nos enseignants et nos étudiants lors de notre prochaine journée portes ouvertes.
                  </Card.Text>
                  <Button variant="link" className="px-0">En savoir plus →</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <div className="card-img-top overflow-hidden">
                  <img 
                    src="/images/news1.jpg" 
                    alt="Actualité" 
                    className="img-fluid"
                    style={{height: '200px', width: '100%', objectFit: 'cover'}}
                  />
                </div>
                <Card.Body>
                  <div className="d-flex mb-2">
                    <span className="badge bg-success me-2">Actualité</span>
                    <small className="text-muted">5 Juin 2025</small>
                  </div>
                  <Card.Title>Nouveau Partenariat International</Card.Title>
                  <Card.Text>
                    Horizons School signe un nouveau partenariat avec une prestigieuse université européenne pour des échanges étudiants.
                  </Card.Text>
                  <Button variant="link" className="px-0">Lire la suite →</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="300">
              <Card className="h-100 border-0 shadow-sm hover-lift">
                <div className="card-img-top overflow-hidden">
                  <img 
                    src="/images/event2.jpg" 
                    alt="Atelier" 
                    className="img-fluid"
                    style={{height: '200px', width: '100%', objectFit: 'cover'}}
                  />
                </div>
                <Card.Body>
                  <div className="d-flex mb-2">
                    <span className="badge bg-info me-2">Atelier</span>
                    <small className="text-muted">22 Juin 2025</small>
                  </div>
                  <Card.Title>Atelier sur l'Intelligence Artificielle</Card.Title>
                  <Card.Text>
                    Participez à notre atelier pratique sur les dernières avancées en intelligence artificielle et leurs applications métiers.
                  </Card.Text>
                  <Button variant="link" className="px-0">S'inscrire →</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Partners */}
      <section className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="text-primary fw-bold">NOS PARTENAIRES</span>
            <h2>Ils nous font confiance</h2>
          </div>
          <Row className="align-items-center justify-content-center g-4">
            {[1, 2, 3, 4, 5].map((partner) => (
              <Col xs={6} sm={4} md={2} key={partner} data-aos="fade-up" data-aos-delay={`${partner * 100}`}>
                <div className="bg-white p-3 rounded-3 shadow-sm h-100 d-flex align-items-center justify-content-center">
                  <img 
                    src={`/images/partner${partner}.png`} 
                    alt={`Partenaire ${partner}`} 
                    className="img-fluid"
                    style={{filter: 'grayscale(100%)', opacity: 0.7, transition: 'all 0.3s ease'}}
                    onMouseOver={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                    onMouseOut={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mb-4 mb-lg-0" data-aos="fade-right">
              <h2 className="h1 mb-3">Prêt à commencer votre aventure ?</h2>
              <p className="lead mb-0">Rejoignez une communauté dynamique d'apprenants et de professionnels passionnés.</p>
            </Col>
            <Col lg={4} className="text-lg-end" data-aos="fade-left">
              <Button variant="light" size="lg" className="me-2 mb-2" href="#/programs">Découvrir nos formations</Button>
              <Button variant="outline-light" size="lg" href="#/contact">Nous contacter</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home; 