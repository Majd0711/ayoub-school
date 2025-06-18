import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsClock, BsGear, BsArrowRight, BsCheckCircle } from 'react-icons/bs';

interface ProgramCardProps {
  id: string;
  title: string;
  level: string;
  duration: string;
  conditions: string[];
  seats: number;
  imageUrl: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  level,
  duration,
  conditions,
  seats,
  imageUrl
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98 }}
    >      <Card className="program-card h-100">
        <div className="program-card-image">
          <Card.Img variant="top" src={imageUrl} alt={title} />
          <div className="program-card-overlay" />
          <Badge 
            bg="primary" 
            className="position-absolute top-0 end-0 m-3 px-3 py-2"
          >
            {level}
          </Badge>
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title as="h3" className="h4 mb-3">
            {title}
          </Card.Title>
          
          <div className="program-meta mb-3 d-flex align-items-center">
            {React.createElement(BsClock, { className: "text-primary me-2" })}
            <span className="text-muted">{duration}</span>
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

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <Badge bg="danger" className="d-flex align-items-center p-2">
              {React.createElement(BsGear, { className: "me-1" })}
              {seats} places disponibles
            </Badge>
            
            <motion.button
              className="btn btn-link text-primary p-0 d-flex align-items-center"
              whileHover={{ x: 5 }}
            >
              En savoir plus {React.createElement(BsArrowRight, { className: "ms-1" })}
            </motion.button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProgramCard;
