import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import 'boxicons/css/boxicons.min.css';
import AOS from 'aos';

const Programs: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <>
      {/* Programs Hero */}
      <section className="bg-primary text-white py-5 mb-5">
        <Container className="py-3">
          <Row>
            <Col lg={8} className="mx-auto text-center" data-aos="fade-up">
              <h1 className="display-5 fw-bold mb-4">Nos Programmes de Formation</h1>
              <p className="lead">
                Découvrez nos programmes conçus pour développer vos compétences et vous préparer 
                à une carrière réussie dans le monde des affaires.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Programs */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-right">
              <img 
                src="/images/management.jpg" 
                alt="Programme de Management" 
                className="img-fluid rounded-3 shadow"
              />
            </Col>
            <Col lg={6} data-aos="fade-left">
              <div className="d-flex align-items-center mb-3">
                <i className='bx bx-graduation text-primary fs-1 me-3'></i>
                <h2 className="mb-0">Management</h2>
              </div>
              <p className="lead mb-3">
                Formez-vous aux techniques modernes de gestion d'entreprise et développez 
                vos compétences en leadership.
              </p>
              <p className="mb-4">
                Notre programme de management vous prépare à assumer des responsabilités de 
                direction dans divers secteurs d'activité. Vous acquerrez des compétences en 
                planification stratégique, gestion de projets, prise de décision et leadership.
              </p>
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Objectifs de la formation</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Maîtriser les techniques de gestion d'entreprise</li>
                      <li>Développer des compétences en leadership et management d'équipe</li>
                      <li>Acquérir une vision stratégique et globale de l'entreprise</li>
                      <li>Apprendre à gérer des projets complexes</li>
                      <li>Comprendre les enjeux financiers et organisationnels</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Débouchés professionnels</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Directeur commercial</li>
                      <li>Chef de projet</li>
                      <li>Responsable d'unité opérationnelle</li>
                      <li>Consultant en organisation</li>
                      <li>Entrepreneur</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button variant="primary" href="#/contact">Demander plus d'informations</Button>
            </Col>
          </Row>

          <hr className="my-5" />

          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0 order-lg-2" data-aos="fade-left">
              <img 
                src="/images/hr.jpg" 
                alt="Programme de Ressources Humaines" 
                className="img-fluid rounded-3 shadow"
              />
            </Col>
            <Col lg={6} className="order-lg-1" data-aos="fade-right">
              <div className="d-flex align-items-center mb-3">
                <i className='bx bx-group text-primary fs-1 me-3'></i>
                <h2 className="mb-0">Ressources Humaines</h2>
              </div>
              <p className="lead mb-3">
                Devenez un expert en gestion du capital humain et développez des stratégies 
                RH innovantes et efficaces.
              </p>
              <p className="mb-4">
                Ce programme vous forme aux différentes facettes de la gestion des ressources 
                humaines dans un contexte en constante évolution. Vous apprendrez à recruter, 
                former, évaluer et fidéliser les talents au sein d'une organisation.
              </p>
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Objectifs de la formation</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Maîtriser les techniques de recrutement et sélection</li>
                      <li>Développer des plans de formation efficaces</li>
                      <li>Concevoir des systèmes d'évaluation de performance</li>
                      <li>Comprendre le droit du travail et la réglementation</li>
                      <li>Élaborer des stratégies de rétention des talents</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Débouchés professionnels</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Responsable des ressources humaines</li>
                      <li>Chargé de recrutement</li>
                      <li>Responsable formation</li>
                      <li>Consultant en développement organisationnel</li>
                      <li>Gestionnaire de talents</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button variant="primary" href="#/contact">Demander plus d'informations</Button>
            </Col>
          </Row>

          <hr className="my-5" />

          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-right">
              <img 
                src="/images/finance.jpg" 
                alt="Programme de Finance" 
                className="img-fluid rounded-3 shadow"
              />
            </Col>
            <Col lg={6} data-aos="fade-left">
              <div className="d-flex align-items-center mb-3">
                <i className='bx bx-line-chart text-primary fs-1 me-3'></i>
                <h2 className="mb-0">Finance</h2>
              </div>
              <p className="lead mb-3">
                Développez une expertise en analyse financière, gestion des investissements 
                et planification stratégique.
              </p>
              <p className="mb-4">
                Notre programme de finance vous prépare à analyser, gérer et optimiser les 
                ressources financières d'une organisation. Vous acquerrez des compétences 
                en analyse de données, gestion de portefeuille, et prise de décision financière.
              </p>
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Objectifs de la formation</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Maîtriser l'analyse financière et comptable</li>
                      <li>Comprendre les marchés financiers</li>
                      <li>Développer des compétences en gestion de trésorerie</li>
                      <li>Évaluer et gérer les risques financiers</li>
                      <li>Élaborer des stratégies d'investissement</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Débouchés professionnels</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Analyste financier</li>
                      <li>Contrôleur de gestion</li>
                      <li>Gestionnaire de portefeuille</li>
                      <li>Responsable financier</li>
                      <li>Consultant en finance d'entreprise</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button variant="primary" href="#/contact">Demander plus d'informations</Button>
            </Col>
          </Row>

          <hr className="my-5" />

          <Row>
            <Col lg={6} className="mb-4 mb-lg-0 order-lg-2" data-aos="fade-left">
              <img 
                src="/images/commerce.jpg" 
                alt="Programme de Commerce" 
                className="img-fluid rounded-3 shadow"
              />
            </Col>
            <Col lg={6} className="order-lg-1" data-aos="fade-right">
              <div className="d-flex align-items-center mb-3">
                <i className='bx bx-laptop text-primary fs-1 me-3'></i>
                <h2 className="mb-0">Commerce</h2>
              </div>
              <p className="lead mb-3">
                Maîtrisez les techniques de marketing, vente et négociation pour exceller 
                dans le monde des affaires.
              </p>
              <p className="mb-4">
                Ce programme vous forme aux différentes techniques commerciales et marketing, 
                essentielles pour développer une activité et conquérir de nouveaux marchés. 
                Vous apprendrez à élaborer des stratégies commerciales efficaces et à les mettre en œuvre.
              </p>
              <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Objectifs de la formation</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Maîtriser les techniques de vente et négociation</li>
                      <li>Développer des stratégies marketing adaptées</li>
                      <li>Comprendre le comportement des consommateurs</li>
                      <li>Gérer une relation client de qualité</li>
                      <li>Analyser les marchés et la concurrence</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Débouchés professionnels</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Responsable commercial</li>
                      <li>Chef de produit</li>
                      <li>Responsable marketing</li>
                      <li>Business developer</li>
                      <li>Responsable e-commerce</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Button variant="primary" href="#/contact">Demander plus d'informations</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Programs;