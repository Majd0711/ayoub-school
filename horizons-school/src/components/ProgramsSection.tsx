import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* ---------- Data & types ---------- */
interface Program {
  id: number;
  title: string;
  description: string;
  level: 'Licence' | 'Master';
  icon: string;            // Boxicons class
}

const programs: Program[] = [
  {
    id: 1,
    title: 'Licence Management',
    description:
      "Bases solides en management, leadership et stratégie d'entreprise.",
    level: 'Licence',
    icon: 'bx bx-briefcase-alt-2',
  },
  {
    id: 2,
    title: 'Licence Marketing',
    description:
      'Fondamentaux du marketing digital et traditionnel, du marché à la campagne.',
    level: 'Licence',
    icon: 'bx bx-bullseye',
  },
  {
    id: 3,
    title: 'Master Finance',
    description:
      'Analyse financière avancée, gestion des investissements et corporate finance.',
    level: 'Master',
    icon: 'bx bx-line-chart',
  },
  {
    id: 4,
    title: 'Master Logistique',
    description:
      'Optimisation de la supply-chain, gestion de stock et logistique internationale.',
    level: 'Master',
    icon: 'bx bx-package',
  },
];

/* ---------- Helpers ---------- */
const renderIcon = (p: Program) => (
  <i className={`${p.icon} fs-1 text-primary`}></i>
);

/* ---------- Component ---------- */
const ProgramsSection: React.FC = () => (
  <div className="container py-3">
    <Row className="g-4">
      {programs.map((p, idx) => (
        <Col
          md={6}
          lg={3}
          key={p.id}
          data-aos="fade-up"
          data-aos-delay={(idx + 1) * 100}
        >
          <Card className="h-100 border-0 shadow-sm text-center p-4 hover-lift d-flex flex-column">
            <div className="text-primary mb-3 d-flex justify-content-center align-items-center">
              {renderIcon(p)}
            </div>

            <Card.Body className="px-0 d-flex flex-column flex-grow-1">
              <Card.Title className="fw-bold mb-2">{p.title}</Card.Title>
              <span
                className={`badge ${
                  p.level === 'Master'
                    ? 'bg-warning text-dark'
                    : 'bg-info text-dark'
                } mb-2`}
                style={{ alignSelf: 'center' }}
              >
                {p.level}
              </span>
              <Card.Text className="text-muted mb-4 flex-grow-1">
                {p.description}
              </Card.Text>

              <div className="mt-auto">
                <Link
                  to="/programs"
                  className="btn btn-outline-primary px-4"
                  style={{
                    borderRadius: '50px',
                    padding: '0.5rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  En savoir plus
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default ProgramsSection;