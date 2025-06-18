import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import images
import programsHeroImg from './images/programs-hero.jpg';
import patternImg from './images/pattern.png';

// Import our layout
import MainLayout from './layouts/MainLayout';

// Import our pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Contact from './pages/Contact';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <MainLayout>
              <About />
            </MainLayout>
          } 
        />
        <Route 
          path="/programs" 
          element={
            <MainLayout>
              <Programs />
            </MainLayout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
