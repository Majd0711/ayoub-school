import React from 'react';
import { Container } from 'react-bootstrap';

const About: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">À Propos de Horizons School</h1>
      <p>
        Horizons School est une école de formation professionnelle située à Marrakech, 
        dédiée à l'excellence académique et à la préparation des étudiants pour le monde professionnel.
      </p>
    </Container>
  );
};

export default About; 