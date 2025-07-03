import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { BsNewspaper, BsPeople, BsEnvelope, BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllStats } from '../../utils/api';

interface DashboardStats {
  programs: number;
  news: number;
  contacts: number;
  team: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    programs: 0,
    news: 0,
    contacts: 0,
    team: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllStats();
        console.log('Fetched stats:', data);

        setStats({
          programs: data.programs || 0,
          news: data.news || 0,
          contacts: data.contacts || 0,
          team: data.team || 0
        });
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

  const statCards = [
    {
      title: 'Total Programs',
      value: stats.programs,
      icon: <BsNewspaper size={24} />,
      color: 'primary',
      link: '/admin/programs'
    },
    {
      title: 'News Articles',
      value: stats.news,
      icon: <BsNewspaper size={24} />,
      color: 'success',
      link: '/admin/news'
    },
    {
      title: 'Contact Messages',
      value: stats.contacts,
      icon: <BsEnvelope size={24} />,
      color: 'warning',
      link: '/admin/contacts'
    },
    {
      title: 'Team Members',
      value: stats.team,
      icon: <BsPeople size={24} />,
      color: 'info',
      link: '/admin/team'
    }
  ];

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      
      {error && (
        <Alert variant="danger" className="mb-4" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
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
                  <Link to="/admin/programs/new" className="text-decoration-none">Add new program</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/news/new" className="text-decoration-none">Add new news article</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/team/new" className="text-decoration-none">Add new team member</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/admin/contacts" className="text-decoration-none">View contact messages</Link>
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