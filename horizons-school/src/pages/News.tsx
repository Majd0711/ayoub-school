import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface NewsItem {
  id: number;
  type: 'Événement' | 'Actualité' | 'Atelier';
  date: string;
  title: string;
  description: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    type: 'Événement',
    date: '15 Juin 2025',
    title: 'Journée Portes Ouvertes',
    description: 'Découvrez nos locaux, rencontrez nos enseignants et nos étudiants lors de notre prochaine journée portes ouvertes.',
    image: '/images/event1.jpg'
  },
  {
    id: 2,
    type: 'Actualité',
    date: '5 Juin 2025',
    title: 'Nouveau Partenariat International',
    description: 'Horizons School signe un nouveau partenariat avec une prestigieuse université européenne pour des échanges étudiants.',
    image: '/images/news1.jpg'
  },
  {
    id: 3,
    type: 'Atelier',
    date: '22 Juin 2025',
    title: 'Atelier sur l\'Intelligence Artificielle',
    description: 'Participez à notre atelier pratique sur les dernières avancées en intelligence artificielle et leurs applications métiers.',
    image: '/images/event2.jpg'
  },
  {
    id: 4,
    type: 'Événement',
    date: '10 Juillet 2025',
    title: 'Cérémonie de Remise des Diplômes',
    description: 'Rejoignez-nous pour célébrer la réussite de nos diplômés de la promotion 2025.',
    image: '/images/graduation.jpg'
  },
  {
    id: 5,
    type: 'Actualité',
    date: '1 Juin 2025',
    title: 'Nouveau Programme de Double Diplôme',
    description: 'Horizons School lance un nouveau programme de double diplôme en partenariat avec une université canadienne.',
    image: '/images/program.jpg'
  },
  {
    id: 6,
    type: 'Atelier',
    date: '29 Juin 2025',
    title: 'Workshop Marketing Digital',
    description: 'Un atelier pratique sur les dernières tendances en marketing digital et réseaux sociaux.',
    image: '/images/workshop.jpg'
  }
];

const News: React.FC = () => {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'Événement':
        return 'primary';
      case 'Actualité':
        return 'success';
      case 'Atelier':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">Actualités & Événements</h1>
              <p className="lead mb-0">
                Restez informé des dernières nouvelles, événements et activités d'Horizons School
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News Grid */}
      <section className="py-5">
        <Container>
          <Row>
            {newsItems.map((item) => (
              <Col md={6} lg={4} className="mb-4" key={item.id} data-aos="fade-up">
                <Card className="h-100 border-0 shadow-sm hover-lift">
                  <div className="card-img-top overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{height: '200px', width: '100%', objectFit: 'cover'}}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex mb-2">
                      <span className={`badge bg-${getBadgeVariant(item.type)} me-2`}>
                        {item.type}
                      </span>
                      <small className="text-muted">{item.date}</small>
                    </div>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default News; 