import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsClock, BsGear, BsArrowRight, BsCheckCircle } from 'react-icons/bs';
import '../styles/ProgramCard.css'; // We'll create this file for custom styles

interface ProgramCardProps {
  id: string;
  title: string;
  level: string;
  duration: string;
  conditions: string[];
  imageUrl: string;
  category?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  level,
  duration,
  conditions,
  imageUrl,
  category
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
      className="program-card-wrapper"
    >      
      <Card className="program-card border-0 shadow-sm flex-grow-1 d-flex flex-column">
        <Card.Body className="p-4 d-flex flex-column">
          <Card.Title as="h3" className="h5 mb-3 fw-bold">{title}</Card.Title>
          <div className="program-meta mb-3 d-flex align-items-center">
            <BsClock className="text-primary me-2" />
            <span className="text-muted small">
              {category === 'formation' ? '6 mois' : duration}
            </span>
          </div>
          <div className="mb-3">
            <Badge bg="primary" className="px-3 py-2">
              {level}
            </Badge>
          </div>

          <div className="mb-4">
            <h4 className="h6 mb-3">Conditions d'admission :</h4>
            <ul className="list-unstyled mb-0">
              {conditions.map((condition, index) => (
                <li key={index} className="d-flex align-items-center mb-2">
                  {React.createElement(BsCheckCircle, { 
                    className: "text-success me-2",
                    size: 16
                  })}
                  <small>{condition}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-3 d-flex justify-content-between align-items-center border-top mt-3">
            <Badge bg="danger" className="d-flex align-items-center p-2">
              <BsGear className="me-1" />
              Places limitées
            </Badge>
            
            <motion.a
              href="https://wa.me/212604916565?text=Bonjour%2C%20je%20souhaite%20plus%20d'informations%20sur%20le%20programme"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-link text-primary p-0 d-flex align-items-center text-decoration-none"
              whileHover={{ x: 5 }}
            >
              En savoir plus <BsArrowRight className="ms-1" />
            </motion.a>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProgramCard;
