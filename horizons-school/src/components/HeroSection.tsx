import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="hero-overlay"></div>
      <Container className="hero-content">
        <motion.h1 
          className="display-3 fw-bold text-white mb-4"
          variants={itemVariants}
        >
          Inscription Ouverte 2025/2026
        </motion.h1>
        
        <motion.h2 
          className="h3 text-white mb-5"
          variants={itemVariants}
        >
          École de formation professionnelle
        </motion.h2>
        
        <motion.div variants={itemVariants}>
          <Link 
            to="/register" 
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill cta-button"
          >
            S'inscrire Maintenant
          </Link>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default HeroSection;
