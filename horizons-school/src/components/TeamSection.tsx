import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import ImageWithFallback from './ui/ImageWithFallback';
import { getTeamMembers } from '../utils/api';
import 'boxicons/css/boxicons.min.css';

export interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  department: string;
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  experience?: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  specializations?: string[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    website?: string;
  };
  order: number;
  isActive: boolean;
  isFeatured?: boolean;
}

interface TeamSectionProps {
  title?: string;
  department?: string;
  limit?: number;
  showFeaturedOnly?: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ 
  title = "Notre Équipe Pédagogique",
  department,
  limit,
  showFeaturedOnly = false
}) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await getTeamMembers();
        
        // Check if response is an array (successful response)
        if (Array.isArray(response)) {
          // Filter by department if specified
          let filteredMembers = [...response];
          
          if (department) {
            filteredMembers = filteredMembers.filter(member => 
              member.department === department
            );
          }
          
          // Filter by featured status if specified
          if (showFeaturedOnly) {
            filteredMembers = filteredMembers.filter(member => 
              member.isFeatured === true
            );
          }
            
          // Apply limit if specified
          if (limit && filteredMembers.length > limit) {
            filteredMembers = filteredMembers.slice(0, limit);
          }
          
          setTeamMembers(filteredMembers);
          setError(null);
        } else if (response && 'error' in response) {
          // Handle API error
          console.error('API error:', (response as {error: string}).error);
          setError('Failed to load team members: ' + (response as {error: string}).error);
        } else {
          // Unexpected response format
          console.error('Unexpected response format:', response);
          setError('Failed to load team members: Unexpected response format');
        }
      } catch (err) {
        console.error('Error loading team members:', err);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, [department, limit, showFeaturedOnly]);

  const handleShowDetails = (member: TeamMember) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return (
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">{title}</h2>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">{title}</h2>
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        </Container>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5" data-aos="fade-up">{title}</h2>
          <div className="text-center">
            <p>No team members found.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5" data-aos="fade-up">{title}</h2>
        <Row className="g-4">
          {teamMembers.map((member, index) => (
            <Col key={member._id || index} xs={12} sm={6} md={4} lg={3}>
              <Card 
                className="h-100 team-card" 
                data-aos="fade-up" 
                data-aos-delay={100 + (index * 50)}
              >
                <div className="text-center p-3">
                  <div className="mb-3 mx-auto" style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden' }}>
                    <ImageWithFallback 
                      src={member.image ? `/uploads/team/${member.image}` : undefined}
                      alt={member.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      fallbackIcon={<i className='bx bxs-user text-secondary' style={{ fontSize: '3rem' }}></i>}
                    />
                  </div>
                  <Card.Title as="h5">{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.position}</Card.Subtitle>
                  
                  {/* Social links if available */}
                  {member.socialLinks && (
                    <div className="social-links mt-2 mb-3">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="me-2">
                          <i className='bx bxl-linkedin text-primary' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="me-2">
                          <i className='bx bxl-twitter text-info' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                      {member.socialLinks.email && (
                        <a href={`mailto:${member.socialLinks.email}`} className="me-2">
                          <i className='bx bx-envelope text-danger' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                      {member.socialLinks.website && (
                        <a href={member.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <i className='bx bx-globe text-success' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                    </div>
                  )}
                  
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => handleShowDetails(member)}
                    className="mt-2"
                  >
                    Voir le profil
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Team Member Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        {selectedMember && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMember.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column flex-md-row">
                <div className="text-center mb-4 mb-md-0 me-md-4" style={{ minWidth: '150px' }}>
                  <div className="mb-3 mx-auto" style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden' }}>
                    <ImageWithFallback 
                      src={selectedMember.image ? `/uploads/team/${selectedMember.image}` : undefined}
                      alt={selectedMember.name}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      fallbackIcon={<i className='bx bxs-user text-secondary' style={{ fontSize: '4rem' }}></i>}
                    />
                  </div>
                  <h5 className="mb-1">{selectedMember.name}</h5>
                  <p className="text-muted">{selectedMember.position}</p>
                  
                  {/* Social links in modal */}
                  {selectedMember.socialLinks && (
                    <div className="social-links mt-3">
                      {selectedMember.socialLinks.linkedin && (
                        <a href={selectedMember.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="me-2">
                          <i className='bx bxl-linkedin text-primary' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                      {selectedMember.socialLinks.twitter && (
                        <a href={selectedMember.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="me-2">
                          <i className='bx bxl-twitter text-info' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                      {selectedMember.socialLinks.email && (
                        <a href={`mailto:${selectedMember.socialLinks.email}`} className="me-2">
                          <i className='bx bx-envelope text-danger' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                      {selectedMember.socialLinks.website && (
                        <a href={selectedMember.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <i className='bx bx-globe text-success' style={{ fontSize: '1.5rem' }}></i>
                        </a>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex-grow-1">
                  <h4>Biographie</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>{selectedMember.bio}</p>
                  
                  {/* Education */}
                  {selectedMember.education && selectedMember.education.length > 0 && (
                    <div className="mt-4">
                      <h4>Formation</h4>
                      <ul className="list-unstyled">
                        {selectedMember.education.map((edu, index) => (
                          <li key={index} className="mb-3">
                            <div className="d-flex">
                              <i className='bx bxs-graduation me-2 mt-1 text-primary' style={{ fontSize: '1.2rem' }}></i>
                              <div>
                                <h5 className="mb-1">{edu.degree}</h5>
                                <p className="mb-0">{edu.institution}</p>
                                <small className="text-muted">{edu.year}</small>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Experience */}
                  {selectedMember.experience && selectedMember.experience.length > 0 && (
                    <div className="mt-4">
                      <h4>Expérience</h4>
                      <ul className="list-unstyled">
                        {selectedMember.experience.map((exp, index) => (
                          <li key={index} className="mb-3">
                            <div className="d-flex">
                              <i className='bx bx-briefcase me-2 mt-1 text-primary' style={{ fontSize: '1.2rem' }}></i>
                              <div>
                                <h5 className="mb-1">{exp.title}</h5>
                                <p className="mb-0">{exp.company}</p>
                                <small className="text-muted">{exp.period}</small>
                                {exp.description && (
                                  <p className="mt-2">{exp.description}</p>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Specializations */}
                  {selectedMember.specializations && selectedMember.specializations.length > 0 && (
                    <div className="mt-4">
                      <h4>Spécialisations</h4>
                      <div>
                        {selectedMember.specializations.map((spec, index) => (
                          <span key={index} className="badge bg-primary me-2 mb-2" style={{ fontSize: '0.9rem' }}>
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fermer
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </section>
  );
};

export default TeamSection;