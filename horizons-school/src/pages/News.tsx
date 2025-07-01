import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Badge, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsCalendar, BsSearch, BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { getNews, getNewsById, getImageUrl } from '../utils/api';
import AOS from 'aos';

interface NewsItem {
  id?: number;
  _id?: string;
  type: 'Événement' | 'Actualité' | 'news' | 'event';
  date?: string;
  createdAt?: string;
  eventDate?: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  isActive?: boolean;
  fullContentLoaded?: boolean;
}

// Static news data as fallback
const staticNewsItems: NewsItem[] = [
  {
    id: 1,
    type: 'Événement',
    date: '15 Juin 2025',
    title: 'Journée Portes Ouvertes',
    description: 'Découvrez nos locaux, rencontrez nos enseignants et nos étudiants lors de notre prochaine journée portes ouvertes.',
    image: '/images/1.jpg'
  },
  {
    id: 2,
    type: 'Actualité',
    date: '5 Juin 2025',
    title: 'Nouveau Partenariat International',
    description: 'Horizons School signe un nouveau partenariat avec une prestigieuse université européenne pour des échanges étudiants.',
    image: '/images/2.jpg'
  },
  {
    id: 4,
    type: 'Événement',
    date: '10 Juillet 2025',
    title: 'Cérémonie de Remise des Diplômes',
    description: 'Rejoignez-nous pour célébrer la réussite de nos diplômés de la promotion 2025.',
    image: '/images/students.jpg'
  },
  {
    id: 5,
    type: 'Actualité',
    date: '1 Juin 2025',
    title: 'Nouveau Programme de Double Diplôme',
    description: 'Horizons School lance un nouveau programme de double diplôme en partenariat avec une université canadienne.',
    image: '/images/school-building.jpg'
  }
];

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(staticNewsItems);
  const [filteredItems, setFilteredItems] = useState<NewsItem[]>(staticNewsItems);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('Tous');
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());
  const [loadingItems, setLoadingItems] = useState<Set<string | number>>(new Set());
  const [usingStaticData, setUsingStaticData] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Direct API call to bypass the utility function
      console.log("Making direct API call to news endpoint");
      const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1'}/news`;
      console.log("API URL:", apiUrl);
      
      const response = await fetch(apiUrl);
      console.log("API response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jsonData = await response.json();
      console.log("API response data:", jsonData);
      
      if (jsonData.success && jsonData.data && Array.isArray(jsonData.data) && jsonData.data.length > 0) {
        // Map API data to the format expected by the component
        const apiNewsItems: NewsItem[] = jsonData.data
          .filter((item: any) => item.isActive !== false) // Only filter out explicitly inactive items
          .map((item: any) => ({
            _id: item._id,
            type: mapNewsType(item.type),
            title: item.title,
            description: item.summary || item.content?.substring(0, 150) + '...' || 'Cliquez pour voir plus de détails',
            content: item.content,
            date: item.type === 'event'
              ? new Date(item.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              : new Date(item.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
            image: getImageUrl(item.image, 'news'),
            isActive: item.isActive
          }));
        
        console.log('Mapped news items:', apiNewsItems);
        
        setNewsItems(apiNewsItems);
        setFilteredItems(apiNewsItems);
        setUsingStaticData(false);
      } else {
        console.log('No active news items found, using static data');
        setNewsItems(staticNewsItems);
        setFilteredItems(staticNewsItems);
        setUsingStaticData(true);
        setError('Aucune actualité trouvée. Affichage des données statiques.');
      }
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError('Erreur lors du chargement des actualités. Affichage des données statiques.');
      setNewsItems(staticNewsItems);
      setFilteredItems(staticNewsItems);
      setUsingStaticData(true);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to map API news types to display types
  const mapNewsType = (type: string): 'Événement' | 'Actualité' => {
    switch (type) {
      case 'event':
        return 'Événement';
      case 'news':
      default:
        return 'Actualité';
    }
  };

  // Filter news items based on search term and active filter
  useEffect(() => {
    let results = newsItems;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply type filter
    if (activeFilter !== 'Tous') {
      results = results.filter(item => item.type === activeFilter);
    }
    
    setFilteredItems(results);
  }, [searchTerm, activeFilter, newsItems]);

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'Événement':
        return 'primary';
      case 'Actualité':
        return 'success';
      default:
        return 'secondary';
    }
  };
  
  // Toggle expanded state for a news item
  const toggleExpanded = async (item: NewsItem) => {
    const id = item._id || item.id;
    if (!id) return;
    
    // If already expanded, just collapse
    if (expandedItems.has(id)) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      return;
    }
    
    // If not expanded and full content not loaded yet, fetch full content
    if (!item.fullContentLoaded && item._id && !usingStaticData) {
      try {
        setLoadingItems(prev => {
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
        });
        
        const response = await getNewsById(item._id);
        if (response) {
          // Update the news item with full content
          setNewsItems(prev => {
            const updatedItems = prev.map(newsItem => {
              if ((newsItem._id || newsItem.id) === id) {
                return {
                  ...newsItem,
                  description: response.content || response.summary || newsItem.description,
                  fullContentLoaded: true
                };
              }
              return newsItem;
            });
            
            // Also update filtered items
            setFilteredItems(filteredItems.map(newsItem => {
              if ((newsItem._id || newsItem.id) === id) {
                return {
                  ...newsItem,
                  description: response.content || response.summary || newsItem.description,
                  fullContentLoaded: true
                };
              }
              return newsItem;
            }));
            
            return updatedItems;
          });
        }
      } catch (error) {
        console.error('Error fetching full news content:', error);
      } finally {
        setLoadingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    }
    
    // Expand the item
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  // Force "Voir plus" button to always appear for demo purposes
  const shouldShowButton = (item: NewsItem) => {
    return true; // Always show the button
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section 
        className="position-relative text-white py-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(13, 110, 253, 0.85), rgba(0, 53, 102, 0.9)), url("/images/campus.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px'
        }}
      >
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={8} data-aos="fade-right">
              <h1 className="display-4 fw-bold mb-4">Actualités & Événements</h1>
              <p className="lead mb-0">
                Restez informé des dernières nouvelles, événements et activités d'Horizons School
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search and Filter Section */}
      <section className="py-4 bg-light border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-3 mb-lg-0">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Rechercher des actualités..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
              </InputGroup>
            </Col>
            <Col lg={6}>
              <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
                {['Tous', 'Événement', 'Actualité'].map(filter => (
                  <Button
                    key={filter}
                    variant={activeFilter === filter ? 'primary' : 'outline-primary'}
                    size="sm"
                    className="rounded-pill px-3"
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News Grid */}
      <section className="py-5">
        <Container>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {error && !usingStaticData && (
                <Alert variant="info" className="mb-4" role="alert">
                  {error}
                </Alert>
              )}
              
              {filteredItems.length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <img 
                      src="/images/placeholder.svg" 
                      alt="No results" 
                      style={{ maxWidth: '120px', opacity: 0.5 }}
                    />
                  </div>
                  <h3>Aucun résultat trouvé</h3>
                  <p className="text-muted">Essayez de modifier vos critères de recherche</p>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveFilter('Tous');
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              ) : (
                <Row>
                  {filteredItems.map((item, index) => {
                    const itemId = item._id || item.id;
                    const isExpanded = expandedItems.has(itemId as string | number);
                    const isLoading = loadingItems.has(itemId as string | number);
                    
                    return (
                      <Col md={6} lg={4} className="mb-4" key={itemId}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="h-100 border-0 shadow-sm hover-lift overflow-hidden">
                            <div className="card-img-top position-relative overflow-hidden">
                              <img 
                                src={item.image}
                                alt={item.title}
                                className="img-fluid"
                                style={{
                                  height: '220px', 
                                  width: '100%', 
                                  objectFit: 'cover',
                                  transition: 'transform 0.5s ease'
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}
                                onError={(e) => {
                                  e.currentTarget.src = '/images/placeholder.svg';
                                }}
                              />
                              <Badge 
                                bg={getBadgeVariant(item.type)} 
                                className="position-absolute top-0 end-0 m-3 px-3 py-2"
                              >
                                {item.type}
                              </Badge>
                            </div>
                            <Card.Body className="p-4">
                              <div className="d-flex align-items-center mb-3">
                                <BsCalendar className="text-primary me-2" />
                                <small className="text-muted">{item.date}</small>
                              </div>
                              <Card.Title className="fw-bold h5 mb-3">{item.title}</Card.Title>
                              <Card.Text className="text-muted">
                                {item.description && isExpanded 
                                  ? item.description
                                  : item.description && item.description.length > 120 
                                    ? `${item.description.substring(0, 120)}...` 
                                    : item.description}
                              </Card.Text>
                              {shouldShowButton(item) && (
                                <Button 
                                  variant="link" 
                                  className="text-primary p-0 d-flex align-items-center mt-2"
                                  onClick={() => toggleExpanded(item)}
                                  disabled={isLoading}
                                >
                                  {isLoading ? (
                                    <>
                                      <Spinner 
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                      />
                                      Chargement...
                                    </>
                                  ) : isExpanded ? (
                                    <>Voir moins <BsChevronUp className="ms-1" /></>
                                  ) : (
                                    <>Voir plus <BsChevronDown className="ms-1" /></>
                                  )}
                                </Button>
                              )}
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default News; 