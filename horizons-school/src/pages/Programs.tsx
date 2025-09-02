import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaBook, FaGraduationCap, FaBriefcase, FaAward } from 'react-icons/fa';

import ProgramCard from '../components/ProgramCard';
import { programs as staticPrograms } from '../data/programs';
import { getPrograms } from '../utils/api';
import './Programs.css';

export interface Program {
  _id: string;
  title: string;
  level: string;
  duration: string;
  features: string[];
  category: string;
}

const Programs: React.FC = () => {

  const [programsData, setProgramsData] = React.useState<Program[]>(staticPrograms as Program[]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getPrograms();
        if (Array.isArray(data)) {
          setProgramsData(data);
        }
      } catch (err) {
        console.error('Failed to fetch programs, using static fallback', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const normalize = (c: string | undefined) => {
    const val = (c || '').trim().toLowerCase();
    switch (val) {
      case 'technicien':
      case 'professional training':
      case 'technician':
        return 'technical';
      case 'licence':
        return 'license';
      case 'formation continue':
        return 'continuous';
      case 'langues':
        return 'languages';
      default:
        return val;
    }
  };

  const programsByCategory = {
    technical: programsData.filter(p => normalize(p.category) === 'technical'),
    license: programsData.filter(p => normalize(p.category) === 'license'),
    master: programsData.filter(p => normalize(p.category) === 'master'),
    continuous: programsData.filter(p => normalize(p.category) === 'continuous'),
    languages: programsData.filter(p => normalize(p.category) === 'languages'),
    others: programsData.filter(p => !p.category || p.category.trim() === '')
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div className="programs-page">
      {/* Hero Section with Marrakech Background */}
      <section className="hero-section" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 26, 51, 0.75), rgba(0, 53, 102, 0.7)), url('/images/arrakesh.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <div className="text-container">
            <h1>Nos Programmes de Formation</h1>
            <p>Découvrez nos programmes conçus pour développer vos compétences et vous préparer à une carrière réussie dans le monde professionnel.</p>
          </div>
        </Container>
      </section>

      {/* Structure Section */}
      <section className="structure-section">
        <Container>
          <div className="text-center mb-5">
            <span className="section-badge">Notre Approche</span>
            <h2 className="section-title">Structure des Programmes de Formation</h2>
            <p className="section-subtitle">
              Une architecture pédagogique conçue pour former les leaders de demain à travers<br />
              un apprentissage progressif et professionnalisant
            </p>
          </div>

          <Row className="structure-items">
            <Col md={6} lg={3}>
              <div className="structure-item">
                <div className="icon-box">
                  <FaBook />
                </div>
                <h4>Cycle Préparatoire</h4>
                <p>Acquisition des fondamentaux théoriques et méthodologiques nécessaires à la spécialisation</p>
                <ul>
                  <li>Tronc commun renforcé</li>
                  <li>Méthodologie de travail universitaire</li>
                  <li>Projets transversaux</li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="structure-item">
                <div className="icon-box">
                  <FaGraduationCap />
                </div>
                <h4>Cycle d'Approfondissement</h4>
                <p>Spécialisation progressive avec des enseignements avancés et des parcours personnalisables</p>
                <ul>
                  <li>Parcours de spécialisation</li>
                  <li>Projets professionnels</li>
                  <li>Préparation à l'insertion professionnelle</li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="structure-item">
                <div className="icon-box">
                  <FaBriefcase />
                </div>
                <h4>Stage & Expérience Pro</h4>
                <p>Mise en pratique des acquis à travers des stages en entreprise et des projets concrets</p>
                <ul>
                  <li>Stages obligatoires</li>
                  <li>Projets en partenariat avec des entreprises</li>
                  <li>Ateliers professionnels</li>
                </ul>
              </div>
            </Col>
            <Col md={6} lg={3}>
              <div className="structure-item">
                <div className="icon-box">
                  <FaAward />
                </div>
                <h4>Projet de Fin d'Études</h4>
                <p>Réalisation d'un projet d'envergure qui synthétise l'ensemble des compétences acquises</p>
                <ul>
                  <li>Travail de recherche appliquée</li>
                  <li>Défense devant un jury professionnel</li>
                  <li>Valorisation du projet professionnel</li>
                </ul>
              </div>
            </Col>
          </Row>

          {/* Quick Navigation */}
          <div className="quick-nav text-center">
            <Button variant="outline-primary" onClick={() => scrollToCategory('technical')}>
              Formations Techniques
            </Button>
            <Button variant="outline-primary" onClick={() => scrollToCategory('license')}>
              Licence Pro
            </Button>
            <Button variant="outline-primary" onClick={() => scrollToCategory('master')}>
              Master Professionnel
            </Button>
            <Button variant="outline-primary" onClick={() => scrollToCategory('continuous')}>
              Formations Continues
            </Button>
            <Button variant="outline-primary" onClick={() => scrollToCategory('languages')}>
              Formations en Langues
            </Button>
            {programsByCategory.others.length > 0 && (
              <Button variant="outline-primary" onClick={() => scrollToCategory('others')}>
                Autres
              </Button>
            )}
          </div>
        </Container>
      </section>

      {/* Programs Sections */}
      <section className="programs-section">
        <Container>
          {/* Technical Programs */}
          {programsByCategory.technical.length > 0 && (
            <div id="technical" className="program-category">
              <h3>Formations Techniques</h3>
              <Row className="g-4">
                {programsByCategory.technical.map((program) => (
                  <Col key={program._id} md={6} lg={4}>
                    <ProgramCard program={program} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* License Programs */}
          {programsByCategory.license.length > 0 && (
            <div id="license" className="program-category">
              <h3>Licence Professionnelle</h3>
              <Row className="g-4">
                {programsByCategory.license.map((program) => (
                  <Col key={program._id} md={6} lg={4}>
                    <ProgramCard program={program} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Master Programs */}
          {programsByCategory.master.length > 0 && (
            <div id="master" className="program-category">
              <h3>Master Professionnel</h3>
              <Row className="g-4">
                {programsByCategory.master.map((program) => (
                  <Col key={program._id} md={6} lg={4}>
                    <ProgramCard program={program} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Continuous Education Programs */}
          {programsByCategory.continuous.length > 0 && (
            <div id="continuous" className="program-category">
              <h3>Formations Continues</h3>
              <Row className="g-4">
                {programsByCategory.continuous.map((program) => (
                  <Col key={program._id} md={6} lg={4}>
                    <ProgramCard program={program} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Language Programs */}
          {programsByCategory.languages.length > 0 && (
            <div id="languages" className="program-category">
              <h3>Formations en Langues</h3>
              <Row className="g-4">
                {programsByCategory.languages.map((program) => (
                  <Col key={program._id} md={6} lg={4}>
                    <ProgramCard program={program} />
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* Others */}
          {programsByCategory.others.length > 0 && (
            <div id="others" className="program-category">
              <h3>Autres Programmes</h3>
              <Row className="g-4">
                {programsByCategory.others.map((program) => (
                  <Col key={program._id} md={6} lg={4}>
                    <ProgramCard program={program} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container className="text-center">
          <h2>Prêt à commencer votre formation ?</h2>
          <p>Les inscriptions sont ouvertes. Places limitées !</p>
          <a 
            href={`https://wa.me/+212604916565?text=${encodeURIComponent('Bonjour, je souhaite m\'inscrire à une formation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            S'inscrire Maintenant
          </a>
        </Container>
      </section>
    </div>
  );
};

export default Programs;