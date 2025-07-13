import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import 'boxicons/css/boxicons.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import carouselStyles from '../styles/Carousel.module.css';
import NewsSection from '../components/NewsSection';
import ProgramsSection from '../components/ProgramsSection';

const Home: React.FC = () => {
  const [index, setIndex] = useState(0);
  
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };
  
  const handlePrev = () => {
    setIndex(prevIndex => (prevIndex === 0 ? 3 : prevIndex - 1));
  };
  
  const handleNext = () => {
    setIndex(prevIndex => (prevIndex === 3 ? 0 : prevIndex + 1));
  };
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
                <Link 
                  to="/programs" 
                  className="btn btn-warning px-4 py-2 fw-medium"
                  style={{ fontSize: '1.1rem' }}
                >
                  Découvrir nos formations
                </Link>
                <Link 
                  to="/contact" 
                  className="btn btn-outline-light px-4 py-2 fw-medium"
                  style={{ fontSize: '1.1rem' }}
                >
                  Nous contacter
                </Link>
              </div>
              
              {/* Stats */}
              <div className="d-flex flex-wrap gap-4 mt-5 pt-3 border-top border-white-10">
                <div className="text-center">
                  <div className="fs-2 fw-bold mb-1">120+</div>
                  <div className="small">Diplômés</div>
                </div>
                <div className="text-center">
                  <div className="fs-2 fw-bold mb-1">98%</div>
                  <div className="small">Taux de réussite</div>
                </div>
                <div className="text-center">
                  <div className="fs-2 fw-bold mb-1">20+</div>
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
                <h3 className="display-4 text-primary mb-2">120+</h3>
                <p className="mb-0 fw-medium">Diplômés</p>
              </div>
            </Col>
            <Col md={3} data-aos="fade-up" data-aos-delay="300">
              <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                <h3 className="display-4 text-primary mb-2">20+</h3>
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
          <div className="position-relative mb-5" data-aos="fade-up">
            <div className="text-center">
              <span className="text-primary fw-bold">NOS PROGRAMMES</span>
              <h2 className="h1 mt-2">Formations d'Excellence</h2>
              <p className="lead text-muted">Découvrez nos programmes conçus pour votre réussite professionnelle</p>
            </div>
            <Link to="/programs" className="btn btn-outline-primary fw-medium position-absolute top-0 end-0">
              Voir plus →
            </Link>
          </div>
          <ProgramsSection />
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light position-relative overflow-hidden why-choose-section">
        {/* Background Pattern */}
        <div 
          className="position-absolute w-100 h-100 top-0 start-0 opacity-10"
          style={{
            backgroundImage: 'url("/images/pattern.png")',
            backgroundRepeat: 'repeat',
            zIndex: 0
          }}
        ></div>
        
        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="align-items-center g-0">
            <Col lg={6} data-aos="fade-right">
              <div className="carousel-wrapper">
                <Carousel 
                  fade 
                  controls={false} 
                  indicators={true}
                  interval={7000}
                  className="why-choose-carousel"
                >
                  <Carousel.Item>
                    <div className="carousel-image-container">
                      <img 
                        src="/images/1.jpg" 
                        alt="Horizons School Students" 
                        className="carousel-image"
                      />
                      <div className="carousel-overlay"></div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="carousel-image-container">
                      <img 
                        src="/images/2.jpg" 
                        alt="Horizons School Campus" 
                        className="carousel-image"
                      />
                      <div className="carousel-overlay"></div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="carousel-image-container">
                      <img 
                        src="/images/inscriptipn ouverte.jpg" 
                        alt="Inscription Ouverte" 
                        className="carousel-image"
                      />
                      <div className="carousel-overlay"></div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="carousel-image-container">
                      <img 
                        src="/images/Les langues.jpg" 
                        alt="Formation en Langues" 
                        className="carousel-image"
                      />
                      <div className="carousel-overlay"></div>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Col>
            
            <Col lg={6} className="mt-4 mt-lg-0 ps-lg-5 why-choose-content" data-aos="fade-left">
              <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fs-7">
                Pourquoi Nous Choisir
              </span>
              <h2 className="h2 fw-bold mb-3">Pourquoi choisir Horizons School?</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1rem' }}>
                Horizons School est une institution d'excellence qui offre une formation de qualité 
                adaptée aux besoins du marché du travail. Notre approche pédagogique moderne et notre 
                équipe de professionnels expérimentés garantissent votre réussite.
              </p>
              
              <div className="d-flex flex-column gap-3 mb-4">
                {[
                  {
                    title: "Des programmes adaptés aux besoins du marché",
                    icon: "bx-book-open",
                    description: "Formations conçues en collaboration avec les professionnels du secteur"
                  },
                  {
                    title: "Des professeurs experts dans leur domaine",
                    icon: "bx-user-voice",
                    description: "Équipe pédagogique composée d'experts et de professionnels actifs"
                  },
                  {
                    title: "Un environnement d'apprentissage moderne",
                    icon: "bx-building-house",
                    description: "Campus moderne équipé des dernières technologies éducatives"
                  },
                  {
                    title: "Des stages et opportunités professionnelles",
                    icon: "bx-briefcase",
                    description: "Partenariats solides avec les entreprises leaders du marché"
                  }
                ].map((item, index) => (
                  <div key={index} className="d-flex align-items-start">
                    <div 
                      className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3"
                      style={{ width: '40px', height: '40px', flexShrink: 0, marginRight: '0.75rem' }}
                    >
                      <i className={`bx ${item.icon} text-primary fs-5`}></i>
                    </div>
                    <div>
                      <h4 className="h6 mb-1">{item.title}</h4>
                      <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/about" 
                className="btn btn-primary rounded-pill px-4 py-2"
                style={{ fontSize: '0.95rem' }}
              >
                Découvrir notre école <i className='bx bx-right-arrow-alt ms-2'></i>
              </Link>
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
                    "La formation en Management à Horizons School m'a fourni une base solide pour ma carrière. Les cours pratiques et les études de cas réels m'ont préparé aux défis du monde professionnel."
                  </p>
                  <div className="text-center mb-4">
                    <h5 className="mb-1">Yassine Fatih</h5>
                    <p className="text-muted mb-0">Promotion 2024 - Responsable Marketing Digital</p>
                  </div>
                </Carousel.Item>

                <Carousel.Item className="text-center px-5">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bx bxs-star text-warning fs-4"></i>
                    ))}
                  </div>
                  <p className="lead fst-italic mb-4">
                    "Le programme de Finance m'a donné une perspective approfondie du secteur financier. Les professeurs expérimentés et le réseau professionnel de l'école ont été déterminants dans mon parcours."
                  </p>
                  <div className="text-center mb-4">
                    <h5 className="mb-1">Abdelah El Kabir</h5>
                    <p className="text-muted mb-0">Promotion 2024 - Analyste Financier</p>
                  </div>
                </Carousel.Item>

                <Carousel.Item className="text-center px-5">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bx bxs-star text-warning fs-4"></i>
                    ))}
                  </div>
                  <p className="lead fst-italic mb-4">
                    "La formation en Ressources Humaines est complète et actualisée. J'ai particulièrement apprécié les ateliers pratiques et les interventions de professionnels du secteur."
                  </p>
                  <div className="text-center mb-4">
                    <h5 className="mb-1">Sara Naji</h5>
                    <p className="text-muted mb-0">Promotion 2024 - Responsable RH</p>
                  </div>
                </Carousel.Item>

                <Carousel.Item className="text-center px-5">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bx bxs-star text-warning fs-4"></i>
                    ))}
                  </div>
                  <p className="lead fst-italic mb-4">
                    "Le cursus en Commerce International m'a ouvert des portes vers une carrière internationale. Les cours de langues et la dimension multiculturelle de la formation sont de vrais atouts."
                  </p>
                  <div className="text-center mb-4">
                    <h5 className="mb-1">Houda Miri</h5>
                    <p className="text-muted mb-0">Promotion 2024 - Gestion d'entreprise</p>
                  </div>
                </Carousel.Item>

                <Carousel.Item className="text-center px-5">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="bx bxs-star text-warning fs-4"></i>
                    ))}
                  </div>
                  <p className="lead fst-italic mb-4">
                    "L'approche pédagogique innovante et l'accent mis sur les projets pratiques m'ont permis de développer des compétences directement applicables dans mon travail actuel."
                  </p>
                  <div className="text-center mb-4">
                    <h5 className="mb-1">Sara Naji</h5>
                    <p className="text-muted mb-0">Promotion 2023 - Chef de Projet Digital</p>
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
              <Link to="/news" className="btn btn-outline-primary">
                Voir toutes les actualités
              </Link>
            </Col>
          </Row>
          <NewsSection />
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
            <Col xs={6} sm={4} md={2} data-aos="fade-up" data-aos-delay="100">
              <div className="bg-white p-3 rounded-3 shadow-sm h-100 d-flex align-items-center justify-content-center">
                <img 
                  src="/images/toubkal.png"
                  alt="Toubkal Centrale"
                  className="img-fluid"
                  style={{
                    maxHeight: '80px',
                    filter: 'grayscale(100%)', 
                    opacity: 0.7, 
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.opacity = '0.7';
                  }}
                />
              </div>
            </Col>
            <Col xs={6} sm={4} md={2} data-aos="fade-up" data-aos-delay="200">
              <div className="bg-white p-3 rounded-3 shadow-sm h-100 d-flex align-items-center justify-content-center">
                <img 
                  src="/images/logo-ifps.png"
                  alt="IFPS"
                  className="img-fluid"
                  style={{
                    maxHeight: '80px',
                    filter: 'grayscale(100%)', 
                    opacity: 0.7, 
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.opacity = '0.7';
                  }}
                />
              </div>
            </Col>
            <Col xs={6} sm={4} md={2} data-aos="fade-up" data-aos-delay="300">
              <div className="bg-white p-3 rounded-3 shadow-sm h-100 d-flex align-items-center justify-content-center">
                <img 
                  src="/images/logo,accreditation.png"
                  alt="Accréditation"
                  className="img-fluid"
                  style={{
                    maxHeight: '80px',
                    filter: 'grayscale(100%)', 
                    opacity: 0.7, 
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.opacity = '0.7';
                  }}
                />
              </div>
            </Col>
            <Col xs={6} sm={4} md={2} data-aos="fade-up" data-aos-delay="400">
              <div className="bg-white p-3 rounded-3 shadow-sm h-100 d-flex align-items-center justify-content-center">
                <img 
                  src="/images/logo,Europe.png"
                  alt="Europe"
                  className="img-fluid"
                  style={{
                    maxHeight: '80px',
                    filter: 'grayscale(100%)', 
                    opacity: 0.7, 
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.opacity = '0.7';
                  }}
                />
              </div>
            </Col>
            <Col xs={6} sm={4} md={2} data-aos="fade-up" data-aos-delay="500">
              <div className="bg-white p-3 rounded-3 shadow-sm h-100 d-flex align-items-center justify-content-center">
                <img 
                  src="/images/logo,fp.jpg"
                  alt="FP"
                  className="img-fluid"
                  style={{
                    maxHeight: '80px',
                    filter: 'grayscale(100%)', 
                    opacity: 0.7, 
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.opacity = '0.7';
                  }}
                />
              </div>
            </Col>
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
              <Link 
                to="/programs" 
                className="btn btn-light btn-lg me-2 mb-2"
              >
                Découvrir nos formations
              </Link>
              <Link 
                to="/contact" 
                className="btn btn-outline-light btn-lg"
              >
                Nous contacter
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home; 