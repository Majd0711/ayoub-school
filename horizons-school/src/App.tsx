import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './styles/Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import our layout
import MainLayout from './layouts/MainLayout';

// Import our pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Contact from './pages/Contact';
import News from './pages/News';

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
    </Routes>
  );
};

// Main App Component (wraps everything with Router)
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
