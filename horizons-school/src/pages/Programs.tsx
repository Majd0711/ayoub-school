import React, { useEffect } from 'react';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
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
        className="programs-hero text-white py-5 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Container className="py-5">
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h1 className="display-4 fw-bold mb-4">
                  Nos Programmes de Formation
                </h1>
                <p className="lead">
                  Découvrez nos programmes conçus pour développer vos compétences et vous préparer 
                  à une carrière réussie dans le monde professionnel.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Programs Grid */}
      <motion.section 
        className="py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Container>
          <Row className="g-4">
            {programs.map((program, index) => (
              <Col key={program.id} lg={4} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <ProgramCard {...program} />
                </motion.div>
              </Col>
            ))}
          </Row>
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
              <motion.button
                className="btn btn-primary btn-lg rounded-pill px-5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                S'inscrire Maintenant
              </motion.button>
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