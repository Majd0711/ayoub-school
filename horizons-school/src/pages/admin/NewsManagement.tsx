import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Badge, Modal, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { BsPencil, BsTrash, BsPlus, BsEye, BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { getNews, createNews, updateNews, deleteNews, toggleNewsActive, toggleNewsFeatured, clearNewsCache } from '../../utils/api';
import { News } from '../../utils/api';

interface NewsFormData {
  _id?: string;
  title: string;
  content: string;
  summary: string;
  type: string;
  image?: File | null;
  currentImage?: string;
  isActive: boolean;
  isFeatured: boolean;
}

const NewsManagement: React.FC = () => {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentNews, setCurrentNews] = useState<NewsFormData>({
    title: '',
    content: '',
    summary: '',
    type: 'news',
    image: null,
    isActive: true,
    isFeatured: false
  });
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNews();
      setNewsItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNews = () => {
    setCurrentNews({
      title: '',
      content: '',
      summary: '',
      type: 'news',
      image: null,
      isActive: true,
      isFeatured: false
    });
    setFormMode('create');
    setFormError(null);
    setShowModal(true);
  };

  const handleEditNews = (news: News) => {
    setCurrentNews({
      _id: news._id,
      title: news.title,
      content: news.content,
      summary: news.summary || '',
      type: news.type,
      currentImage: news.image,
      isActive: news.isActive,
      isFeatured: news.isFeatured || false
    });
    setFormMode('edit');
    setFormError(null);
    setShowModal(true);
  };

  const handleDeleteNews = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      try {
        await deleteNews(id);
        setNewsItems(newsItems.filter(item => item._id !== id));
        
        // Clear the news cache to ensure fresh data on the frontend
        clearNewsCache();
        
        alert('News item deleted successfully');
      } catch (err: any) {
        alert(`Error deleting news: ${err.message}`);
      }
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await toggleNewsActive(id);
      setNewsItems(newsItems.map(item => 
        item._id === id ? { ...item, isActive: !currentStatus } : item
      ));
      
      // Clear the news cache to ensure fresh data on the frontend
      clearNewsCache();
      
      alert('News active status updated successfully');
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      await toggleNewsFeatured(id);
      setNewsItems(newsItems.map(item => 
        item._id === id ? { ...item, isFeatured: !currentStatus } : item
      ));
      
      // Clear the news cache to ensure fresh data on the frontend
      clearNewsCache();
      
      alert('News featured status updated successfully');
    } catch (err: any) {
      alert(`Error updating featured status: ${err.message}`);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);

    try {
      // Validate form
      if (!currentNews.title.trim()) {
        throw new Error('Title is required');
      }

      if (!currentNews.content.trim()) {
        throw new Error('Content is required');
      }

      const formData = new FormData();
      Object.entries(currentNews).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else if (value !== null && value !== undefined && key !== 'currentImage') {
          formData.append(key, String(value));
        }
      });
      
      const response = formMode === 'create' 
        ? await createNews(formData)
        : await updateNews(currentNews._id!, formData);

      if (formMode === 'create') {
        setNewsItems([response, ...newsItems]);
      } else {
        setNewsItems(newsItems.map(item => 
          item._id === response._id ? response : item
        ));
      }

      // Clear the news cache to ensure fresh data on the frontend
      clearNewsCache();

      setShowModal(false);
      alert(`News ${formMode === 'create' ? 'created' : 'updated'} successfully`);
    } catch (err: any) {
      setFormError(err.message || `Failed to ${formMode} news`);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setCurrentNews({ ...currentNews, [name]: target.checked });
    } else {
      setCurrentNews({ ...currentNews, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentNews({ ...currentNews, image: e.target.files[0] });
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading news items...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>News Management</h1>
        <Button variant="primary" onClick={handleCreateNews}>
          <BsPlus className="me-1" /> Add News
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          {newsItems.length === 0 ? (
            <div className="text-center p-4">
              <p className="mb-0">No news items found. Click "Add News" to create your first news item.</p>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Title</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {newsItems.map((news) => (
                  <tr key={news._id}>
                    <td>{news.title}</td>
                    <td>
                      <Badge bg={news.type === 'news' ? 'info' : 'warning'}>
                        {news.type === 'news' ? 'News' : 'Event'}
                      </Badge>
                    </td>
                    <td>{new Date(news.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        variant={news.isActive ? 'success' : 'secondary'} 
                        size="sm"
                        onClick={() => handleToggleActive(news._id, news.isActive)}
                      >
                        {news.isActive ? <BsToggleOn /> : <BsToggleOff />}
                      </Button>
                    </td>
                    <td>
                      <Button 
                        variant={news.isFeatured ? 'warning' : 'secondary'} 
                        size="sm"
                        onClick={() => handleToggleFeatured(news._id, news.isFeatured || false)}
                      >
                        {news.isFeatured ? <BsToggleOn /> : <BsToggleOff />}
                      </Button>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEditNews(news)}>
                          <BsPencil />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteNews(news._id)}>
                          <BsTrash />
                        </Button>
                        <Button variant="outline-info" size="sm" as="a" href={`/news?id=${news._id}`} target="_blank">
                          <BsEye />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* News Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{formMode === 'create' ? 'Add New' : 'Edit'} News</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            {formError && <Alert variant="danger">{formError}</Alert>}
            
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="title" 
                    value={currentNews.title} 
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select 
                    name="type" 
                    value={currentNews.type} 
                    onChange={handleInputChange}
                  >
                    <option value="news">News</option>
                    <option value="event">Event</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Summary</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                name="summary" 
                value={currentNews.summary} 
                onChange={handleInputChange} 
                placeholder="Brief summary of the news (optional)" 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={6} 
                name="content" 
                value={currentNews.content} 
                onChange={handleInputChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              {currentNews.currentImage && (
                <div className="mb-2">
                  <img 
                    src={currentNews.currentImage} 
                    alt="Current" 
                    style={{ maxHeight: '100px', maxWidth: '100%' }} 
                    className="border rounded" 
                  />
                </div>
              )}
              <Form.Control 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="checkbox" 
                    label="Active" 
                    name="isActive" 
                    checked={currentNews.isActive} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="checkbox" 
                    label="Featured" 
                    name="isFeatured" 
                    checked={currentNews.isFeatured} 
                    onChange={handleInputChange} 
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={formSubmitting}>
              {formSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                'Save News'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default NewsManagement;