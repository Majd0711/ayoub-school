import React from 'react';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsClock } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import type { Program } from '../pages/Programs';
import '../styles/ProgramCard.css';

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => {
  const navigate = useNavigate();

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact', { state: { program: program.title } });
  };

  return (
    <div className="program-card">
      <div className="program-header">
        <Badge bg="primary" className="level-badge">
          {program.level}
        </Badge>
        <div className="duration">
          <BsClock className="duration-icon" />
          <span>{program.duration}</span>
        </div>
      </div>
      
      <h3 className="program-title">{program.title}</h3>
      
      <div className="program-details">
        <div className="conditions">
          <h4>Conditions d'admission :</h4>
          <ul className="conditions-list">
            {program.features.map((feature, index) => (
              <li key={index}>
                <FaCheck className="check-icon" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="program-actions">
        <Badge bg="danger" className="places-badge">
          Places limitées
        </Badge>
        <button onClick={handleLearnMore} className="btn btn-link">
          En savoir plus →
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
