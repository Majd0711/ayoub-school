import React, { useEffect } from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import ProgramCard from '../components/ProgramCard';
import { programs } from '../data/programs';

const Programs: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
      {/* Programs Hero */}
      <motion.section 
        className="programs-hero text-white py-5 mb-5 position-relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/programs-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
          <Row className="align-items-center min-vh-50">
            <Col lg={8} className="mx-auto text-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="display-4 fw-bold mb-4">
                  Nos Programmes de Formation
                </h1>
                <p className="lead fs-4">
                  Découvrez nos programmes conçus pour développer vos compétences et vous préparer 
                  à une carrière réussie dans le monde professionnel.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Program Structure Section */}
      <motion.section 
        className="py-5 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary mb-3 px-4 py-2 rounded-pill">Notre Approche</span>
            <h2 className="display-5 fw-bold mb-3">Structure des Programmes de Formation</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Une architecture pédagogique conçue pour former les leaders de demain à travers un apprentissage progressif et professionnalisant
            </p>
          </div>

          {/* Program Structure Timeline */}
          <div className="position-relative py-4">
            {/* Timeline Line */}
            <div className="timeline-line position-absolute top-0 start-50 translate-middle-x h-100 d-none d-md-block">
              <div className="bg-primary" style={{ width: '2px', height: '100%', margin: '0 auto' }}></div>
            </div>
            
            {/* Timeline Items */}
            <div className="row g-4 position-relative">
              {/* Cycle Préparatoire */}
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bx bx-layer text-primary fs-3"></i>
                      </div>
                      <h3 className="h4 mb-0">Cycle Préparatoire</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Acquisition des fondamentaux théoriques et méthodologiques nécessaires à la spécialisation
                    </p>
                    <ul className="list-unstyled mt-3 mb-0">
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Tronc commun renforcé</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Méthodologie de travail universitaire</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Projets transversaux</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cycle d'Approfondissement */}
              <div className="col-md-6 mt-md-5">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bx bx-target-lock text-primary fs-3"></i>
                      </div>
                      <h3 className="h4 mb-0">Cycle d'Approfondissement</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Spécialisation progressive avec des enseignements avancés et des parcours personnalisables
                    </p>
                    <ul className="list-unstyled mt-3 mb-0">
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Parcours de spécialisation</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Projets professionnels</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Préparation à l'insertion professionnelle</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stage & Expérience Professionnelle */}
              <div className="col-md-6 mb-4 mb-md-0">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bx bx-briefcase-alt-2 text-primary fs-3"></i>
                      </div>
                      <h3 className="h4 mb-0">Stage & Expérience Pro</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Mise en pratique des acquis à travers des stages en entreprise et des projets concrets
                    </p>
                    <ul className="list-unstyled mt-3 mb-0">
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Stages obligatoires</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Projets en partenariat avec des entreprises</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Ateliers professionnels</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Projet de Fin d'Études */}
              <div className="col-md-6">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                        <i className="bx bx-trophy text-primary fs-3"></i>
                      </div>
                      <h3 className="h4 mb-0">Projet de Fin d'Études</h3>
                    </div>
                    <p className="text-muted mb-0">
                      Réalisation d'un projet d'envergure qui synthétise l'ensemble des compétences acquises
                    </p>
                    <ul className="list-unstyled mt-3 mb-0">
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Travail de recherche appliquée</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Défense devant un jury professionnel</li>
                      <li className="mb-2"><i className="bx bx-check-circle text-primary me-2"></i> Valorisation du projet professionnel</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <Row className="mt-5 g-4">
            <Col md={4}>
              <div className="text-center p-4 bg-light rounded-3 h-100">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bx bx-book-open text-primary fs-3"></i>
                </div>
                <h3 className="h5 mb-3">Pédagogie Active</h3>
                <p className="text-muted mb-0">
                  Méthodes d'apprentissage innovantes centrées sur l'étudiant et ses projets
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 bg-light rounded-3 h-100">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bx bx-briefcase-alt-2 text-primary fs-3"></i>
                </div>
                <h3 className="h5 mb-3">Expertise Professionnelle</h3>
                <p className="text-muted mb-0">
                  Interventions d'experts et professionnels en activité dans chaque domaine
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 bg-white rounded-3 shadow-sm h-100">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                  <i className="bx bx-group text-primary" style={{ fontSize: '2rem' }}></i>
                </div>
                <h3 className="h5 mb-3">Accompagnement Personnalisé</h3>
                <p className="text-muted mb-0">
                  Un suivi individuel pour chaque étudiant tout au long de son parcours.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Quick Navigation */}
      <motion.section 
        className="py-3 bg-light"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Container>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <a href="#technicien" className="btn btn-outline-primary btn-sm rounded-pill px-3">
              Formations Techniques
            </a>
            <a href="#licence" className="btn btn-outline-primary btn-sm rounded-pill px-3">
              Licence Pro
            </a>
            <a href="#master" className="btn btn-outline-primary btn-sm rounded-pill px-3">
              Master Professionnel
            </a>
            <a href="#formation" className="btn btn-outline-primary btn-sm rounded-pill px-3">
              Formations Continues
            </a>
            <a href="#langues" className="btn btn-outline-primary btn-sm rounded-pill px-3">
              Formations en Langues
            </a>
          </div>
        </Container>
      </motion.section>

      {/* Programs Grid */}
      <motion.section 
        className="py-5 programs-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Container>
          {/* Formations Techniques Section */}
          <div id="technicien" className="mb-5">
            <motion.h2 
              className="text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Formations Techniques
            </motion.h2>
            <Row className="g-4">
              {programs
                .filter(program => program.category === 'technicien')
                .map((program, index) => (
                  <Col key={program.id} lg={4} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <ProgramCard {...program} />
                    </motion.div>
                  </Col>
                ))}
            </Row>
          </div>

          {/* Licence Professionnelle Section */}
          <div id="licence" className="my-5 pt-5">
            <motion.h2 
              className="text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Licence Professionnelle
            </motion.h2>
            <Row className="g-4">
              {programs
                .filter(program => program.category === 'licence')
                .map((program, index) => (
                  <Col key={program.id} lg={4} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <ProgramCard {...program} />
                    </motion.div>
                  </Col>
                ))}
            </Row>
          </div>

          {/* Master Professionnel Section */}
          <div id="master" className="my-5 pt-5">
            <motion.h2 
              className="text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Master Professionnel
            </motion.h2>
            <Row className="g-4">
              {programs
                .filter(program => program.category === 'master')
                .map((program, index) => (
                  <Col key={program.id} lg={4} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <ProgramCard {...program} />
                    </motion.div>
                  </Col>
                ))}
            </Row>
          </div>

          {/* Formations Continues Section */}
          <div id="formation" className="my-5 pt-5">
            <motion.h2 
              className="text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Formations Continues
            </motion.h2>
            <Row className="g-4">
              {programs
                .filter(program => program.category === 'formation')
                .map((program, index) => (
                  <Col key={program.id} lg={4} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <ProgramCard {...program} />
                    </motion.div>
                  </Col>
                ))}
            </Row>
          </div>

          {/* Formations en Langues Section */}
          <div id="langues" className="my-5 pt-5">
            <motion.h2 
              className="text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Formations en Langues
            </motion.h2>
            <Row className="g-4">
              {programs
                .filter(program => program.category === 'langues')
                .map((program, index) => (
                  <Col key={program.id} lg={4} md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <ProgramCard {...program} />
                    </motion.div>
                  </Col>
                ))}
            </Row>
          </div>
        </Container>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-5 bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h2 className="h3 mb-4">Prêt à commencer votre formation ?</h2>
              <p className="lead mb-4">
                Les inscriptions sont ouvertes pour l'année académique 2025/2026.
                Places limitées !
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/contact" 
                  className="btn btn-primary btn-lg rounded-pill px-5 text-decoration-none"
                >
                  S'inscrire Maintenant
                </Link>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Additional Info */}
      <motion.section 
        className="py-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Conditions d'admission
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">✓ Baccalauréat ou niveau équivalent</li>
                      <li className="mb-2">✓ Dossier de candidature complet</li>
                      <li className="mb-2">✓ Entretien de motivation</li>
                      <li className="mb-2">✓ Test d'admission selon le programme choisi</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Pourquoi choisir notre école ?
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">✓ Formation professionnelle de qualité</li>
                      <li className="mb-2">✓ Corps enseignant expérimenté</li>
                      <li className="mb-2">✓ Stage en entreprise garanti</li>
                      <li className="mb-2">✓ Accompagnement personnalisé</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </motion.section>
    </>
  );
};

export default Programs;