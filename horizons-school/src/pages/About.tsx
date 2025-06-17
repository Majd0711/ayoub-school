import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';
import AOS from 'aos';

const About: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
      {/* About Hero */}
      <section className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right">
              <h1 className="display-5 fw-bold mb-4">À Propos de Horizons School</h1>
              <p className="lead mb-4">
                Horizons School est une institution d'enseignement supérieur dédiée à l'excellence académique
                et à la préparation des étudiants pour réussir dans le monde professionnel.
              </p>
              <p>
                Fondée en 2010 à Marrakech, notre école s'est engagée à offrir des programmes éducatifs 
                de haute qualité qui répondent aux exigences du marché du travail actuel. Nous combinons 
                l'enseignement théorique avec des expériences pratiques pour former des professionnels 
                compétents et adaptables.
              </p>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0" data-aos="fade-left">
              <img 
                src="/images/school-building.jpg" 
                alt="Bâtiment Horizons School" 
                className="img-fluid rounded-3 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-5">
        <Container>
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-up">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h2 className="mb-4">Notre Mission</h2>
                  <p>
                    Notre mission est de former des professionnels qualifiés et compétents, 
                    capables de répondre aux défis du monde des affaires et de contribuer au 
                    développement économique et social du Maroc.
                  </p>
                  <ul className="list-unstyled mt-4">
                    <li className="mb-3 d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Fournir une éducation de qualité supérieure</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Préparer les étudiants aux exigences du marché du travail</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Promouvoir l'innovation et l'entrepreneuriat</span>
                    </li>
                    <li className="d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Encourager la responsabilité sociale et éthique</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} data-aos="fade-up" data-aos-delay="200">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h2 className="mb-4">Notre Vision</h2>
                  <p>
                    Nous aspirons à devenir une institution de référence dans le domaine de 
                    l'enseignement supérieur au Maroc et en Afrique, reconnue pour l'excellence 
                    de ses programmes et la qualité de ses diplômés.
                  </p>
                  <ul className="list-unstyled mt-4">
                    <li className="mb-3 d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Être reconnu comme un centre d'excellence académique</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Développer des partenariats internationaux</span>
                    </li>
                    <li className="mb-3 d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Favoriser un environnement d'apprentissage innovant</span>
                    </li>
                    <li className="d-flex">
                      <i className='bx bx-check-circle text-primary mt-1 me-3'></i>
                      <span>Contribuer au développement durable de notre société</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Team */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">Notre Équipe Pédagogique</h2>
          <Row>
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Img variant="top" src="/images/teacher1.jpg" alt="Professeur" className="img-fluid" />
                <Card.Body>
                  <Card.Title className="fw-bold">Dr. Mohammed Alami</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Directeur des Études</Card.Subtitle>
                  <Card.Text>
                    Docteur en sciences de gestion avec plus de 15 ans d'expérience dans l'enseignement supérieur.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Img variant="top" src="/images/teacher2.jpg" alt="Professeur" className="img-fluid" />
                <Card.Body>
                  <Card.Title className="fw-bold">Pr. Fatima Bensouda</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Responsable Finance</Card.Subtitle>
                  <Card.Text>
                    Spécialiste en finance d'entreprise avec une expérience professionnelle dans le secteur bancaire.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="300">
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Img variant="top" src="/images/teacher3.jpg" alt="Professeur" className="img-fluid" />
                <Card.Body>
                  <Card.Title className="fw-bold">Dr. Ahmed Benani</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Responsable Marketing</Card.Subtitle>
                  <Card.Text>
                    Expert en stratégies marketing avec une vaste expérience dans le conseil aux entreprises.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="400">
              <Card className="border-0 shadow-sm text-center h-100">
                <Card.Img variant="top" src="/images/teacher4.jpg" alt="Professeur" className="img-fluid" />
                <Card.Body>
                  <Card.Title className="fw-bold">Pr. Nadia Tazi</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Responsable RH</Card.Subtitle>
                  <Card.Text>
                    Spécialiste en gestion des ressources humaines avec une expérience internationale.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;