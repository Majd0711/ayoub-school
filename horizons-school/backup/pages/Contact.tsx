import React from 'react';
import { Container } from 'react-bootstrap';

const Contact: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Contactez-Nous</h1>
      <p>
        Vous avez des questions sur nos programmes ou vous souhaitez nous rendre visite? 
        N'hésitez pas à nous contacter. Notre équipe est à votre disposition pour vous aider.
      </p>
      <div className="mt-4">
        <p><strong>Adresse:</strong> MARRAKECH Mhamid maatalah</p>
        <p><strong>Téléphone:</strong> 06-04-91-65-65</p>
        <p><strong>Email:</strong> contact@horizons-school.com</p>
      </div>
    </Container>
  );
};

export default Contact;