import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BsList, 
  BsNewspaper, 
  BsPeople, 
  BsGrid, 
  BsGear, 
  BsBoxArrowRight, 
  BsSpeedometer2, 
  BsEnvelope,
  BsBook
} from 'react-icons/bs';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const closeSidebar = () => setShowSidebar(false);

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <BsSpeedometer2 className="me-2" /> },
    { path: '/admin/programs', label: 'Programs Management', icon: <BsBook className="me-2" /> },
    { path: '/admin/news', label: 'News Management', icon: <BsNewspaper className="me-2" /> },
    { path: '/admin/team', label: 'Team Management', icon: <BsPeople className="me-2" /> },
    { path: '/admin/contacts', label: 'Contact Messages', icon: <BsEnvelope className="me-2" /> },
    { path: '/admin/settings', label: 'Settings', icon: <BsGear className="me-2" /> },
  ];

  return (
    <div className="admin-layout d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Container fluid>
          <Button 
            variant="outline-light" 
            className="d-lg-none me-2" 
            onClick={() => setShowSidebar(true)}
          >
            <BsList />
          </Button>
          <Navbar.Brand as={Link} to="/admin/dashboard">Horizons Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              {user && (
                <Navbar.Text className="me-3">
                  Signed in as: <span className="text-white">{user.name}</span>
                </Navbar.Text>
              )}
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                <BsBoxArrowRight className="me-1" /> Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="d-flex flex-grow-1">
        {/* Sidebar for larger screens */}
        <div className="d-none d-lg-block bg-dark text-white" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
          <Nav className="flex-column p-3">
            {navItems.map((item) => (
              <Nav.Link 
                key={item.path} 
                as={Link} 
                to={item.path}
                className={`py-2 ${location.pathname === item.path ? 'active bg-primary rounded' : 'text-white'}`}
              >
                {item.icon} {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </div>

        {/* Offcanvas Sidebar for mobile */}
        <Offcanvas show={showSidebar} onHide={closeSidebar} className="bg-dark text-white" style={{ width: '250px' }}>
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>Horizons Admin</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              {navItems.map((item) => (
                <Nav.Link 
                  key={item.path} 
                  as={Link} 
                  to={item.path}
                  className={`py-2 ${location.pathname === item.path ? 'active bg-primary rounded' : 'text-white'}`}
                  onClick={closeSidebar}
                >
                  {item.icon} {item.label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content */}
        <div className="flex-grow-1 bg-light p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;