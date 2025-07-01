import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPrograms } from '../utils/api';

interface Program {
  _id?: string;
  id?: number;
  title: string;
  description?: string;
  category?: string;
  level?: string;
  image?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  icon?: string;
}

// Static programs data as fallback
const staticPrograms: Program[] = [
  {
    id: 1,
    title: 'Management',
    description: 'Développez vos compétences en gestion d\'entreprise et leadership.',
    category: 'Management',
    icon: 'management-image' // Special marker for management
  },
  {
    id: 2,
    title: 'Ressources Humaines',
    description: 'Maîtrisez les techniques modernes de gestion du capital humain.',
    category: 'RH',
    icon: 'bx bx-group'
  },
  {
    id: 3,
    title: 'Finance',
    description: 'Apprenez à analyser, prévoir et optimiser les ressources financières.',
    category: 'Finance',
    icon: 'bx bx-line-chart'
  },
  {
    id: 4,
    title: 'Commerce',
    description: 'Développez vos compétences en marketing, vente et stratégies commerciales.',
    category: 'Commerce',
    icon: 'bx bx-store'
  }
];



const ProgramsSection: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>(staticPrograms);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingStaticData, setUsingStaticData] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPrograms();
        console.log('API Programs response:', response);
        
        // Check if response is an array (successful response)
        if (Array.isArray(response) && response.length > 0) {
          // Map API data to the format expected by the component
          const apiPrograms: Program[] = response.map((item: any) => ({
            _id: item._id,
            title: item.title,
            description: item.description,
            category: item.category,
            level: item.level,
            image: item.image ? `http://localhost:5000/uploads/programs/${item.image}` : undefined,
            isActive: item.isActive,
            isFeatured: item.isFeatured,
            // Assign default icons based on category
            icon: item.category?.toLowerCase() === 'management' ? 'management-image' : getIconByCategory(item.category)
          }));
          
          // Only use API data if there are items and they are active
          const activeApiPrograms = apiPrograms.filter(item => item.isActive !== false);
          if (activeApiPrograms.length > 0) {
            // Take only the first 4 items for the home page
            setPrograms(activeApiPrograms.slice(0, 4));
            setUsingStaticData(false);
          } else {
            // No active programs, use static data
            setError('Utilisation des données statiques (mode démonstration)');
            setUsingStaticData(true);
          }
        } else if (response && typeof response === 'object' && 'error' in response) {
          // Handle API error
          console.error('API error:', (response as {error: string}).error);
          setError('Utilisation des données statiques (mode démonstration)');
          setUsingStaticData(true);
        } else {
          // Unexpected response format
          console.error('Unexpected response format:', response);
          setError('Utilisation des données statiques (mode démonstration)');
          setUsingStaticData(true);
        }
      } catch (err) {
        console.error('Failed to fetch programs:', err);
        // Keep using static data as fallback
        setError('Utilisation des données statiques (mode démonstration)');
        setUsingStaticData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);
  
  // Helper function to assign icons based on category
  const getIconByCategory = (category: string): string => {
    switch(category?.toLowerCase()) {
      case 'management':
        return 'management-image'; // Special marker for management
      case 'ressources humaines':
      case 'human resources':
      case 'rh':
        return 'bx bx-group';
      case 'finance':
        return 'bx bx-line-chart';
      case 'commerce':
      case 'marketing':
        return 'bx bx-store';
      default:
        return 'bx bx-book-open';
    }
  };

  // Helper function to render the icon or image
  const renderIconOrImage = (program: Program) => {
    if (program.icon === 'management-image') {
      return (
        <img 
          src="/images/managment-icon.jpg" 
          alt="Management Icon" 
          style={{ width: '60px', height: '60px', objectFit: 'contain' }}
        />
      );
    } else {
      return <i className={`${program.icon} fs-1 text-primary`}></i>;
    }
  };

  return (
    <div className="container py-3">
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {error && !usingStaticData && (
            <Alert variant="info" className="text-center mb-4">
              {error}
            </Alert>
          )}
          <Row className="g-4">
            {programs.map((program, index) => (
              <Col md={6} lg={3} key={program._id || program.id} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                <Card className="h-100 border-0 shadow-sm text-center p-4 hover-lift d-flex flex-column" style={{ transition: 'all 0.3s ease' }}>
                  <div className="text-primary mb-3 d-flex justify-content-center align-items-center">
                    {renderIconOrImage(program)}
                  </div>
                  <Card.Body className="px-0 d-flex flex-column flex-grow-1">
                    <Card.Title className="fw-bold mb-3">{program.title}</Card.Title>
                    <Card.Text className="text-muted mb-4 flex-grow-1">
                      {program.description}
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
                          display: 'inline-block',
                          margin: '0 auto'
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
        </>
      )}
    </div>
  );
};

export default ProgramsSection;