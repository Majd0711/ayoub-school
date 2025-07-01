import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getNews, getNewsById, getImageUrl } from '../utils/api';
import { BsCalendar } from 'react-icons/bs';

// Define News item interface
interface NewsItem {
  _id?: string;
  id?: number;
  type: 'Événement' | 'Actualité' | 'news' | 'event';
  date?: string;
  createdAt?: string;
  eventDate?: string;
  title: string;
  description?: string;
  content?: string;
  summary?: string;
  image?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  category?: string;
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
    id: 3,
    type: 'Actualité',
    date: '1 Juin 2025',
    title: 'LICENCE PROFESSIONNELLE',
    description: 'Notre programme de Licence Professionnelle vous offre une formation complète avec plusieurs spécialisations au choix : Management des organisations, Gestion des ressources humaines, Commerce International, et Gestion comptable et financière.',
    image: '/images/1.jpg'
  }
];

const NewsSection: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(staticNewsItems);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());
  const [loadingItems, setLoadingItems] = useState<Set<string | number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [usingStaticData, setUsingStaticData] = useState<boolean>(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Direct API call to bypass the utility function
        console.log("Making direct API call to news endpoint");
        const apiUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1'}/news?limit=6`;
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
          const apiNewsItems: NewsItem[] = jsonData.data.map((item: any) => ({
            _id: item._id,
            type: mapNewsType(item.type),
            title: item.title,
            description: item.summary || item.content?.substring(0, 150) + '...' || 'Cliquez pour voir plus de détails',
            date: item.type === 'event'
              ? new Date(item.eventDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
              : new Date(item.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
            image: getImageUrl(item.image, 'news'),
            isActive: item.isActive,
            isFeatured: item.isFeatured,
            category: item.category
          }));
          
          console.log('Mapped news items:', apiNewsItems);
          
          // Take only the first 3 items for the home page
          setNewsItems(apiNewsItems.slice(0, 3));
          setUsingStaticData(false);
        } else {
          // Use static data as fallback
          console.log('No news items found in API response, using static data');
          setNewsItems(staticNewsItems);
          setUsingStaticData(true);
          setError('Aucune actualité trouvée. Affichage des données statiques.');
        }
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('Erreur lors du chargement des actualités. Affichage des données statiques.');
        setNewsItems(staticNewsItems);
        setUsingStaticData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  
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
        if (response && typeof response === 'object' && 'success' in response && response.success && 'data' in response) {
          // Update the news item with full content
          setNewsItems(prev => {
            return prev.map(newsItem => {
              if ((newsItem._id || newsItem.id) === id) {
                return {
                  ...newsItem,
                  description: (response.data && typeof response.data === 'object' && 'content' in response.data && typeof response.data.content === 'string') ? response.data.content : 
                               (response.data && typeof response.data === 'object' && 'summary' in response.data && typeof response.data.summary === 'string') ? response.data.summary : 
                               (newsItem.description || ''),
                  fullContentLoaded: true
                };
              }
              return newsItem;
            });
          });
        } else if (response && typeof response === 'object' && 'error' in response) {
          const errorResponse = response as {error: string};
          console.error('Error fetching full content:', errorResponse.error);
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

  return (
    <>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="text-center py-3">
          <p className="text-muted">{error}</p>
        </div>
      ) : (
        <Row className="g-4">
          {newsItems.length > 0 ? (
            newsItems.map((item, index) => (
              <Col md={4} key={item._id || item.id || index}>
                <Card 
                  className="h-100 shadow-sm border-0 news-card"
                  data-aos="fade-up" 
                  data-aos-delay={`${index * 100}`}
                >
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={item.image || '/images/placeholder.svg'} 
                      alt={item.title}
                      className="news-card-img"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Badge 
                      bg={getBadgeVariant(item.type)}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {item.type}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <BsCalendar className="text-primary me-2" />
                      <small className="text-muted">{item.date}</small>
                    </div>
                    <Card.Title className="h5 mb-3">{item.title}</Card.Title>
                    
                    <Card.Text className={expandedItems.has(item._id || item.id || '') ? '' : 'text-truncate-3'}>
                      {item.description}
                    </Card.Text>
                    
                    <div className="mt-auto pt-3">
                      {loadingItems.has(item._id || item.id || '') ? (
                        <div className="text-center">
                          <Spinner animation="border" size="sm" />
                        </div>
                      ) : (
                        <Button 
                          variant="link" 
                          className="text-primary p-0"
                          onClick={() => toggleExpanded(item)}
                        >
                          {expandedItems.has(item._id || item.id || '') ? 'Voir moins' : 'Voir plus'}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-center py-4">
                <p className="text-muted">Aucune actualité disponible pour le moment.</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default NewsSection;