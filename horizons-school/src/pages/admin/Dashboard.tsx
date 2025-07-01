import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { BsNewspaper, BsPeople, BsEnvelope, BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface DashboardStats {
  newsCount: number;
  teamCount: number;
  contactCount: number;
  visitorCount: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    newsCount: 0,
    teamCount: 0,
    contactCount: 0,
    visitorCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch stats from API
        const response = await fetch('/api/v1/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch statistics');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setStats({
            newsCount: data.data.newsCount || 0,
            teamCount: data.data.teamCount || 0,
            contactCount: data.data.contactCount || 0,
            visitorCount: data.data.visitorCount || 0
          });
        } else {
          throw new Error(data.message || 'Failed to load dashboard statistics');
        }
      } catch (err: any) {
        console.error('Error fetching stats:', err);
        setError(err.message || 'Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const statCards = [
    {
      title: 'News Articles',
      value: stats.newsCount,
      icon: <BsNewspaper size={24} />,
      color: 'primary',
      link: '/admin/news'
    },
    {
      title: 'Team Members',
      value: stats.teamCount,
      icon: <BsPeople size={24} />,
      color: 'success',
      link: '/admin/team'
    },
    {
      title: 'Contact Messages',
      value: stats.contactCount,
      icon: <BsEnvelope size={24} />,
      color: 'warning',
      link: '/admin/contacts'
    },
    {
      title: 'Website Visitors',
      value: stats.visitorCount,
      icon: <BsEye size={24} />,
      color: 'info',
      link: '#'
    }
  ];

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      
      <Row>
        {statCards.map((card, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">{card.title}</h6>
                    <h3 className="mb-0">{card.value}</h3>
                  </div>
                  <div className={`bg-${card.color} p-3 rounded text-white`}>
                    {card.icon}
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <Link to={card.link} className="text-decoration-none">
                  View Details <span>&rarr;</span>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">No recent activity to display.</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <Link to="/admin/news" className="text-decoration-none">Add new news article</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/team" className="text-decoration-none">Add new team member</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/contacts" className="text-decoration-none">View contact messages</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/settings" className="text-decoration-none">Update website settings</Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;