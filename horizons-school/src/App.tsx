import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import './styles/Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import our layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Import our pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Contact from './pages/Contact';
import News from './pages/News';

// Import admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import NewsManagement from './pages/admin/NewsManagement';
import TeamManagement from './pages/admin/TeamManagement';
import SettingsManagement from './pages/admin/SettingsManagement';
import ContactsManagement from './pages/admin/ContactsManagement';

// Import components
import ProtectedRoute from './components/ProtectedRoute';

// Import context providers
import { AuthProvider } from './contexts/AuthContext';

// Import utils
import { initSmoothScrolling } from './utils/smoothScroll';

// Main App Content Component (uses useLocation hook)
const AppContent = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      once: true,
    });
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Handle hash links
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure the DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <MainLayout>
          <Home />
        </MainLayout>
      } />
      <Route path="/about" element={
        <MainLayout>
          <About />
        </MainLayout>
      } />
      <Route path="/programs" element={
        <MainLayout>
          <Programs />
        </MainLayout>
      } />
      <Route path="/contact" element={
        <MainLayout>
          <Contact />
        </MainLayout>
      } />
      <Route path="/news" element={
        <MainLayout>
          <News />
        </MainLayout>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/news" element={
        <ProtectedRoute>
          <AdminLayout>
            <NewsManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/team" element={
        <ProtectedRoute>
          <AdminLayout>
            <TeamManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/settings" element={
        <ProtectedRoute>
          <AdminLayout>
            <SettingsManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/contacts" element={
        <ProtectedRoute>
          <AdminLayout>
            <ContactsManagement />
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

// Main App Component (wraps everything with Router and AuthProvider)
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
